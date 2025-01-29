import {baseApi} from "@/redux/api/baseApi.ts";
import {TProduct} from "@/pages/Products";
import {queryMetaData} from "@/types/globals.ts";

const productApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: (query) => {
                const params = new URLSearchParams(query);
                return {
                    url: `/products`,
                    method: "GET",
                    params: params,
                }
            },
            transformResponse: (response: { data: TProduct[], meta: queryMetaData }) => {
                return {
                    data: response.data,
                    meta: response.meta,
                };
            },
        }),
    }),
})
export const {useGetProductsQuery} = productApi;