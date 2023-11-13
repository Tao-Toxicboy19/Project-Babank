import { createSlice, PayloadAction, ThunkAction } from "@reduxjs/toolkit";
import { server } from "../../Constants";
import { RootState } from "../store";
import { LoginResult } from "../../types/User.type";
import { httpClient } from "../../utils/httpclient";
import { toast } from 'react-toastify';
import { FieldValues } from "react-hook-form";

interface RolesState {
    loading: boolean
    error: boolean
    result: any
}

const initialState: RolesState = {
    loading: false,
    error: false,
    result: null
}

const rolesSlice = createSlice({
    name: 'roles',
    initialState,
    reducers: {
        setrolesStart(state) {
            state.result = null
            state.loading = true
            state.error = false
        },
        setrolesSuccess(state, action: PayloadAction<any>) {
            state.result = action.payload
            state.loading = false
            state.error = false
        },
        setrolesFailed(state) {
            state.result = null
            state.error = true
            state.loading = false
        },
    }
})

export const { setrolesStart, setrolesSuccess, setrolesFailed } = rolesSlice.actions
export default rolesSlice.reducer;

export const roles = (): ThunkAction<void, RootState, unknown, any> => async (dispatch) => {
    try {
        dispatch(setrolesStart());
        const token = localStorage.getItem("token");
        const config = {
            headers: {
                Authorization: token
            }
        };
        const result = await httpClient.post(server.ROLES_URL, {}, config);
        console.log(result.data)
        dispatch(setrolesSuccess(result.data));
    } catch (error) {
        dispatch(setrolesFailed());
    }
};