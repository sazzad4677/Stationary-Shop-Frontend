import {baseApi} from "@/redux/api/baseApi.ts";
import {Tags} from "@/constants/global.ts";

const productApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllUsers: builder.query({
            query: (query) => {
                const params = new URLSearchParams(query);
                return {
                    url: `/user`,
                    method: "GET",
                    params
                }
            },
            providesTags: [Tags.USER],
            keepUnusedDataFor: 0,
        }),
        blockUser: builder.mutation({
            query: (userId: string) => {
                return {
                    url: `/admin/users/${userId}/block`,
                    method: "PATCH"
                }
            },
            invalidatesTags: [Tags.USER]
        }),
    }),
})
export const {
    useGetAllUsersQuery,
    useBlockUserMutation,
} = productApi;