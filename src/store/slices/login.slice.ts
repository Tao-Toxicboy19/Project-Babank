import { createSlice, PayloadAction, ThunkAction } from "@reduxjs/toolkit";
import axios from "axios";
import { LoginResult } from "../../types/authen.type";
import { server, TOKEN } from "../../Constants";
import { RootState } from "../store";
import { Login } from "../../types/User.type";
import { httpClient } from "../../utlis/httpclient";
import { setUser } from "./authSlice";

interface LoginState {
    loading: boolean
    error: boolean
    data: any
}

const initialState: LoginState = {
    loading: false,
    error: false,
    data: null
}

const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        setLoginStart(state) {
            state.data = null
            state.loading = true
            state.error = false
        },
        setLoginSuccess(state, action: PayloadAction<LoginResult>) {
            state.data = action.payload
            state.loading = false
            state.error = false
        },
        setLoginFailed(state) {
            state.data = null
            state.error = true
            state.loading = false
        },
        setLogout(state) {
            state.data = null
            state.error = false
            state.loading = false
        }
    }
})

export const { setLoginStart, setLoginSuccess, setLoginFailed, setLogout } = loginSlice.actions
export default loginSlice.reducer;


export const login = (user: Login): ThunkAction<void, RootState, unknown, any> => async (dispatch) => {
    try {
        dispatch(setLoginStart());
        const result = await httpClient.post<LoginResult>(server.LOGIN_URL, user);
        if (result.data.token) {
            localStorage.setItem(TOKEN, result.data.token);
            dispatch(setLoginSuccess(result.data));
            dispatch(setUser(result.data));
            alert('Login successfully');
        } else {
            dispatch(setLoginFailed());
        }
    } catch (error) {
        dispatch(setLoginFailed());
    }
};

export const restoreLogin = () => {
    return (dispatch: any) => {
        const token = localStorage.getItem(TOKEN)
        if (token) {
            dispatch(setLoginSuccess({ message: "Successfully", token }))
        }
    }
}

export const loutout = (navigate: any) => {
    return (dispatch: any) => {
        localStorage.removeItem(TOKEN)
        dispatch(setLogout())
        alert('logout')
        navigate('/login')
    }
}