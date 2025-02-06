import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "@/redux/store.ts";
import { jwtDecode } from "jwt-decode";
import { TLoggedInUser } from '@/types/user.types.ts';

type TAuthState = {
    user: null | TLoggedInUser,
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
export const loggedInUser = (state: RootState) => state.auth.user;
export const selectToken = (state: RootState) => state.auth.token;
export default authSlice.reducer;
