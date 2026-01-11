"use client";
import { create } from "zustand";
import { 
  getSales, 
  getSale, 
  updateSale, 
  UpdateSaleDto 
} from "@/actions/admin/sales";
import { Sale } from "@/components/sale/interface";
import { toast } from "sonner";

type SaleStore = {
  sales: Sale[];
  currentSale: Sale | null;
  isLoading: boolean;
  isSaving: boolean;

  fetchSales: () => Promise<void>;
  fetchSaleById: (id: string) => Promise<Sale | null>;
  updateSale: (id: string, updateSaleDto: UpdateSaleDto) => Promise<{ success: boolean; message?: string }>;
  setSales: (items: Sale[]) => void;
  setCurrentSale: (sale: Sale | null) => void;
};

export const useAdminSaleStore = create<SaleStore>((set, get) => ({
  sales: [],
  currentSale: null,
  isLoading: false,
  isSaving: false,

  setSales: (items) => set({ sales: items }),
  setCurrentSale: (sale) => set({ currentSale: sale }),

  fetchSales: async () => {
    set({ isLoading: true });
    try {
      const res = await getSales();
      if (res.statusCode === 200 && "sales" in res) {
        set({ sales: Array.isArray(res.sales) ? res.sales : [] });
      } else {
        set({ sales: [] });
        toast.error(res.message || "Error al obtener las ventas");
      }
    } catch (err) {
      console.error("❌ Error al obtener las ventas:", err);
      set({ sales: [] });
      toast.error("Error al obtener las ventas");
    } finally {
      set({ isLoading: false });
    }
  },

  fetchSaleById: async (id: string) => {
    set({ isLoading: true });
    try {
      const res = await getSale(id);
      if (res.statusCode === 200 && "sale" in res) {
        const saleData = res.sale as Sale;
        set({ currentSale: saleData });
        return saleData;
      } else {
        set({ currentSale: null });
        toast.error(res.message || "Error al obtener la venta");
        return null;
      }
    } catch (err) {
      console.error("❌ Error al obtener la venta:", err);
      set({ currentSale: null });
      toast.error("Error al obtener la venta");
      return null;
    } finally {
      set({ isLoading: false });
    }
  },

  updateSale: async (id: string, updateSaleDto: UpdateSaleDto) => {
    set({ isSaving: true });
    try {
      const res = await updateSale(id, updateSaleDto);
      if (res.statusCode === 200) {
        // Actualizar la venta en la lista si existe
        const { sales } = get();
        const updatedSales = sales.map((s) => {
          if (s.id === id) {
            return { ...s, ...updateSaleDto } as Sale;
          }
          return s;
        });
        set({ sales: updatedSales });

        // Si es la venta actual, actualizarla también
        const { currentSale } = get();
        if (currentSale && currentSale.id === id) {
          set({ currentSale: { ...currentSale, ...updateSaleDto } as Sale });
        }

        // Recargar la lista para asegurar datos actualizados
        await get().fetchSales();

        toast.success(res.message || "Venta actualizada exitosamente");
        return {
          success: true,
          message: res.message || "Venta actualizada exitosamente",
        };
      } else {
        toast.error(res.message || "Error al actualizar la venta");
        return {
          success: false,
          message: res.message || "Error al actualizar la venta",
        };
      }
    } catch (err) {
      console.error("❌ Error al actualizar la venta:", err);
      toast.error("Error al actualizar la venta");
      return {
        success: false,
        message: "Error al actualizar la venta",
      };
    } finally {
      set({ isSaving: false });
    }
  },
}));
