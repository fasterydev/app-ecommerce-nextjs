import { create } from 'zustand';
import { getShoppingCart } from '@/actions';
import { Product } from '@/components/product/product';

type ShoppingCartItem = {
  id: string;
  product: Product;
  quantity: number;
};

type CartStore = {
  cartItems: ShoppingCartItem[];
  fetchCart: () => Promise<void>;
  setCartItems: (items: ShoppingCartItem[]) => void;
};

export const useCartStore = create<CartStore>((set) => ({
  cartItems: [],
  setCartItems: (items) => set({ cartItems: items }),
  fetchCart: async () => {
    const res = await getShoppingCart();
    if (res.statusCode === 200) {
      set({ cartItems: res.shoppingCart.items });
    }
  },
}));
