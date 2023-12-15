import { createAsyncThunk, createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit";
import { server, TOKEN } from "../../../Constants";
import { LoginResult } from "../../../type/User.type";
import { httpClient } from "../../../utils/httpclient";
import { toast } from 'react-toastify';
import { FieldValues } from "react-hook-form";
import { NavigateFunction } from "react-router-dom";
import { RootState } from "../../store";


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

export const loginAsync = createAsyncThunk(
    'login/loginAsync',
    async ({ data, navigate, sunmitting }: { data: FieldValues, navigate: NavigateFunction, sunmitting: () => void }) => {
        try {
            const result = await httpClient.post(server.LOGIN_URL, data);
            if (result.data.token) {
                localStorage.setItem(TOKEN, result.data.token);
            }
            sunmitting()
            navigate('/home')
            return result.data;
        } catch (error) {
            throw error;
        }
    }
)

export const restoreLogin = () => async (dispatch: Dispatch) => {
    try {
        const token = localStorage.getItem(TOKEN);
        if (token) {
            dispatch(setTokens({ message: "Successfully", token }));
        }
    } catch (error) {
        throw error;
    }
}

export const logout = (navigate: NavigateFunction) => async (dispatch: Dispatch) => {
    try {
        localStorage.removeItem(TOKEN);
        dispatch(setRemoveToken());
        navigate('/login')
        toast.success('logged out')
    } catch (error) {
        throw error;
    }
}

const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        setTokens: (state: LoginState, action: PayloadAction<LoginResult>) => {
            state.data = action.payload;
        },
        setRemoveToken(state: LoginState) {
            state.loading = false
            state.data = null;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(loginAsync.fulfilled, (state: LoginState, action: PayloadAction<LoginResult>) => {
            state.data = action.payload;
            state.loading = false;
            state.error = false
        });

        builder.addCase(loginAsync.rejected, (state: LoginState) => {
            state.data = null;
            state.loading = false;
            state.error = true
        });

        builder.addCase(loginAsync.pending, (state: LoginState) => {
            state.data = null
            state.loading = true;
            state.error = false
        });
    },
})

export const { setTokens, setRemoveToken } = loginSlice.actions
export const loginSelector = (store: RootState) => store.loginReducer;
export default loginSlice.reducer;