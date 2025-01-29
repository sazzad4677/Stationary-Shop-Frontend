import {configureStore} from '@reduxjs/toolkit'
import {baseApi} from "@/redux/api/baseApi.ts";
import authSlice from "@/redux/features/auth/auth.slice.ts"
import {
    persistStore, persistReducer, FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage'
import cartSlice from "@/redux/features/cart/cart.slice.ts";
const persistAuthConfig = {
    key: 'auth',
    storage,
}
const persistCartConfig = {
    key: 'cart',
    storage,
}

const persistedAuthReducer = persistReducer(persistAuthConfig, authSlice)
const persistedCartReducer = persistReducer(persistCartConfig, cartSlice)

export const store = configureStore({
    reducer: {
        [baseApi.reducerPath]: baseApi.reducer,
        auth: persistedAuthReducer,
        cart: persistedCartReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
    }).concat(baseApi.middleware),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export const persistor = persistStore(store)