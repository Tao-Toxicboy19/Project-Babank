import { PayloadAction, ThunkAction, createSlice } from "@reduxjs/toolkit";
import { SUCCESS, server } from "../../../Constants";
import { httpClient } from "../../../utils/httpclient";
import { RootState } from "../../store";
import { toast } from "react-toastify";
import { FieldValues } from "react-hook-form";

interface Users {
    id: number;
    username: string;
    roles: string
}

interface UsersState {
    loading: boolean
    error: boolean
    result: Users[]
}

const initialState: UsersState = {
    result: [],
    loading: false,
    error: false
}

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setusersStart: (state: UsersState) => {
            state.result = []
            state.loading = true
            state.error = false
        },
        setusersSuccess: (state: UsersState, action: PayloadAction<Users[]>) => {
            state.result = action.payload
            state.loading = false
            state.error = false
        },
        setusersFailure: (state: UsersState) => {
            state.result = []
            state.error = false
            state.loading = false
        },
    }
})

export const { setusersStart, setusersSuccess, setusersFailure } = usersSlice.actions
export default usersSlice.reducer

export const loadUser = (): ThunkAction<void, RootState, unknown, any> => async (dispatch) => {
    try {
        dispatch(setusersStart())
        const token = localStorage.getItem("token");
        const config = {
            headers: {
                Authorization: token
            }
        };
        const result = await httpClient.get(server.USERALL_URL, config)
        dispatch(setusersSuccess(result.data))
    }
    catch (error) {
        dispatch(setusersFailure())
    }
}

export const GrantPermissions = (id: any, data: FieldValues) => {
    return async (dispatch: any) => {
        try {
            const token = localStorage.getItem("token");
            const config = {
                headers: {
                    Authorization: token
                }
            };
            await httpClient.patch(`${server.USER_URL}/${id}`, data, config);
            toast.success(SUCCESS)
            dispatch(loadUser())
        } catch (error) {
            dispatch(setusersFailure())
        }
    };
};