import { createSlice, PayloadAction, ThunkAction } from "@reduxjs/toolkit";
import axios from "axios";
import { LoginResult } from "../../types/authen.type";
import { OK, server, TOKEN } from "../../Constants";
import { httpClient } from "../../utlis/httpclient";
import { RootState } from "../store";
import { Login } from "../../types/User.type";

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
export default loginSlice.reducer;


export const login = (user: Login): ThunkAction<void, RootState, unknown, any> => async (dispatch) => {
    try {
        dispatch(setLoginStart());
        const result = await httpClient.post<LoginResult>(server.LOGIN_URL, user);
        if (result.data.token === OK) {
            localStorage.setItem(TOKEN, result.data.token);
            dispatch(setLoginSuccess(result.data));
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
            dispatch(setLoginSuccess({ token, message: "Successfully" }))
        }
    }
}


export const register = async (values: any) => {
    await axios.post<string>('http://localhost:5018/api/register', values)
}

// export const login = async (values: any) => {
//     await axios.post('http://localhost:5018/api/login', values)
// }