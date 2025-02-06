import {baseApi} from "@/redux/api/baseApi.ts";

const dashboardApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        dashboard: builder.query({
            query: () => ({
                url: "/dashboard",
                method: "GET",
            }),
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            transformResponse: (response: any) => response.data,
            keepUnusedDataFor: 0,
        }),
    }),
})
export const {useDashboardQuery} = dashboardApi;