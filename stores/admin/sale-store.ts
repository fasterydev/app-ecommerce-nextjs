"use client";
import { create } from "zustand";
import { 
  getSales, 
  getSale, 
  updateSale, 
  UpdateSaleDto,
  type SalesPagination,
  getSalesAnalytics,
  type SalesAnalyticsResponse,
} from "@/actions/admin/sales";
import { Sale } from "@/components/sale/interface";
import { toast } from "sonner";

type SaleStore = {
  sales: Sale[];
  currentSale: Sale | null;
  isLoading: boolean;
  isSaving: boolean;
  isAnalyticsLoading: boolean;
  pagination: SalesPagination;
  lastError: string | null;
  lastStatusCode: number | null;
  analytics: SalesAnalyticsResponse | null;
  analyticsError: string | null;

  fetchSales: (opts?: { page?: number; limit?: number }) => Promise<void>;
  fetchSalesAnalytics: (opts?: { months?: number }) => Promise<void>;
  fetchSaleById: (id: string) => Promise<Sale | null>;
  updateSale: (id: string, updateSaleDto: UpdateSaleDto) => Promise<{ success: boolean; message?: string }>;
  setSales: (items: Sale[]) => void;
  setCurrentSale: (sale: Sale | null) => void;
  setPage: (page: number) => void;
  setLimit: (limit: number) => void;
};

export const useAdminSaleStore = create<SaleStore>((set, get) => ({
  sales: [],
  currentSale: null,
  isLoading: false,
  isSaving: false,
  isAnalyticsLoading: false,
  lastError: null,
  lastStatusCode: null,
  pagination: { page: 1, limit: 10, total: 0, totalPages: 1 },
  analytics: null,
  analyticsError: null,

  setSales: (items) => set({ sales: items }),
  setCurrentSale: (sale) => set({ currentSale: sale }),
  setPage: (page) => set({ pagination: { ...get().pagination, page } }),
  setLimit: (limit) =>
    set({ pagination: { ...get().pagination, limit, page: 1 } }),

  fetchSales: async (opts) => {
    set({ isLoading: true, lastError: null });
    try {
      const { page, limit } = get().pagination;
      const res = await getSales({
        page: opts?.page ?? page,
        limit: opts?.limit ?? limit,
      });

      if (res.statusCode === 200) {
        set({
          sales: Array.isArray(res.sales) ? res.sales : [],
          pagination: res.pagination
            ? res.pagination
            : { ...get().pagination, total: Array.isArray(res.sales) ? res.sales.length : 0 },
          lastStatusCode: res.statusCode,
        });
      } else {
        set({
          sales: [],
          lastError: res.message || "Error al obtener las ventas",
          lastStatusCode: res.statusCode,
        });
        toast.error(res.message || "Error al obtener las ventas");
      }
    } catch (err) {
      console.error("❌ Error al obtener las ventas:", err);
      set({ sales: [], lastError: "Error al obtener las ventas", lastStatusCode: null });
      toast.error("Error al obtener las ventas");
    } finally {
      set({ isLoading: false });
    }
  },

  fetchSalesAnalytics: async (opts) => {
    set({ isAnalyticsLoading: true, analyticsError: null });
    try {
      const res = await getSalesAnalytics({ months: opts?.months ?? 6 });
      if (res.statusCode === 200 && "analytics" in res) {
        set({ analytics: res.analytics as SalesAnalyticsResponse });
      } else {
        set({
          analytics: null,
          analyticsError: res.message || "Error al obtener analytics",
        });
      }
    } catch (err) {
      console.error("❌ Error al obtener analytics:", err);
      set({ analytics: null, analyticsError: "Error al obtener analytics" });
      toast.error("Error al obtener analytics");
    } finally {
      set({ isAnalyticsLoading: false });
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
