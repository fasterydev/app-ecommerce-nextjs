import { create } from "zustand";
import { getCategories } from "@/actions";
import { Category } from "@/components/product/interface";

type CategoryStore = {
  categories: Category[];
  isLoading: boolean;

  fetchCategories: () => Promise<void>;
  setCategories: (items: Category[]) => void;
};

export const useCategoryStore = create<CategoryStore>((set) => ({
  categories: [],
  isLoading: false,

  setCategories: (items) => set({ categories: items }),

  fetchCategories: async () => {
    set({ isLoading: true });
    try {
      const res = await getCategories();
      if (res.statusCode === 200) {
        set({ categories: res.categories });
      }
    } catch (err) {
      console.error("Error al obtener las categorías:", err);
    } finally {
      set({ isLoading: false });
    }
  },
}));
