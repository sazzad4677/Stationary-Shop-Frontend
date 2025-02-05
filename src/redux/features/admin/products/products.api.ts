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
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
        generateDescription: builder.mutation({
            query: ({name, brand, category}) => ({
                url: "/products/generate-product-description",
                method: "POST",
                body: {name, brand, category},
            }),
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            transformResponse: (response: { data: any }) => response.data,
        }),
    }),
})
export const {
    useCreateProductMutation,
    useUpdateProductMutation,
    useGenerateDescriptionMutation,
} = productApi;