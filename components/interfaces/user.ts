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