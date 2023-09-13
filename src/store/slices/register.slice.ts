import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { LoginResult } from "../../types/authen.type";

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
        }
    }
})

export const { setLoginStart, setLoginSuccess, setLoginFailed } = loginSlice.actions

export const register = async (values: any) => {
    await axios.post<string>('http://localhost:5018/api/register', values)
}

export const login = async (values: any) => {
    await axios.post('http://localhost:5018/api/login', values)
}