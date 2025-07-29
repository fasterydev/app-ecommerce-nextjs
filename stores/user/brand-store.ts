import { create } from "zustand";
import { getBrands } from "@/actions";
import { Brand } from "@/components/product/interface";

type BrandStore = {
  brands: Brand[];
  isLoading: boolean;

  fetchBrands: () => Promise<void>;
  setBrands: (items: Brand[]) => void;
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
}));
