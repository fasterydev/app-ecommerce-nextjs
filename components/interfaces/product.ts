import { Brand } from "./brand";
import { Category } from "./category";

export interface Product {
    id: string;
    name: string;
    productId?: string;
    slug: string;
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
  