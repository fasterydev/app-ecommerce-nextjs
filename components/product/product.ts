export interface Product {
  id: string;
  name: string;
  description: string;
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
}
