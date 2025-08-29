export interface Brand {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}
export interface Category {
  id: string;
  name: string;
  description: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}
export interface Product {
  id: string;
  name: string;
  description: string;
  quantity?: number;
  brand?: Brand;
  brandId?: string | null;
  categoryId?: string | null;
  rating: number;
  status: "draft" | "published" | "archived";
  images: string[];
  cost: number;
  revenue: number;
  revenueAdmin: number;
  variants: string;
  sku: string;
  barcode: string;
  discount: number;
  isNew: boolean;
  isBestSeller: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  stock: number;
  total: number;
  htmlContent: string;
  category?: Category;
}
