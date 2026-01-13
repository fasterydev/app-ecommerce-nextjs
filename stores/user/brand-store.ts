"use client";
import { create } from "zustand";
import { deleteBrand, getBrands } from "@/actions";
import { Brand } from "@/components/interfaces/interface";
import { toast } from "sonner";

type BrandStore = {
  brands: Brand[];
  isLoading: boolean;
  isDeleting: boolean;

  fetchBrands: () => Promise<void>;
  setBrands: (items: Brand[]) => void;
  deleteBrand: (id: string) => Promise<void>;
  getBrandById: (id: string) => Brand | undefined;
  clearBrands: () => void;
};

export const useBrandStore = create<BrandStore>((set, get) => ({
  brands: [],
  isLoading: false,
  isDeleting: false,

  setBrands: (items) => set({ brands: Array.isArray(items) ? items : [] }),

  clearBrands: () => set({ brands: [] }),

  fetchBrands: async () => {
    set({ isLoading: true });
    try {
      const res = await getBrands();
      if (res.statusCode === 200) {
        const brandsData = "brands" in res && Array.isArray(res.brands)
          ? res.brands
          : Array.isArray(res)
          ? res
          : [];
        set({ brands: brandsData });
      } else {
        set({ brands: [] });
        toast.error(res.message || "Error al obtener las marcas");
      }
    } catch (err) {
      console.error("❌ Error al obtener las marcas:", err);
      set({ brands: [] });
      toast.error("Error de red al obtener las marcas");
    } finally {
      set({ isLoading: false });
    }
  },

  deleteBrand: async (id: string) => {
    if (!id) {
      toast.error("ID de marca inválido");
      return;
    }

    const prevBrands = [...get().brands];
    set({
      brands: prevBrands.filter((brand) => brand.id !== id),
      isDeleting: true,
    });

    try {
      const res = await deleteBrand(id);
      if (res.statusCode === 200 || res.statusCode === 204) {
        await get().fetchBrands();
        toast.success(res.message || "✅ Marca eliminada exitosamente");
      } else {
        set({ brands: prevBrands }); // revertimos
        toast.error(res.message || "Error al eliminar la marca");
      }
    } catch (err) {
      console.error("❌ Error al eliminar la marca:", err);
      set({ brands: prevBrands }); // revertimos
      toast.error("Error de red al eliminar la marca");
    } finally {
      set({ isDeleting: false });
    }
  },

  getBrandById: (id: string) => {
    try {
      const state = get();
      return state.brands.find((brand) => brand.id === id);
    } catch (error) {
      console.error("Error al obtener la marca por ID:", error);
      return undefined;
    }
  },
}));
