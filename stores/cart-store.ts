import { create } from "zustand";
import {
  getShoppingCart,
  addItemToCart,
  removeItemFromCart,
  decreaseItemQuantity,
  createSale,
} from "@/actions";
import { toast } from "sonner";
import { Product } from "@/components/interfaces/interface";
type TypeShipping = "local_delivery" | "national_delivery" | "pickup";
type ShoppingCartItem = {
  id: string;
  product: Product;
  quantity: number;
};

type CartStore = {
  cartItems: ShoppingCartItem[];
  isLoading: boolean;

  fetchCart: () => Promise<void>;
  setCartItems: (items: ShoppingCartItem[]) => void;
  addItem: (productId: string) => Promise<void>;
  decreaseItem: (productId: string) => Promise<void>;
  removeItem: (productId: string) => Promise<void>;
  createSale: (typeShipping: TypeShipping) => Promise<void>;
  totalPriceCart: () => number;
};

export const useCartStore = create<CartStore>((set, get) => ({
  cartItems: [],
  isLoading: false,

  setCartItems: (items) => set({ cartItems: items }),

  fetchCart: async () => {
    set({ isLoading: true });
    try {
      const res = await getShoppingCart();
      if (res.statusCode === 200) {
        set({
          cartItems: Array.isArray(res.shoppingCart?.items)
            ? res.shoppingCart.items
            : [],
        });
      } else {
        set({ cartItems: [] });
      }
    } catch (err) {
      console.error("Error al obtener el carrito:", err);
      set({ cartItems: [] });
    } finally {
      set({ isLoading: false });
    }
  },

  addItem: async (productId) => {
    const prevItems = Array.isArray(get().cartItems) ? get().cartItems : [];
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

    set({ isLoading: true });
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
    } finally {
      set({ isLoading: false });
    }
  },

  decreaseItem: async (productId) => {
    const prevItems = get().cartItems;
    const existingItem = prevItems.find(
      (item) => item.product.id === productId
    );

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

    set({ isLoading: true });
    try {
      const res = await decreaseItemQuantity(productId);
      if (res.statusCode === 201) {
        await get().fetchCart();
      } else {
        set({ cartItems: prevItems });
        toast.error(res.message || "Error al eliminar el producto");
      }
    } catch (err) {
      console.error("Error al eliminar el producto:", err);
      set({ cartItems: prevItems });
      toast.error("Error de red al eliminar el producto");
    } finally {
      set({ isLoading: false });
    }
  },

  removeItem: async (productId) => {
    const prevItems = get().cartItems;
    set({
      cartItems: prevItems.filter((item) => item.product.id !== productId),
      isLoading: true,
    });

    try {
      const res = await removeItemFromCart(productId);
      if (res.statusCode !== 201) {
        set({ cartItems: prevItems });
        toast.error(res.message || "Error al eliminar el producto");
      }
    } catch (err) {
      console.error("Error al eliminar el producto:", err);
      set({ cartItems: prevItems });
      toast.error("Error de red al eliminar el producto");
    } finally {
      set({ isLoading: false });
    }
  },

  createSale: async (typeShipping: TypeShipping) => {
    set({ isLoading: true });
    try {
      const res = await createSale(typeShipping);
      await get().fetchCart();
      toast.success(res.message || "Venta creada exitosamente");
    } catch (err) {
      console.error("Error al crear la venta:", err);
      toast.error("Error al crear la venta");
    } finally {
      set({ isLoading: false });
    }
  },
  totalPriceCart: () => {
    const items = get().cartItems;
    return items.reduce(
      (total, item) => total + item.product.total * item.quantity,
      0
    );
  },
}));
