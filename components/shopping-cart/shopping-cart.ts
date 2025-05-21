import { Product } from "../product/product";

export interface ShoppingCart {
  id: string;
  product: Product;
  // product:  Partial<Product>;
  quantity: number;
}
