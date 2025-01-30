import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

type TGenerateResponse = {
    choices:
        {
            message:
                {
                    content: string
                }
        }[]
}

export const openAiApi = createApi({
    reducerPath: "openAiApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://api.openai.com/v1",
        prepareHeaders: (headers) => {
            headers.set("Authorization", `Bearer ${OPENAI_API_KEY}`);
            headers.set("Content-Type", "application/json");
            return headers;
        },
    }),
    endpoints: (builder) => ({
        generateDescription: builder.mutation({
            query: ({name, brand, category}) => ({
                url: "/chat/completions",
                method: "POST",
                body: {
                    model: "gpt-4o-mini",
                    messages: [
                        {
                            role: "user",
                            content: `Generate a short and professional product description for a ${category} named "${name}" from the brand "${brand}".`,
                        },
                    ],
                    max_tokens: 50,
                },
            }),
            transformResponse: (response: TGenerateResponse) => response.choices[0].message.content,
        }),
    }),
});

export const {useGenerateDescriptionMutation} = openAiApi;
