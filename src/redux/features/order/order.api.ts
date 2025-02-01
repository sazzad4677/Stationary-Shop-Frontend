import {baseApi} from "@/redux/api/baseApi.ts";
import {Tags} from "@/constants/global.ts";

type TOrder = {
    shippingAddress: {
        address1: string;
        address2: string;
        city: string;
        state: string;
        zipCode: string;
        country: string;
    };
    products: {
        productId: string;
        quantity: number;
    }[];
    totalPrice: number;
};

const orderApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        placeOrder: builder.mutation({
            query: (orderInfo: TOrder) => ({
                url: "/orders",
                method: "POST",
                body: orderInfo
            })
        }),
        getOrders: builder.query({
            query: (query) => {
                const params = new URLSearchParams(query);
                return {
                    url: `/orders`,
                    method: "GET",
                    params: params,
                }
            },
            providesTags: [Tags.Order],
            keepUnusedDataFor: 0
        }),
        getSingleOrder: builder.query({
            query: (orderId: string) => ({
                url: `/orders/${orderId}`,
            })
        }),
        updateOrder: builder.mutation(({
            query: ({id, status}: { id: string, status: string }) => ({
                url: `/orders/${id}`,
                body: {status},
                method: "PATCH",
            }),
            invalidatesTags: [Tags.Order]
        }))
    }),
})
export const {usePlaceOrderMutation, useGetOrdersQuery, useGetSingleOrderQuery, useUpdateOrderMutation} = orderApi;