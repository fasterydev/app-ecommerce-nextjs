import { create } from "zustand";
import {
  getShoppingCart,
  addItemToCart,
  removeItemFromCart,
  decreaseItemQuantity,
  createSale,
} from "@/actions";
import { toast } from "sonner";
import { Product } from "@/components/interfaces/product";

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

  setCartItems: (items) =>
    set({ cartItems: Array.isArray(items) ? items : [] }),

  fetchCart: async () => {
    set({ isLoading: true });
    try {
      const res = await getShoppingCart();
      if (res.statusCode === 200 && Array.isArray(res.shoppingCart?.items)) {
        set({ cartItems: res.shoppingCart.items });
      } else {
        set({ cartItems: [] });
      }
    } catch (err) {
      console.error(" Error al obtener el carrito:", err);
      set({ cartItems: [] });
      toast.error("Error al obtener el carrito");
    } finally {
      set({ isLoading: false });
    }
  },

  addItem: async (productId) => {
    const prevItems = [...get().cartItems];
    const existingItem = prevItems.find((i) => i.product.id === productId);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      prevItems.push({
        id: crypto.randomUUID(),
        product: { id: productId } as Product, // placeholder hasta fetch real
        quantity: 1,
      });
    }
    set({ cartItems: prevItems, isLoading: true });

    try {
      const res = await addItemToCart(productId);
      if (res.statusCode === 201) {
        await get().fetchCart();
        toast.success("Producto agregado al carrito");
      } else {
        set({ cartItems: get().cartItems }); // revertimos
        toast.error(res.message || "Error al agregar el producto");
      }
    } catch (err) {
      console.error("Error al agregar producto:", err);
      set({ cartItems: get().cartItems });
      toast.error("Error de red al agregar el producto");
    } finally {
      set({ isLoading: false });
    }
  },

  decreaseItem: async (productId) => {
    const prevItems = [...get().cartItems];
    const updatedItems = prevItems
      .map((item) =>
        item.product.id === productId
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
      .filter((item) => item.quantity > 0);

    set({ cartItems: updatedItems, isLoading: true });

    try {
      const res = await decreaseItemQuantity(productId);
      if (res.statusCode === 201) {
        await get().fetchCart();
      } else {
        set({ cartItems: prevItems }); // revertimos
        toast.error(res.message || "Error al disminuir producto");
      }
    } catch (err) {
      console.error("❌ Error al disminuir producto:", err);
      set({ cartItems: prevItems });
      toast.error("Error de red al disminuir producto");
    } finally {
      set({ isLoading: false });
    }
  },

  removeItem: async (productId) => {
    const prevItems = [...get().cartItems];
    set({
      cartItems: prevItems.filter((i) => i.product.id !== productId),
      isLoading: true,
    });

    try {
      const res = await removeItemFromCart(productId);
      if (res.statusCode !== 201) {
        set({ cartItems: prevItems }); // revertimos
        toast.error(res.message || "Error al eliminar el producto");
      }
    } catch (err) {
      console.error("❌ Error al eliminar producto:", err);
      set({ cartItems: prevItems });
      toast.error("Error de red al eliminar producto");
    } finally {
      set({ isLoading: false });
    }
  },

  createSale: async (typeShipping: TypeShipping) => {
    set({ isLoading: true });
    try {
      const res = await createSale(typeShipping);
      await get().fetchCart();
      if (res.statusCode === 201) {
        toast.success(res.message || "✅ Venta creada exitosamente");
      } else {
        toast.error(res.message || "Error al crear la venta");
      }
    } catch (err) {
      console.error("❌ Error al crear venta:", err);
      toast.error("Error de red al crear la venta");
    } finally {
      set({ isLoading: false });
    }
  },

  totalPriceCart: () => {
    return get().cartItems.reduce(
      (total, item) => total + (item.product.total || 0) * item.quantity,
      0
    );
  },
}));
