"use client";
import { create } from "zustand";
import { deleteCategory, getCategories } from "@/actions";
import { Category } from "@/components/interfaces/interface";
import { toast } from "sonner";

type CategoryStore = {
  categories: Category[];
  isLoading: boolean;
  isDeleting: boolean;

  fetchCategories: () => Promise<void>;
  setCategories: (items: Category[]) => void;
  deleteCategory: (id: string) => Promise<void>;
  getCategoryById: (id: string) => Category | undefined;
  clearCategories: () => void;
};

export const useCategoryStore = create<CategoryStore>((set, get) => ({
  categories: [],
  isLoading: false,
  isDeleting: false,

  setCategories: (items) => set({ categories: Array.isArray(items) ? items : [] }),

  clearCategories: () => set({ categories: [] }),

  fetchCategories: async () => {
    set({ isLoading: true });
    try {
      const res = await getCategories();
      if (res.statusCode === 200) {
        const categoriesData = "categories" in res && Array.isArray(res.categories)
          ? res.categories
          : Array.isArray(res)
          ? res
          : [];
        set({ categories: categoriesData });
      } else {
        set({ categories: [] });
        toast.error(res.message || "Error al obtener las categorías");
      }
    } catch (err) {
      console.error("❌ Error al obtener las categorías:", err);
      set({ categories: [] });
      toast.error("Error de red al obtener las categorías");
    } finally {
      set({ isLoading: false });
    }
  },

  deleteCategory: async (id: string) => {
    if (!id) {
      toast.error("ID de categoría inválido");
      return;
    }

    const prevCategories = [...get().categories];
    set({
      categories: prevCategories.filter((category) => category.id !== id),
      isDeleting: true,
    });

    try {
      const res = await deleteCategory(id);
      if (res.statusCode === 200 || res.statusCode === 204) {
        await get().fetchCategories();
        toast.success(res.message || "✅ Categoría eliminada exitosamente");
      } else {
        set({ categories: prevCategories }); // revertimos
        toast.error(res.message || "Error al eliminar la categoría");
      }
    } catch (err) {
      console.error("❌ Error al eliminar la categoría:", err);
      set({ categories: prevCategories }); // revertimos
      toast.error("Error de red al eliminar la categoría");
    } finally {
      set({ isDeleting: false });
    }
  },

  getCategoryById: (id: string) => {
    try {
      const state = get();
      return state.categories.find((category) => category.id === id);
    } catch (error) {
      console.error("Error al obtener la categoría por ID:", error);
      return undefined;
    }
  },
}));
