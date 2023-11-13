import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { httpClient } from "../../../utils/httpclient";
import { server, SUCCESS } from "../../../Constants";
import { toast } from "react-toastify";

interface RegisterState {
    loading: boolean;
    error: boolean;
    data: any;
}

const initialState: RegisterState = {
    loading: false,
    error: false,
    data: null,
};

const registerSlice = createSlice({
    name: "register",
    initialState,
    reducers: {
        registerStart(state) {
            state.loading = true;
            state.error = false;
        },
        registerSuccess(state, action: PayloadAction<any>) {
            state.loading = false;
            state.error = false;
            state.data = action.payload;
        },
        registerFailed(state) {
            state.loading = false;
            state.error = true;
        },
    },
});

export const { registerStart, registerSuccess, registerFailed } = registerSlice.actions;
export default registerSlice.reducer;

export const registerLocal = (values: any, navigate: any) => {
    return async (dispatch: any) => {
        try {
            dispatch(registerStart());
            const result = await httpClient.post(server.REGISTER_URL, values);
            toast.success(SUCCESS);
            navigate('/login');
            dispatch(registerSuccess(result.data));
        } catch (error: any) {
            dispatch(registerFailed());
        }
    };
};
