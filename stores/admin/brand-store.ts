"use client";
import { 
  createBrand, 
  updateBrand, 
  deleteBrand, 
  getBrands, 
  getBrand 
} from "@/actions/admin/brands";
import { Brand } from "@/components/interfaces/brand";
import { create } from "zustand";
import { toast } from "sonner";

type BrandStore = {
  brands: Brand[];
  currentBrand: Brand | null;
  isLoading: boolean;
  isSaving: boolean;

  fetchBrands: () => Promise<void>;
  fetchBrandById: (brandId: string) => Promise<Brand | null>;
  createBrand: (brand: Partial<Brand>) => Promise<{ success: boolean; message?: string }>;
  updateBrand: (brand: Partial<Brand>) => Promise<{ success: boolean; message?: string }>;
  deleteBrand: (brandId: string) => Promise<{ success: boolean; message?: string }>;
  setBrands: (items: Brand[]) => void;
  setCurrentBrand: (brand: Brand | null) => void;
};

export const useAdminBrandStore = create<BrandStore>((set, get) => ({
  brands: [],
  currentBrand: null,
  isLoading: false,
  isSaving: false,

  setBrands: (items) => set({ brands: items }),
  setCurrentBrand: (brand) => set({ currentBrand: brand }),

  fetchBrands: async () => {
    set({ isLoading: true });
    try {
      const res = await getBrands();
      if (res.statusCode === 200 && "brands" in res) {
        set({ brands: res.brands });
      } else {
        set({ brands: [] });
        toast.error(res.message || "Error al obtener las marcas");
      }
    } catch (err) {
      console.error("❌ Error al obtener las marcas:", err);
      set({ brands: [] });
      toast.error("Error al obtener las marcas");
    } finally {
      set({ isLoading: false });
    }
  },

  fetchBrandById: async (brandId: string) => {
    set({ isLoading: true });
    try {
      const res = await getBrand(brandId);
      if (res.statusCode === 200 && "brand" in res) {
        const brandData = res.brand as Brand;
        set({ currentBrand: brandData });
        return brandData;
      } else {
        set({ currentBrand: null });
        toast.error(res.message || "Error al obtener la marca");
        return null;
      }
    } catch (err) {
      console.error("❌ Error al obtener la marca:", err);
      set({ currentBrand: null });
      toast.error("Error al obtener la marca");
      return null;
    } finally {
      set({ isLoading: false });
    }
  },

  createBrand: async (brand: Partial<Brand>) => {
    set({ isSaving: true });
    try {
      const res = await createBrand(brand);
      if (res.statusCode === 201) {
        // Recargar la lista de marcas
        await get().fetchBrands();
        toast.success(res.message || "Marca creada exitosamente");
        return {
          success: true,
          message: res.message || "Marca creada exitosamente",
        };
      } else {
        toast.error(res.message || "Error al crear la marca");
        return {
          success: false,
          message: res.message || "Error al crear la marca",
        };
      }
    } catch (err) {
      console.error("❌ Error al crear la marca:", err);
      toast.error("Error al crear la marca");
      return {
        success: false,
        message: "Error al crear la marca",
      };
    } finally {
      set({ isSaving: false });
    }
  },

  updateBrand: async (brand: Partial<Brand>) => {
    set({ isSaving: true });
    try {
      const res = await updateBrand(brand);
      if (res.statusCode === 200) {
        // Actualizar la marca en la lista si existe
        const { brands } = get();
        const updatedBrands = brands.map((b) => {
          if (b.id === brand.id) {
            return { ...b, ...brand } as Brand;
          }
          return b;
        });
        set({ brands: updatedBrands });

        // Si es la marca actual, actualizarla también
        const { currentBrand } = get();
        if (currentBrand && currentBrand.id === brand.id) {
          set({ currentBrand: { ...currentBrand, ...brand } as Brand });
        }

        // Recargar la lista para asegurar datos actualizados
        await get().fetchBrands();

        toast.success(res.message || "Marca actualizada exitosamente");
        return {
          success: true,
          message: res.message || "Marca actualizada exitosamente",
        };
      } else {
        toast.error(res.message || "Error al actualizar la marca");
        return {
          success: false,
          message: res.message || "Error al actualizar la marca",
        };
      }
    } catch (err) {
      console.error("❌ Error al actualizar la marca:", err);
      toast.error("Error al actualizar la marca");
      return {
        success: false,
        message: "Error al actualizar la marca",
      };
    } finally {
      set({ isSaving: false });
    }
  },

  deleteBrand: async (brandId: string) => {
    set({ isSaving: true });
    try {
      const res = await deleteBrand(brandId);
      if (res.statusCode === 200 || res.statusCode === 204) {
        // Eliminar la marca de la lista
        const { brands } = get();
        const updatedBrands = brands.filter((b) => b.id !== brandId);
        set({ brands: updatedBrands });

        // Si es la marca actual, limpiarla
        const { currentBrand } = get();
        if (currentBrand && currentBrand.id === brandId) {
          set({ currentBrand: null });
        }

        toast.success(res.message || "Marca eliminada exitosamente");
        return {
          success: true,
          message: res.message || "Marca eliminada exitosamente",
        };
      } else {
        toast.error(res.message || "Error al eliminar la marca");
        return {
          success: false,
          message: res.message || "Error al eliminar la marca",
        };
      }
    } catch (err) {
      console.error("❌ Error al eliminar la marca:", err);
      toast.error("Error al eliminar la marca");
      return {
        success: false,
        message: "Error al eliminar la marca",
      };
    } finally {
      set({ isSaving: false });
    }
  },
}));
