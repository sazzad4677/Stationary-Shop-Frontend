import {baseApi} from "@/redux/api/baseApi.ts";
import {TQueryMetaData} from "@/types/globals.ts";
import {TUserProfile} from "@/redux/features/profile/profile.type.ts";
import {Tags} from "@/constants/global.ts";

const profileApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getProfile: builder.query({
            query: () => {
                return {
                    url: `/user/me`,
                    method: "GET"
                }
            },
            transformResponse: (response: { data: TUserProfile, meta: TQueryMetaData }) => {
                return response.data;
            },
            providesTags: [Tags.UpdateProfile],
        }),
        updateMyProfile: builder.mutation({
            query: (userInfo) => ({
                url: `/user/me`,
                method: "PATCH",
                body: userInfo
            }),
            invalidatesTags: [Tags.UpdateProfile],
        })
    }),
})
export const {useGetProfileQuery, useUpdateMyProfileMutation} = profileApi;