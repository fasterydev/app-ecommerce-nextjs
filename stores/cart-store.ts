import { create } from "zustand";
import {
  getShoppingCart,
  addItemToCart,
  removeItemFromCart,
  decreaseItemQuantity,
} from "@/actions";
import { Product } from "@/components/product/product";
import { toast } from "sonner";

type ShoppingCartItem = {
  id: string;
  product: Product;
  quantity: number;
};

type CartStore = {
  cartItems: ShoppingCartItem[];

  // acciones
  fetchCart: () => Promise<void>;
  setCartItems: (items: ShoppingCartItem[]) => void;
  addItem: (productId: string) => Promise<void>;
  decreaseItem: (productId: string) => Promise<void>;
  removeItem: (productId: string) => Promise<void>;
};

export const useCartStore = create<CartStore>((set, get) => ({
  cartItems: [],

  setCartItems: (items) => set({ cartItems: items }),

  fetchCart: async () => {
    const res = await getShoppingCart();
    if (res.statusCode === 200) {
      set({ cartItems: res.shoppingCart.items });
    }
  },

  addItem: async (productId) => {
    const prevItems = get().cartItems;
    const existingItem = prevItems.find(
      (item) => item.product.id === productId
    );
    if (existingItem) {
      set({
        cartItems: prevItems.map((item) =>
          item.product.id === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      });
    }

    try {
      const res = await addItemToCart(productId);
      if (res.statusCode === 201) {
        await get().fetchCart();
        // toast.success("Producto agregado al carrito");
      } else {
        set({ cartItems: prevItems });
        toast.error(res.message || "Error al agregar el producto");
      }
    } catch (err) {
      console.error("Error al agregar el producto:", err);
      set({ cartItems: prevItems });
      toast.error("Error de red al agregar el producto");
    }
  },

  decreaseItem: async (productId) => {
    const prevItems = get().cartItems;
    const existingItem = prevItems.find(
      (item) => item.product.id === productId
    );
    // SI TIEN CANTIDAD 1 Y NO SE PUEDE DISMINUIR DEBE ELIMINAR
    if (existingItem && existingItem.quantity === 1) {
      set({
        cartItems: prevItems.filter((item) => item.product.id !== productId),
      });
    } else {
      set({
        cartItems: prevItems.map((item) =>
          item.product.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        ),
      });
    }

    try {
      const res = await decreaseItemQuantity(productId);
      if (res.statusCode === 201) {
        await get().fetchCart();
        // toast.success("Producto eliminado");
      } else {
        set({ cartItems: prevItems });
        toast.error(res.message || "Error al eliminar el producto");
      }
    } catch (err) {
      console.error("Error al eliminar el producto:", err);
      set({ cartItems: prevItems });
      toast.error("Error de red al eliminar el producto");
    }
  },

  removeItem: async (productId) => {
    const prevItems = get().cartItems;
    set({
      cartItems: prevItems.filter((item) => item.product.id !== productId),
    });

    try {
      const res = await removeItemFromCart(productId);
      if (res.statusCode === 201) {
        // await get().fetchCart();
        // toast.success("Producto eliminado");
      } else {
        set({ cartItems: prevItems });
        toast.error(res.message || "Error al eliminar el producto");
      }
    } catch (err) {
      console.error("Error al eliminar el producto:", err);
      set({ cartItems: prevItems });
      toast.error("Error de red al eliminar el producto");
    }
  },
}));
