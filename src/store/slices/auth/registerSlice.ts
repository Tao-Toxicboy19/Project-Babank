import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { httpClient } from "../../../utils/httpclient";
import { server, SUCCESS } from "../../../Constants";
import { toast } from "react-toastify";
import { FieldValues } from "react-hook-form";
import { NavigateFunction } from "react-router-dom";
import { RootState } from "../../store";

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

export const registerAsync = createAsyncThunk(
    'register/registerAsync',
    async ({ data, navigate }: { data: FieldValues, navigate: NavigateFunction }) => {
        try {
            const result = await httpClient.post(server.REGISTER_URL, data);
            toast.success(SUCCESS);
            navigate('/login');
            return result.data;
        } catch (error) {
            throw error;
        }
    }
)

const registerSlice = createSlice({
    name: 'register',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(registerAsync.fulfilled, (state: RegisterState, action: PayloadAction<any>) => {
            state.data = action.payload;
            state.loading = false;
            state.error = false
        });

        builder.addCase(registerAsync.rejected, (state: RegisterState) => {
            state.data = null;
            state.loading = false;
            state.error = true
        });

        builder.addCase(registerAsync.pending, (state: RegisterState) => {
            state.data = null
            state.loading = true;
            state.error = false
        });
    },
});

export const { } = registerSlice.actions
export const registerSelector = (store: RootState) => store.registerReducer;
export default registerSlice.reducer;

// export const { registerStart, registerSuccess, registerFailed } = registerSlice.actions;
// export default registerSlice.reducer;

// export const registerLocal = (values: any, navigate: any) => {
//     return async (dispatch: any) => {
//         try {
//             dispatch(registerStart());
//             const result = await httpClient.post(server.REGISTER_URL, values);
//             toast.success(SUCCESS);
//             navigate('/login');
//             dispatch(registerSuccess(result.data));
//         } catch (error: any) {
//             dispatch(registerFailed());
//         }
//     };
// };
