"use client";
import { create } from "zustand";
import { getSales, deleteSaleAdmin } from "@/actions";
import { Sale } from "@/components/sale/interface";
import { toast } from "sonner";

type SaleStore = {
  sales: Sale[];
  isLoading: boolean;
  isDeleting: boolean;

  fetchSales: () => Promise<void>;
  setSales: (items: Sale[]) => void;
  deleteSale: (id: string) => Promise<void>;
  getSaleById: (id: string) => Sale | undefined;
  clearSales: () => void;
};

export const useSaleStore = create<SaleStore>((set, get) => ({
  sales: [],
  isLoading: false,
  isDeleting: false,

  setSales: (items) => set({ sales: Array.isArray(items) ? items : [] }),

  clearSales: () => set({ sales: [] }),

  fetchSales: async () => {
    set({ isLoading: true });
    try {
      const res = await getSales();
      if (res.statusCode === 200) {
        const salesData = "sales" in res && Array.isArray(res.sales) 
          ? res.sales 
          : Array.isArray(res) 
          ? res 
          : [];
        set({ sales: salesData });
      } else {
        set({ sales: [] });
        toast.error(res.message || "Error al obtener las ventas");
      }
    } catch (err) {
      console.error("❌ Error al obtener las ventas:", err);
      set({ sales: [] });
      toast.error("Error de red al obtener las ventas");
    } finally {
      set({ isLoading: false });
    }
  },

  deleteSale: async (id: string) => {
    if (!id) {
      toast.error("ID de venta inválido");
      return;
    }

    set({ isDeleting: true });
    try {
      const res = await deleteSaleAdmin(id);
      if (res.statusCode === 200 || res.statusCode === 204) {
        await get().fetchSales();
        toast.success(res.message || "✅ Venta eliminada exitosamente");
      } else {
        toast.error(res.message || "Error al eliminar la venta");
      }
    } catch (err) {
      console.error("❌ Error al eliminar la venta:", err);
      toast.error("Error de red al eliminar la venta");
    } finally {
      set({ isDeleting: false });
    }
  },

  getSaleById: (id: string) => {
    try {
      const state = get();
      return state.sales.find((sale) => sale.id === id);
    } catch (error) {
      console.error("Error al obtener la venta por ID:", error);
      return undefined;
    }
  },
}));
