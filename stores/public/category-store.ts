import { create } from "zustand";
import { getCategories } from "@/actions/public/categories";
import { Category } from "@/components/interfaces/category";

type CategoryStore = {
  categories: Category[];
  isLoading: boolean;

  fetchCategories: () => Promise<void>;
  setCategories: (items: Category[]) => void;
};

export const usePublicCategoryStore = create<CategoryStore>((set) => ({
  categories: [],
  isLoading: false,

  setCategories: (items) => set({ categories: items }),

  fetchCategories: async () => {
    set({ isLoading: true });
    try {
      const res = await getCategories();
      if (res.statusCode === 200 && "categories" in res) {
        set({ categories: res.categories });
      }
    } catch (err) {
      console.error("❌ Error al obtener las categorías:", err);
    } finally {
      set({ isLoading: false });
    }
  },
}));
