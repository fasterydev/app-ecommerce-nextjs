import { create } from "zustand";
import { deleteBrand } from "@/actions/customer/brands";
import { getBrands } from "@/actions/public/brands";
import { Brand } from "@/components/interfaces/brand";
import { toast } from "sonner";

type BrandStore = {
  brands: Brand[];
  isLoading: boolean;

  fetchBrands: () => Promise<void>;
  setBrands: (items: Brand[]) => void;
  deleteBrand: (id: string) => Promise<void>;
};

export const useBrandStore = create<BrandStore>((set, get) => ({
  brands: [],
  isLoading: false,

  setBrands: (items) => set({ brands: items }),

  fetchBrands: async () => {
    set({ isLoading: true });
    try {
      const res = await getBrands();
      if (res.statusCode === 200 && "brands" in res) {
        set({ brands: res.brands });
      }
    } catch (err) {
      console.error("❌ Error al obtener las marcas:", err);
      toast.error("Error al obtener las marcas");
    } finally {
      set({ isLoading: false });
    }
  },

  deleteBrand: async (id: string) => {
    const prevBrands = get().brands;
    set((state) => ({
      brands: state.brands.filter((brand) => brand.id !== id),
    }));
    try {
      const res = await deleteBrand(id);
      if (res.statusCode !== 200 && res.statusCode !== 204) {
        set({ brands: prevBrands });
        toast.error(res.message || "Error al eliminar la marca");
      } else {
        toast.success("Marca eliminada correctamente");
      }
    } catch (err) {
      console.error("❌ Error al eliminar la marca:", err);
      set({ brands: prevBrands });
      toast.error("Error al eliminar la marca");
    }
  },
}));
