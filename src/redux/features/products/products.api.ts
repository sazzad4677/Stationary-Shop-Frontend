import {baseApi} from "@/redux/api/baseApi.ts";
import {TQueryMetaData} from "@/types/globals.ts";
import {Tags} from "@/constants/global.ts";
import { TProductGetApiResponse } from '@/types';

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
            transformResponse: (response: { data: TProductGetApiResponse[], meta: TQueryMetaData }) => {
                return {
                    data: response.data as TProductGetApiResponse[],
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
            transformResponse: (response: { data: TProductGetApiResponse }) => {
                return response.data as TProductGetApiResponse;
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