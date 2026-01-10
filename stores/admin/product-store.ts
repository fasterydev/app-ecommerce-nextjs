"use client";
import { 
  createProduct, 
  updateProduct, 
  deleteProduct, 
  getProducts, 
  getProduct 
} from "@/actions/admin/products";
import { Product } from "@/components/interfaces/product";
import { create } from "zustand";
import { toast } from "sonner";

type ProductStore = {
  products: Product[];
  currentProduct: Product | null;
  isLoading: boolean;
  isSaving: boolean;

  fetchProducts: () => Promise<void>;
  fetchProductById: (productId: string) => Promise<Product | null>;
  createProduct: (product: Partial<Product>) => Promise<{ success: boolean; message?: string }>;
  updateProduct: (product: Partial<Product>) => Promise<{ success: boolean; message?: string }>;
  deleteProduct: (productId: string) => Promise<{ success: boolean; message?: string }>;
  setProducts: (items: Product[]) => void;
  setCurrentProduct: (product: Product | null) => void;
};

export const useAdminProductStore = create<ProductStore>((set, get) => ({
  products: [],
  currentProduct: null,
  isLoading: false,
  isSaving: false,

  setProducts: (items) => set({ products: items }),
  setCurrentProduct: (product) => set({ currentProduct: product }),

  fetchProducts: async () => {
    set({ isLoading: true });
    try {
      const res = await getProducts();
      if (res.statusCode === 200 && "products" in res) {
        set({ products: res.products });
      } else {
        set({ products: [] });
        toast.error(res.message || "Error al obtener los productos");
      }
    } catch (err) {
      console.error("❌ Error al obtener los productos:", err);
      set({ products: [] });
      toast.error("Error al obtener los productos");
    } finally {
      set({ isLoading: false });
    }
  },

  fetchProductById: async (productId: string) => {
    set({ isLoading: true });
    try {
      const res = await getProduct(productId);
      if (res.statusCode === 200 && "product" in res) {
        const productData = res.product as Product;
        set({ currentProduct: productData });
        return productData;
      } else {
        set({ currentProduct: null });
        toast.error(res.message || "Error al obtener el producto");
        return null;
      }
    } catch (err) {
      console.error("❌ Error al obtener el producto:", err);
      set({ currentProduct: null });
      toast.error("Error al obtener el producto");
      return null;
    } finally {
      set({ isLoading: false });
    }
  },

  createProduct: async (product: Partial<Product>) => {
    set({ isSaving: true });
    try {
      const res = await createProduct(product);
      if (res.statusCode === 201) {
        // Recargar la lista de productos
        await get().fetchProducts();
        toast.success(res.message || "Producto creado exitosamente");
        return {
          success: true,
          message: res.message || "Producto creado exitosamente",
        };
      } else {
        toast.error(res.message || "Error al crear el producto");
        return {
          success: false,
          message: res.message || "Error al crear el producto",
        };
      }
    } catch (err) {
      console.error("❌ Error al crear el producto:", err);
      toast.error("Error al crear el producto");
      return {
        success: false,
        message: "Error al crear el producto",
      };
    } finally {
      set({ isSaving: false });
    }
  },

  updateProduct: async (product: Partial<Product>) => {
    set({ isSaving: true });
    try {
      const res = await updateProduct(product);
      if (res.statusCode === 200) {
        // Actualizar el producto en la lista si existe
        const { products } = get();
        const updatedProducts = products.map((p) => {
          if (p.id === product.id) {
            return { ...p, ...product } as Product;
          }
          return p;
        });
        set({ products: updatedProducts });

        // Si es el producto actual, actualizarlo también
        const { currentProduct } = get();
        if (currentProduct && currentProduct.id === product.id) {
          set({ currentProduct: { ...currentProduct, ...product } as Product });
        }

        // Recargar la lista para asegurar datos actualizados
        await get().fetchProducts();

        toast.success(res.message || "Producto actualizado exitosamente");
        return {
          success: true,
          message: res.message || "Producto actualizado exitosamente",
        };
      } else {
        toast.error(res.message || "Error al actualizar el producto");
        return {
          success: false,
          message: res.message || "Error al actualizar el producto",
        };
      }
    } catch (err) {
      console.error("❌ Error al actualizar el producto:", err);
      toast.error("Error al actualizar el producto");
      return {
        success: false,
        message: "Error al actualizar el producto",
      };
    } finally {
      set({ isSaving: false });
    }
  },

  deleteProduct: async (productId: string) => {
    set({ isSaving: true });
    try {
      const res = await deleteProduct(productId);
      if (res.statusCode === 200 || res.statusCode === 204) {
        // Eliminar el producto de la lista
        const { products } = get();
        const updatedProducts = products.filter((p) => p.id !== productId);
        set({ products: updatedProducts });

        // Si es el producto actual, limpiarlo
        const { currentProduct } = get();
        if (currentProduct && currentProduct.id === productId) {
          set({ currentProduct: null });
        }

        toast.success(res.message || "Producto eliminado exitosamente");
        return {
          success: true,
          message: res.message || "Producto eliminado exitosamente",
        };
      } else {
        toast.error(res.message || "Error al eliminar el producto");
        return {
          success: false,
          message: res.message || "Error al eliminar el producto",
        };
      }
    } catch (err) {
      console.error("❌ Error al eliminar el producto:", err);
      toast.error("Error al eliminar el producto");
      return {
        success: false,
        message: "Error al eliminar el producto",
      };
    } finally {
      set({ isSaving: false });
    }
  },
}));
