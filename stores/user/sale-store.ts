import { create } from "zustand";
import { deleteSale, getSales } from "@/actions";
import { Sale } from "@/components/sale/interface";
// import { toast } from "sonner";



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
      if (res.statusCode === 200) {
        get().setSales(res.sales);
      }
    } catch (err) {
      console.error("Error al obtener las ventas:", err);
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
