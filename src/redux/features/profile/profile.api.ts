import {baseApi} from "@/redux/api/baseApi.ts";
import {queryMetaData} from "@/types/globals.ts";
import {TUserProfile} from "@/redux/features/profile/profile.type.ts";

const profileApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getProfile: builder.query({
            query: () => {
                return {
                    url: `/user/me`,
                    method: "GET"
                }
            },
            transformResponse: (response: { data: TUserProfile, meta: queryMetaData }) => {
                return response.data;
            }
        }),
    }),
})
export const {useGetProfileQuery} = profileApi;