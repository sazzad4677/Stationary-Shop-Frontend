import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "@/redux/store.ts";

export type TUser = {
    userId: string,
    role: string,
    iat: number,
    exp: number,
}

type TAuthState = {
    user: null | TUser,
    token: null | string
}
const initialState: TAuthState = {
    user: null,
    token: null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action) => {
            const {user, token} = action.payload;
            state.user = user;
            state.token = token;
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
        }
    }
})

export const {setUser, logout} = authSlice.actions;
export const selectUser = (state: RootState) => state.auth;
export const selectToken = (state: RootState) => state.auth;
export default authSlice.reducer;
