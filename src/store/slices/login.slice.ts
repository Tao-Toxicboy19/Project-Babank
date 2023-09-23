import { createSlice, PayloadAction, ThunkAction } from "@reduxjs/toolkit";
import { server } from "../../Constants";
import { RootState } from "../store";
import { Login, LoginResult } from "../../types/User.type";
import { httpClient } from "../../utlis/httpclient";

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


export const login = (user: Login, navigate: any): ThunkAction<void, RootState, unknown, any> => async (dispatch) => {
    try {
        dispatch(setLoginStart());
        const result = await httpClient.post<LoginResult>(server.LOGIN_URL, user);
        if (result.data.token) {
            localStorage.setItem('token', result.data.token);
            dispatch(setLoginSuccess(result.data));
            // dispatch(setUser(result.data));
            alert('Login successfully');
            navigate('/transferstation')
        } else {
            dispatch(setLoginFailed());
        }
    } catch (error) {
        dispatch(setLoginFailed());
    }
};

export const restoreLogin = () => {
    return (dispatch: any) => {
        const token = localStorage.getItem('token')
        if (token) {
            dispatch(setLoginSuccess({ message: "Successfully", token }))
        }
    }
}

export const logout = () => {
    return (dispatch: any) => {
        localStorage.removeItem('token');
        alert('logged out');
        dispatch(setLogout());
    };
};
