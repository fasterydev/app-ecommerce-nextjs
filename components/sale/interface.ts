import { User } from "../interfaces/user";
import { Product } from "../product/interface";

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
}

