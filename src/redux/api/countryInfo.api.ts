import {
    createApi,
    fetchBaseQuery
} from "@reduxjs/toolkit/query/react";

const countryDetailsQuery = fetchBaseQuery({
    baseUrl: "https://data-api.oxilor.com",
    credentials: 'include',
    prepareHeaders: (headers) => {
        headers.set('Authorization', `Bearer ${import.meta.env.VITE_COUNTRY_API_AUTH_KEY}`);
        return headers;
    }
})

export const countryApi = createApi({
    reducerPath: 'countries',
    baseQuery: countryDetailsQuery,
    endpoints: (builder) => ({
        getCountryQuery: builder.query({
            query: () => ({
                url: "/rest/countries"
            })
        })
    }),
})

export const {useGetCountryQueryQuery} = countryApi;