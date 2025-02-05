import {baseApi} from "@/redux/api/baseApi.ts";
import {Tags} from "@/constants/global.ts";

const productApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createProduct: builder.mutation({
            query: (productData) => {
                return {
                    url: `/products`,
                    method: "POST",
                    body: productData,
                }
            },
            invalidatesTags: [Tags.Product]
        }),
        updateProduct: builder.mutation({
            query: ({productId, productData}: {
                productId: string;
                productData: any
            }) => {
                return {
                    url: `/products/${productId}`,
                    method: "PUT",
                    body: productData,
                }
            },
            invalidatesTags: [Tags.Product]
        }),
    }),
})
export const {
    useCreateProductMutation,
    useUpdateProductMutation
} = productApi;