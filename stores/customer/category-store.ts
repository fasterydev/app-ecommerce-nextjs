import { create } from "zustand";
import { deleteCategory } from "@/actions/customer/categories";
import { getCategories } from "@/actions/public/categories";
import { Category } from "@/components/interfaces/category";
import { toast } from "sonner";

type CategoryStore = {
  categories: Category[];
  isLoading: boolean;

  fetchCategories: () => Promise<void>;
  setCategories: (items: Category[]) => void;
  deleteCategory: (id: string) => Promise<void>;
};

export const useCategoryStore = create<CategoryStore>((set, get) => ({
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
      toast.error("Error al obtener las categorías");
    } finally {
      set({ isLoading: false });
    }
  },

  deleteCategory: async (id: string) => {
    const prevCategories = get().categories;
    set((state) => ({
      categories: state.categories.filter((category) => category.id !== id),
    }));
    try {
      const res = await deleteCategory(id);
      if (res.statusCode !== 200 && res.statusCode !== 204) {
        set({ categories: prevCategories });
        toast.error(res.message || "Error al eliminar la categoría");
      } else {
        toast.success("Categoría eliminada correctamente");
      }
    } catch (err) {
      console.error("❌ Error al eliminar la categoría:", err);
      set({ categories: prevCategories });
      toast.error("Error al eliminar la categoría");
    }
  },
}));
