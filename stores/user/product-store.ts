import { create } from "zustand";
import { createProduct, getProducts } from "@/actions";
import { Product } from "@/components/interfaces/interface";
import { toast } from "sonner";

type ProductStore = {
  products: Product[];
  isLoading: boolean;

  fetchProducts: () => Promise<void>;
  setProducts: (items: Product[]) => void;
  createProduct: (product: Partial<Product>) => Promise<void>;
  getProductId: (slug: string) => Product | undefined;
  getProductsRandom: (count: number) => Product[];
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

  getProductId: (slug: string) => {
    try {
      const state = get();
      return state.products.find((product) => product.slug === slug);
    } catch (error) {
      console.error("Error al obtener el producto por slug:", error);
      return undefined;
    } finally {
      set({ isLoading: false });
    }
  },
  
  getProductsRandom: (count: number) => {
    const state = get();
    const shuffled = [...state.products].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  },
}));
