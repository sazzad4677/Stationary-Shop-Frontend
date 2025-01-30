import {
    createApi,
    fetchBaseQuery
} from "@reduxjs/toolkit/query/react";
import {RootState} from "@/redux/store.ts";
import {logout} from "@/redux/features/auth/auth.slice.ts";

const baseQuery = fetchBaseQuery({
    baseUrl:import.meta.env.VITE_API_URL,
    credentials: 'include',
    prepareHeaders: (headers, {getState}) => {
        const token = (getState() as RootState).auth.token;
        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }
        return headers;
    }
})

const baseQueryWithReauth = async (args: any, api: any, extraOptions: any) => {
    let result = await baseQuery(args, api, extraOptions);
    if (result.error && result.error.status === 401) {
        api.dispatch(logout());
    }
    return result;
};

export const baseApi = createApi({
    reducerPath: 'baseApi',
    baseQuery: baseQueryWithReauth,
    endpoints: () => ({}),
})