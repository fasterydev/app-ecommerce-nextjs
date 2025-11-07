import { User } from "../interfaces/user";
import { Product } from "../interfaces/interface";

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

