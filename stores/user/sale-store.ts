import { create } from "zustand";
import { getSales } from "@/actions";
import { Product } from "@/components/product/product";
// import { toast } from "sonner";

type Sale = {
  id: string;
  idNumer: number;
  status: string;
  products: Product[];
  createdAt: string;
  updatedAt: string;
  subtotal: number;
  total: number;
};

type SaleStore = {
  sales: Sale[];
  isLoading: boolean;

  fetchSales: () => Promise<void>;
  setSales: (items: Sale[]) => void;

};

export const useSaleStore = create<SaleStore>((set, get) => ({
  sales: [],
  isLoading: false,

  setSales: (items) => set({ sales: items }),

  fetchSales: async () => {
    set({ isLoading: true });
    try {
      const res = await getSales();
      if (res.statusCode === 200) {
        get().setSales(res.sales);
      }
    } catch (err) {
      console.error("Error al obtener las ventas:", err);
    } finally {
      set({ isLoading: false });
    }
  },

 
}));
