import {baseApi} from "@/redux/api/baseApi.ts";
import {Tags} from "@/constants/global.ts";

type TOrder = {
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
        })),
        getMyOrder: builder.query({
            query: () => ({
                url: `/orders/get-my-order`,
                method: "GET",
            }),
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            transformResponse: (response: { data: any }) => {
                return response.data;
            },
            keepUnusedDataFor: 0,
            providesTags: [Tags.MyOrders]
        }),
        orderPayNow: builder.mutation({
            query: (orderId) => ({
                url: `/orders/pay-now/${orderId}`,
                method: "GET",
            })
        }),
        cancelOrder: builder.mutation({
            query: (orderId) => ({
                url: `/orders/cancel/${orderId}`,
                method: "GET",
            }),
            invalidatesTags: [Tags.MyOrders]
        }),
        initiateRefund: builder.mutation({
            query: (orderId) => ({
                url: `/orders/initiate-refund/${orderId}`,
                method: "GET",
            }),
            invalidatesTags: [Tags.Order]
        })
    }),
})
export const {usePlaceOrderMutation, useGetOrdersQuery, useGetSingleOrderQuery, useUpdateOrderMutation, useGetMyOrderQuery, useOrderPayNowMutation, useCancelOrderMutation, useInitiateRefundMutation} = orderApi;