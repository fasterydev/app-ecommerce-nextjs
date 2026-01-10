import { Product } from "@/components/interfaces/product";

export interface ShoppingCart {
  id: string;
  product: Product;
  // product:  Partial<Product>;
  quantity: number;
}
