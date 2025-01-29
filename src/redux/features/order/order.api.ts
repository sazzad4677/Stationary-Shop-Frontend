import {baseApi} from "@/redux/api/baseApi.ts";

type TOrder = {
    fullName: string;
    email: string;
    address1: string;
    address2: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    products: {
        productId: string;
        quantity: number;
    }[];
    totalPrice: number;
};

const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        placeOrder: builder.mutation({
            query: (orderInfo: TOrder) => ({
                url: "/orders",
                method: "POST",
                body: orderInfo
            })
        }),
    }),
})
export const {usePlaceOrderMutation} = authApi;