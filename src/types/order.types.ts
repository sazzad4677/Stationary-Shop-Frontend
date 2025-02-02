import {TUser} from "@/redux/features/auth/auth.slice.ts";
import {TProduct} from "@/pages/Products";

export interface TOrder {
    _id: string
    orderId: string
    userId: TUser
    products: TProduct[]
    totalPrice: number
    status: string
    createdAt: string
    updatedAt: string
    shippingAddress: {
        address1: string;
        address2?: string;
        city: string;
        state: string;
        zipCode: string;
        country: string;
    }
}
