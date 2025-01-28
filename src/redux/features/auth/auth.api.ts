import {baseApi} from "@/redux/api/baseApi.ts";

const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (userInfo) => ({
                url: "/auth/login",
                method: "POST",
                body: userInfo
            })
        }),
        logout: builder.mutation({
            query: () => ({
                url: "/auth/logout",
                method: "POST",
            }),
        }),

        register: builder.mutation({
            query: (userInfo) => ({
                url: "/auth/register",
                method: "POST",
                body: userInfo
            })
        }),
    }),
})
export const {useLoginMutation, useRegisterMutation, useLogoutMutation} = authApi;