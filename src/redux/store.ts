import {configureStore} from '@reduxjs/toolkit'
import {baseApi} from "@/redux/api/baseApi.ts";
import authSlice from "@/redux/features/auth/authSlice.ts";

export const store = configureStore({
    reducer: {
        [baseApi.reducerPath]: baseApi.reducer,
        auth: authSlice
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({}).concat(baseApi.middleware),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch