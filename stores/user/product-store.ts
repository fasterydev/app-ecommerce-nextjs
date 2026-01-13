"use client";
import { create } from "zustand";
import { createProduct, getProducts } from "@/actions";
import { Product } from "@/components/interfaces/interface";
import { toast } from "sonner";

type ProductStore = {
  products: Product[];
  isLoading: boolean;
  isCreating: boolean;

  fetchProducts: () => Promise<void>;
  setProducts: (items: Product[]) => void;
  createProduct: (product: Partial<Product>) => Promise<void>;
  getProductId: (slug: string) => Product | undefined;
  getProductById: (id: string) => Product | undefined;
  getProductsRandom: (count: number) => Product[];
  clearProducts: () => void;
};

export const useProductStore = create<ProductStore>((set, get) => ({
  products: [],
  isLoading: false,
  isCreating: false,

  setProducts: (items) => set({ products: Array.isArray(items) ? items : [] }),

  clearProducts: () => set({ products: [] }),

  fetchProducts: async () => {
    set({ isLoading: true });
    try {
      const res = await getProducts();
      if (res.statusCode === 200) {
        const productsData = "products" in res && Array.isArray(res.products)
          ? res.products
          : Array.isArray(res)
          ? res
          : [];
        set({ products: productsData });
      } else {
        set({ products: [] });
        toast.error(res.message || "Error al obtener los productos");
      }
    } catch (err) {
      console.error("❌ Error al obtener los productos:", err);
      set({ products: [] });
      toast.error("Error de red al obtener los productos");
    } finally {
      set({ isLoading: false });
    }
  },

  createProduct: async (product: Partial<Product>) => {
    if (!product.name || !product.slug) {
      toast.error("El nombre y slug del producto son requeridos");
      return;
    }

    set({ isCreating: true });
    try {
      const res = await createProduct(product);
      if (res.statusCode === 201 || res.statusCode === 200) {
        await get().fetchProducts();
        toast.success(res.message || "✅ Producto creado exitosamente");
      } else {
        toast.error(res.message || "Error al crear el producto");
      }
    } catch (err) {
      console.error("❌ Error al crear el producto:", err);
      toast.error("Error de red al crear el producto");
    } finally {
      set({ isCreating: false });
    }
  },

  getProductId: (slug: string) => {
    try {
      const state = get();
      return state.products.find((product) => product.slug === slug);
    } catch (error) {
      console.error("Error al obtener el producto por slug:", error);
      return undefined;
    }
  },

  getProductById: (id: string) => {
    try {
      const state = get();
      return state.products.find((product) => product.id === id);
    } catch (error) {
      console.error("Error al obtener el producto por ID:", error);
      return undefined;
    }
  },

  getProductsRandom: (count: number) => {
    try {
      const state = get();
      if (count <= 0 || !Number.isInteger(count)) {
        return [];
      }
      const shuffled = [...state.products].sort(() => 0.5 - Math.random());
      return shuffled.slice(0, count);
    } catch (error) {
      console.error("Error al obtener productos aleatorios:", error);
      return [];
    }
  },
}));
