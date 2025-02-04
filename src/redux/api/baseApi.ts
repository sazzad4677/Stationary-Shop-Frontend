import {
    createApi,
    fetchBaseQuery
} from "@reduxjs/toolkit/query/react";
import {RootState} from "@/redux/store.ts";
import {logout, setUser} from "@/redux/features/auth/auth.slice.ts";
import {Tags} from "@/constants/global.ts";

const baseQuery = fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
        const token = (getState() as RootState).auth.token;
        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }
        return headers;
    }
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const baseQueryWithReauth = async (args: any, api: any, extraOptions: any) => {
    let result = await baseQuery(args, api, extraOptions);
    if (result.error && result.error.status === 401) {
        const refreshResult = await baseQuery({
            url: '/auth/refresh-token',
            method: 'POST'
        }, api, extraOptions);
        if ((refreshResult?.data as { data: { token: string } })?.data?.token) {
            const newToken = (refreshResult.data as { data: { token: string } }).data.token;
            api.dispatch(setUser({ token: newToken }));
            result = await baseQuery(args, api, extraOptions);
        } else {
            api.dispatch(logout());
        }
    }

    return result;
};

export const baseApi = createApi({
    reducerPath: 'baseApi',
    baseQuery: baseQueryWithReauth,
    endpoints: () => ({}),
    tagTypes: Object.values(Tags),
});