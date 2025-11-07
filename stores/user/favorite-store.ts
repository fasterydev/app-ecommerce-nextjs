import { create } from "zustand";
import { addFavorite, getFavorites } from "@/actions";
import { Product } from "@/components/interfaces/interface";
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

export const useFavoriteStore = create<FavoriteStore>((set,get) => ({
  favorites: [],
  isLoading: false,

  setFavorites: (items) => set({ favorites: items }),

  fetchFavorites: async () => {
    set({ isLoading: true });
    try {
      const res = await getFavorites();
      if (res.statusCode === 200) {
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
      const res = await addFavorite(id);
      if (res.statusCode === 200) {
        get().fetchFavorites();
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Error al agregar favorito");
      console.error("Error al agregar favorito:", error);
    }
  },

  isFavorite: (id: string) => {
    const favorite = get().favorites.find((fav) => fav.id === id);
    return favorite !== undefined;
  },
}));
