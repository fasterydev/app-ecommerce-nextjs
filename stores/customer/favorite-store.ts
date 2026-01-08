import { create } from "zustand";
import { addFavorite, deleteFavorite, getFavorites } from "@/actions";
import { Product } from "@/components/interfaces/product";
import { toast } from "sonner";

type Favorite = {
  id: string;
  product: Product;
};

type FavoriteStore = {
  favorites: Favorite[];
  isLoading: boolean;

  fetchFavorites: () => Promise<void>;
  setFavorites: (items: Favorite[]) => void;
  toggleFavorite: (id: string) => Promise<void>;
  isFavorite: (id: string) => boolean;
};

export const useFavoriteStore = create<FavoriteStore>((set, get) => ({
  favorites: [],
  isLoading: false,

  setFavorites: (items) => set({ favorites: items }),

  fetchFavorites: async () => {
    set({ isLoading: true });
    try {
      const res = await getFavorites();
      if (res.statusCode === 200 && "favorites" in res) {
        set({ favorites: res.favorites });
      }
    } catch (err) {
      console.error("Error al obtener los favoritos:", err);
    } finally {
      set({ isLoading: false });
    }
  },

  toggleFavorite: async (id: string) => {
    try {
      const isFav = get().isFavorite(id);
      const res = isFav ? await deleteFavorite(id) : await addFavorite(id);
      
      if (res.statusCode === 200 || res.statusCode === 201) {
        get().fetchFavorites();
      }
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Error al modificar favorito"
      );
      console.error("Error al modificar favorito:", error);
    }
  },

  isFavorite: (id: string) => {
    const favorite = get().favorites.find((fav) => fav.product.id === id);
    return favorite !== undefined;
  },
}));
