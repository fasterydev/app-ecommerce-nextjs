import { create } from "zustand";
import { createProduct, getProducts } from "@/actions";
import { Product } from "@/components/product/interface";
import { toast } from "sonner";

type ProductStore = {
  products: Product[];
  isLoading: boolean;

  fetchProducts: () => Promise<void>;
  setProducts: (items: Product[]) => void;
  createProduct: (product: Partial<Product>) => Promise<void>;
  getProductId: (id: string) => Product | undefined;
};

export const useProductStore = create<ProductStore>((set, get) => ({
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

  createProduct: async (product: Partial<Product>) => {
    set({ isLoading: true });
    try {
      const res = await createProduct(product);
      if (res.statusCode === 201) {
        await useProductStore.getState().fetchProducts();
      }
    } catch (err) {
      toast.error("Error al crear el producto");
      console.error("Error al crear el producto:", err);
    } finally {
      set({ isLoading: false });
    }
  },

  getProductId: (id: string) => {
    const state = get();
    return state.products.find((product) => product.id === id);
  },
}));
