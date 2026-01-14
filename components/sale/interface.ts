import { User } from "@/components/interfaces/user";
import { Product } from "@/components/interfaces/product";

export interface Sale {
    id:        string;
    idNumer:   number;
    status:    "completed" | "pending" | "canceled";
    typeShipping?: "local_delivery" | "national_delivery" | "pickup";
    phoneContact?: string;
    street?: string;
    city?: string;
    state?: string;
    postalCode?: string;
    country?: string;
    addressLine2?: string;
    products:  Product[];
    user:      User;
    createdAt: Date;
    updatedAt: Date;
    subtotal:  number;
    total:     number;
    shippingFee: number;
}

