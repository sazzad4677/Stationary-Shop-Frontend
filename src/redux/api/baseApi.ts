import {
    createApi,
    fetchBaseQuery
} from "@reduxjs/toolkit/query/react";
import {RootState} from "@/redux/store.ts";
import {logout} from "@/redux/features/auth/auth.slice.ts";
import {Tags} from "@/constants/global.ts";

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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const baseQueryWithReauth = async (args: any, api: any, extraOptions: any) => {
    const result = await baseQuery(args, api, extraOptions);
    if (result.error && result.error.status === 401) {
        api.dispatch(logout());
    }
    return result;
};

export const baseApi = createApi({
    reducerPath: 'baseApi',
    baseQuery: baseQueryWithReauth,
    endpoints: () => ({}),
    tagTypes: [Tags.UpdateProfile, Tags.Product, Tags.USER],
})