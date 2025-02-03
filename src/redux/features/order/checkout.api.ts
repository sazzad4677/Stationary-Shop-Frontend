import {baseApi} from "@/redux/api/baseApi.ts";

const intentApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createIntent: builder.mutation({
            query: (body) => ({
                url: "/orders/create-payment-intent",
                method: "POST",
                body: body,
            }),
            transformResponse: (response: { data: string }) => response.data,
        }),
    }),
})
export const {useCreateIntentMutation} = intentApi;