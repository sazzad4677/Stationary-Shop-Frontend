import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "@/redux/store.ts";
import { jwtDecode } from "jwt-decode";

export type TUser = {
    _id: string,
    role: string,
    name: string,
    email: string,
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
            const {token} = action.payload;
            state.token = token;
            state.user = jwtDecode(token);
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
        }
    }
})

export const {setUser, logout} = authSlice.actions;
export const selectUser = (state: RootState) => state.auth.user;
export const selectToken = (state: RootState) => state.auth.token;
export default authSlice.reducer;
