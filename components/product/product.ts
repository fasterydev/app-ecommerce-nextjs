import { Brand } from "./brand";

export interface Product {
  id: string;
  name: string;
  description: string;
  brand?: Brand;
  brandId?: string | null;
  rating: number;
  subName: string;
  status: string;
  images: string[];
  cost: number;
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
}
