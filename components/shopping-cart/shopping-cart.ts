import { Product } from "../interfaces/interface";

export interface ShoppingCart {
  id: string;
  product: Product;
  // product:  Partial<Product>;
  quantity: number;
}
