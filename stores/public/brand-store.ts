import { create } from "zustand";
import { getBrands } from "@/actions/public/brands";
import { Brand } from "@/components/interfaces/brand";

type BrandStore = {
  brands: Brand[];
  isLoading: boolean;

  fetchBrands: () => Promise<void>;
  setBrands: (items: Brand[]) => void;
};

export const usePublicBrandStore = create<BrandStore>((set) => ({
  brands: [],
  isLoading: false,

  setBrands: (items) => set({ brands: items }),

  fetchBrands: async () => {
    set({ isLoading: true });
    try {
      const res = await getBrands();
      if (res.statusCode === 200 && "brands" in res) {
        set({ brands: res.brands });
      }
    } catch (err) {
      console.error("❌ Error al obtener las marcas:", err);
    } finally {
      set({ isLoading: false });
    }
  },
}));
