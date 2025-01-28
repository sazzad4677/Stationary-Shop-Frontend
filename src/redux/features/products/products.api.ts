import {baseApi} from "@/redux/api/baseApi.ts";
import {TProduct} from "@/pages/Products";

const productApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: () => ({
                url: "/products",
                method: "GET",
            }),
            transformResponse: (response: { data: TProduct[] }) => {
                return response.data;
            },
        }),
    }),
})
export const {useGetProductsQuery} = productApi;