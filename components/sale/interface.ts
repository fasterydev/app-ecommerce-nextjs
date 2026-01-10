import { User } from "@/components/interfaces/user";
import { Product } from "@/components/interfaces/product";

export interface Sale {
    id:        string;
    idNumer:   number;
    status:    "completed" | "pending" | "canceled";
    products:  Product[];
    user:      User;
    createdAt: Date;
    updatedAt: Date;
    subtotal:  number;
    total:     number;
    shippingFee: number;
}

