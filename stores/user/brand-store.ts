import { create } from "zustand";
import { deleteBrand, getBrands } from "@/actions";
import { Brand } from "@/components/interfaces/interface";

type BrandStore = {
  brands: Brand[];
  isLoading: boolean;

  fetchBrands: () => Promise<void>;
  setBrands: (items: Brand[]) => void;
  deleteBrand: (id: string) => Promise<void>;
};

export const useBrandStore = create<BrandStore>((set) => ({
  brands: [],
  isLoading: false,

  setBrands: (items) => set({ brands: items }),

  fetchBrands: async () => {
    set({ isLoading: true });
    try {
      const res = await getBrands();
      if (res.statusCode === 200) {
        set({ brands: res.brands });
      }
    } catch (err) {
      console.error("Error al obtener las marcas:", err);
    } finally {
      set({ isLoading: false });
    }
  },

  deleteBrand: async (id: string) => {
    set((state) => ({
      brands: state.brands.filter((brand) => brand.id !== id),
    }));
    try {
      await deleteBrand(id);
    } catch (err) {
      console.error("Error al eliminar la marca:", err);
    }
  },
}));
