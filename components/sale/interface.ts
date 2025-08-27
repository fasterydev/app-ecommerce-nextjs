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

export interface User {
    id:               string;
    email:            string;
    fullName:         null;
    userName:         null;
    firstName:        null;
    lastName:         null;
    isActive:         boolean;
    roles:            string[];
    createAt:         Date;
    updateAt:         Date;
    clerkId:          string;
    stripeCustomerId: null;
    brevoId:          null;
}
