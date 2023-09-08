import { PayloadAction, ThunkAction, createSlice } from "@reduxjs/toolkit";
import { User } from "../../types/User.type";
import { httpClient } from "../../utlis/httpclient";
import { TOKEN, server } from "../../Constants";
import { LoginResult } from "../../types/authen.type";
import { RootState } from "../store";

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

export const login = (user: User): ThunkAction<void, RootState, unknown, any> => async (dispatch) => {
    try {
        dispatch(setLoginStart());
        const result = await httpClient.post<LoginResult>(server.LOGIN_URL, user);
        if (result.data.token) {
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
            dispatch(setLoginSuccess({ token }))
        }
    }
}