import { create } from "zustand";
import { getProducts, getProduct } from "@/actions/public/products";
import { toast } from "sonner";
import { Product } from "@/components/interfaces/product";

type PaginationInfo = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

type ProductStore = {
  products: Product[];
  currentProduct: Product | null;
  isLoading: boolean;
  pagination: PaginationInfo | null;

  fetchProducts: (params?: {
    page?: number;
    limit?: number;
    search?: string;
    categoryId?: string;
    brandId?: string;
    minPrice?: number;
    maxPrice?: number;
  }) => Promise<void>;
  fetchProduct: (idOrSlug: string) => Promise<void>;
  setProducts: (items: Product[]) => void;
  getProductBySlug: (slug: string) => Product | undefined;
  getProductsRandom: (count: number) => Product[];
};

export const usePublicProductStore = create<ProductStore>((set, get) => ({
  products: [],
  currentProduct: null,
  isLoading: false,
  pagination: null,

  setProducts: (items) => set({ products: items }),

  fetchProducts: async (params) => {
    set({ isLoading: true });
    try {
      const res = await getProducts(params);
      if (res.statusCode === 200 && "products" in res) {
        set({ 
          products: res.products,
          pagination: res.pagination || null,
        });
      }
    } catch (err) {
      console.error("❌ Error al obtener los productos:", err);
      toast.error("Error al obtener los productos");
    } finally {
      set({ isLoading: false });
    }
  },

  fetchProduct: async (idOrSlug: string) => {
    set({ isLoading: true });
    try {
      const res = await getProduct(idOrSlug);
      if (res.statusCode === 200 && "product" in res) {
        set({ currentProduct: res.product });
      }
    } catch (err) {
      console.error("❌ Error al obtener el producto:", err);
      toast.error("Error al obtener el producto");
    } finally {
      set({ isLoading: false });
    }
  },

  getProductBySlug: (slug: string) => {
    try {
      const state = get();
      return state.products.find((product) => product.slug === slug);
    } catch (error) {
      console.error("❌ Error al obtener el producto por slug:", error);
      return undefined;
    }
  },

  getProductsRandom: (count: number) => {
    const state = get();
    const shuffled = [...state.products].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  },
}));
