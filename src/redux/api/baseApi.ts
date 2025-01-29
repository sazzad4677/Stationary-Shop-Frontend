import {
    createApi,
    fetchBaseQuery
} from "@reduxjs/toolkit/query/react";
import {RootState} from "@/redux/store.ts";

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

export const baseApi = createApi({
    reducerPath: 'baseApi',
    baseQuery,
    endpoints: () => ({}),
})