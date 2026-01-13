"use client";
import { create } from "zustand";
import { addFavorite, getFavorites, deleteFavorite } from "@/actions";
import { Product } from "@/components/interfaces/interface";
import { toast } from "sonner";

type Favorite = {
  id: string;
  product: Product;
};

type FavoriteStore = {
  favorites: Favorite[];
  isLoading: boolean;
  isToggling: boolean;

  fetchFavorites: () => Promise<void>;
  setFavorites: (items: Favorite[]) => void;
  toggleFavorite: (id: string) => Promise<void>;
  addFavorite: (id: string) => Promise<void>;
  removeFavorite: (id: string) => Promise<void>;
  isFavorite: (id: string) => boolean;
  clearFavorites: () => void;
};

export const useFavoriteStore = create<FavoriteStore>((set, get) => ({
  favorites: [],
  isLoading: false,
  isToggling: false,

  setFavorites: (items) => set({ favorites: Array.isArray(items) ? items : [] }),

  clearFavorites: () => set({ favorites: [] }),

  fetchFavorites: async () => {
    set({ isLoading: true });
    try {
      const res = await getFavorites();
      if (res.statusCode === 200) {
        const favoritesData = "favorites" in res && Array.isArray(res.favorites)
          ? res.favorites
          : Array.isArray(res)
          ? res
          : [];
        set({ favorites: favoritesData });
      } else {
        set({ favorites: [] });
        toast.error(res.message || "Error al obtener los favoritos");
      }
    } catch (err) {
      console.error("❌ Error al obtener los favoritos:", err);
      set({ favorites: [] });
      toast.error("Error de red al obtener los favoritos");
    } finally {
      set({ isLoading: false });
    }
  },

  addFavorite: async (id: string) => {
    if (!id) {
      toast.error("ID de producto inválido");
      return;
    }

    set({ isToggling: true });
    try {
      const res = await addFavorite(id);
      if (res.statusCode === 200 || res.statusCode === 201) {
        await get().fetchFavorites();
        toast.success(res.message || "✅ Producto agregado a favoritos");
      } else {
        toast.error(res.message || "Error al agregar a favoritos");
      }
    } catch (error) {
      console.error("❌ Error al agregar favorito:", error);
      toast.error("Error de red al agregar a favoritos");
    } finally {
      set({ isToggling: false });
    }
  },

  removeFavorite: async (id: string) => {
    if (!id) {
      toast.error("ID de producto inválido");
      return;
    }

    set({ isToggling: true });
    try {
      const res = await deleteFavorite(id);
      if (res.statusCode === 200 || res.statusCode === 204) {
        await get().fetchFavorites();
        toast.success(res.message || "✅ Producto eliminado de favoritos");
      } else {
        toast.error(res.message || "Error al eliminar de favoritos");
      }
    } catch (error) {
      console.error("❌ Error al eliminar favorito:", error);
      toast.error("Error de red al eliminar de favoritos");
    } finally {
      set({ isToggling: false });
    }
  },

  toggleFavorite: async (id: string) => {
    if (!id) {
      toast.error("ID de producto inválido");
      return;
    }

    const isCurrentlyFavorite = get().isFavorite(id);
    
    if (isCurrentlyFavorite) {
      await get().removeFavorite(id);
    } else {
      await get().addFavorite(id);
    }
  },

  isFavorite: (id: string) => {
    try {
      const state = get();
      return state.favorites.some(
        (fav) => fav.product.id === id || fav.id === id
      );
    } catch (error) {
      console.error("Error al verificar si es favorito:", error);
      return false;
    }
  },
}));
