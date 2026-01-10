"use client";
import { 
  createCategory, 
  updateCategory, 
  deleteCategory, 
  getCategories, 
  getCategory 
} from "@/actions/admin/categories";
import { Category } from "@/components/interfaces/category";
import { create } from "zustand";
import { toast } from "sonner";

type CategoryStore = {
  categories: Category[];
  currentCategory: Category | null;
  isLoading: boolean;
  isSaving: boolean;

  fetchCategories: () => Promise<void>;
  fetchCategoryById: (categoryId: string) => Promise<Category | null>;
  createCategory: (category: Partial<Category>) => Promise<{ success: boolean; message?: string }>;
  updateCategory: (category: Partial<Category>) => Promise<{ success: boolean; message?: string }>;
  deleteCategory: (categoryId: string) => Promise<{ success: boolean; message?: string }>;
  setCategories: (items: Category[]) => void;
  setCurrentCategory: (category: Category | null) => void;
};

export const useAdminCategoryStore = create<CategoryStore>((set, get) => ({
  categories: [],
  currentCategory: null,
  isLoading: false,
  isSaving: false,

  setCategories: (items) => set({ categories: items }),
  setCurrentCategory: (category) => set({ currentCategory: category }),

  fetchCategories: async () => {
    set({ isLoading: true });
    try {
      const res = await getCategories();
      if (res.statusCode === 200 && "categories" in res) {
        set({ categories: res.categories });
      } else {
        set({ categories: [] });
        toast.error(res.message || "Error al obtener las categorías");
      }
    } catch (err) {
      console.error("❌ Error al obtener las categorías:", err);
      set({ categories: [] });
      toast.error("Error al obtener las categorías");
    } finally {
      set({ isLoading: false });
    }
  },

  fetchCategoryById: async (categoryId: string) => {
    set({ isLoading: true });
    try {
      const res = await getCategory(categoryId);
      if (res.statusCode === 200 && "category" in res) {
        const categoryData = res.category as Category;
        set({ currentCategory: categoryData });
        return categoryData;
      } else {
        set({ currentCategory: null });
        toast.error(res.message || "Error al obtener la categoría");
        return null;
      }
    } catch (err) {
      console.error("❌ Error al obtener la categoría:", err);
      set({ currentCategory: null });
      toast.error("Error al obtener la categoría");
      return null;
    } finally {
      set({ isLoading: false });
    }
  },

  createCategory: async (category: Partial<Category>) => {
    set({ isSaving: true });
    try {
      const res = await createCategory(category);
      if (res.statusCode === 201) {
        // Recargar la lista de categorías
        await get().fetchCategories();
        toast.success(res.message || "Categoría creada exitosamente");
        return {
          success: true,
          message: res.message || "Categoría creada exitosamente",
        };
      } else {
        toast.error(res.message || "Error al crear la categoría");
        return {
          success: false,
          message: res.message || "Error al crear la categoría",
        };
      }
    } catch (err) {
      console.error("❌ Error al crear la categoría:", err);
      toast.error("Error al crear la categoría");
      return {
        success: false,
        message: "Error al crear la categoría",
      };
    } finally {
      set({ isSaving: false });
    }
  },

  updateCategory: async (category: Partial<Category>) => {
    set({ isSaving: true });
    try {
      const res = await updateCategory(category);
      if (res.statusCode === 200) {
        // Actualizar la categoría en la lista si existe
        const { categories } = get();
        const updatedCategories = categories.map((c) => {
          if (c.id === category.id) {
            return { ...c, ...category } as Category;
          }
          return c;
        });
        set({ categories: updatedCategories });

        // Si es la categoría actual, actualizarla también
        const { currentCategory } = get();
        if (currentCategory && currentCategory.id === category.id) {
          set({ currentCategory: { ...currentCategory, ...category } as Category });
        }

        // Recargar la lista para asegurar datos actualizados
        await get().fetchCategories();

        toast.success(res.message || "Categoría actualizada exitosamente");
        return {
          success: true,
          message: res.message || "Categoría actualizada exitosamente",
        };
      } else {
        toast.error(res.message || "Error al actualizar la categoría");
        return {
          success: false,
          message: res.message || "Error al actualizar la categoría",
        };
      }
    } catch (err) {
      console.error("❌ Error al actualizar la categoría:", err);
      toast.error("Error al actualizar la categoría");
      return {
        success: false,
        message: "Error al actualizar la categoría",
      };
    } finally {
      set({ isSaving: false });
    }
  },

  deleteCategory: async (categoryId: string) => {
    set({ isSaving: true });
    try {
      const res = await deleteCategory(categoryId);
      if (res.statusCode === 200 || res.statusCode === 204) {
        // Eliminar la categoría de la lista
        const { categories } = get();
        const updatedCategories = categories.filter((c) => c.id !== categoryId);
        set({ categories: updatedCategories });

        // Si es la categoría actual, limpiarla
        const { currentCategory } = get();
        if (currentCategory && currentCategory.id === categoryId) {
          set({ currentCategory: null });
        }

        toast.success(res.message || "Categoría eliminada exitosamente");
        return {
          success: true,
          message: res.message || "Categoría eliminada exitosamente",
        };
      } else {
        toast.error(res.message || "Error al eliminar la categoría");
        return {
          success: false,
          message: res.message || "Error al eliminar la categoría",
        };
      }
    } catch (err) {
      console.error("❌ Error al eliminar la categoría:", err);
      toast.error("Error al eliminar la categoría");
      return {
        success: false,
        message: "Error al eliminar la categoría",
      };
    } finally {
      set({ isSaving: false });
    }
  },
}));
