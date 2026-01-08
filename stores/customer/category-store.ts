import { create } from "zustand";
import { deleteCategory, getCategories } from "@/actions";
import { Category } from "@/components/interfaces/category";

type CategoryStore = {
  categories: Category[];
  isLoading: boolean;

  fetchCategories: () => Promise<void>;
  setCategories: (items: Category[]) => void;
  deleteCategory: (id: string) => Promise<void>;
};

export const useCategoryStore = create<CategoryStore>((set) => ({
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
      console.error("Error al obtener las categorías:", err);
    } finally {
      set({ isLoading: false });
    }
  },

  deleteCategory: async (id: string) => {
    set((state) => ({
      categories: state.categories.filter((category) => category.id !== id),
    }));
    try {
      const res = await deleteCategory(id);
      if (res.statusCode !== 200) {
        console.error("Error al eliminar la categoría:", res.message);
      }
    } catch (err) {
      console.error("Error al eliminar la categoría:", err);
    }
  },
}));
