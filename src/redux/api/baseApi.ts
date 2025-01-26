import {
    createApi,
    fetchBaseQuery
} from "@reduxjs/toolkit/query/react";
const baseQuery = fetchBaseQuery({
    baseUrl: process.env.API_URL,
    credentials: 'include',
    prepareHeaders: (headers, {}) => {
        // const token = (getState() as RootState).auth.token;
        // if (token) {
        //     headers.set('Authorization', `${token}`);
        // }
        return headers;
    }
})

export const baseApi = createApi({
    reducerPath: 'baseApi',
    baseQuery,
    endpoints: () => ({}),
})