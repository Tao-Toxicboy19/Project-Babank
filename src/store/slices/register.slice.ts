import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { httpClient } from "../../utils/httpclient";
import { server } from "../../Constants";
import { toast } from "react-toastify";
import { FieldValues } from "react-hook-form";

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

export const registerLocal = (values: FieldValues, navigate: any, setSubmitting: any) => {
    return async (dispatch: any) => {
        try {
            dispatch(registerStart());
            const result = await httpClient.post(server.REGISTER_URL, values);
            if (result.data && result.data.message === 'สร้างผู้ใช้เรียบร้อยแล้ว') {
                toast.success('Register Successfully');
                navigate('/login');
                dispatch(registerSuccess(result.data));
            } else {
                dispatch(registerFailed());
            }
        } catch (error: any) {
            setSubmitting(false);
            console.error('เกิดข้อผิดพลาดในการลงทะเบียน: ' + error.message);
            dispatch(registerFailed());
        }
    };
};
