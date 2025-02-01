import {baseApi} from "@/redux/api/baseApi.ts";
import {TProduct} from "@/pages/Products";
import {queryMetaData} from "@/types/globals.ts";
import {Tags} from "@/constants/global.ts";

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
            keepUnusedDataFor: 0,
            providesTags: [Tags.Product]
        }),
        getSingleProduct: builder.query({
            query: (productId) => {
                return {
                    url: `/products/${productId}`,
                    method: "GET",
                }
            },
            transformResponse: (response: { data: TProduct }) => {
                return response.data;
            },
            keepUnusedDataFor: 0,
        }),
        deleteProduct: builder.mutation({
            query: (productId) => {
                return {
                    url: `/products/${productId}`,
                    method: "DELETE",
                }
            },
            invalidatesTags: [Tags.Product]
        }),
    }),
})
export const {
    useGetProductsQuery,
    useGetSingleProductQuery,
    useDeleteProductMutation,
} = productApi;