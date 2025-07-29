import { create } from "zustand";
import { getProducts } from "@/actions";
import { Product } from "@/components/product/interface";

type ProductStore = {
  products: Product[];
  isLoading: boolean;

  fetchProducts: () => Promise<void>;
  setProducts: (items: Product[]) => void;
};

export const useProductStore = create<ProductStore>((set) => ({
  products: [],
  isLoading: false,

  setProducts: (items) => set({ products: items }),

  fetchProducts: async () => {
    set({ isLoading: true });
    try {
      const res = await getProducts();
      if (res.statusCode === 200) {
        set({ products: res.products });
      }
    } catch (err) {
      console.error("Error al obtener las marcas:", err);
    } finally {
      set({ isLoading: false });
    }
  },
}));
