import {baseApi} from "@/redux/api/baseApi.ts";

const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (userInfo) => ({
                url: "/auth/login",
                method: "POST",
                body: userInfo
            })
        })
    }),
})
export const {useLoginMutation} = authApi;