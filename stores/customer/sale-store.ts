import { create } from "zustand";
import { deleteSale, getSales } from "@/actions";
import { Sale } from "@/components/sale/interface";

type SaleStore = {
  sales: Sale[];
  isLoading: boolean;

  fetchSales: () => Promise<void>;
  setSales: (items: Sale[]) => void;
  deleteSale: (id: string) => Promise<void>;
};

export const useSaleStore = create<SaleStore>((set, get) => ({
  sales: [],
  isLoading: false,

  setSales: (items) => set({ sales: items }),

  fetchSales: async () => {
    set({ isLoading: true });
    try {
      const res = await getSales();
      if (res.statusCode === 200 && "sales" in res) {
        get().setSales(Array.isArray(res.sales) ? res.sales : []);
      } else {
        get().setSales([]);
      }
    } catch (err) {
      console.error("Error al obtener las ventas:", err);
      set({ sales: [] });
    } finally {
      set({ isLoading: false });
    }
  },

  deleteSale: async (id: string) => {
    try {
      const res = await deleteSale(id);
      if (res.statusCode === 200) {
        get().fetchSales();
      }
    } catch (err) {
      console.error("Error al eliminar la venta:", err);
    }
  },
}));
