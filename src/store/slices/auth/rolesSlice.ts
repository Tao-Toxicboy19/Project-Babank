import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { server, TOKEN } from "../../../Constants";
import { RootState } from "../../store";
import { httpClient } from "../../../utils/httpclient";

interface Users {
    id: number;
    name: string;
    role: string
    ftsId: number;
    group: number
}

interface RolesState {
    loading: boolean
    error: boolean
    result: Users | null
}

const initialState: RolesState = {
    loading: false,
    error: false,
    result: null
}

export const roleAsync = createAsyncThunk(
    'role/roleAsync',
    async () => {
        try {
            const token = localStorage.getItem(TOKEN);
            const config = {
                headers: {
                    Authorization: token
                }
            }
            const result = await httpClient.post(server.ROLES_URL, {}, config);
            return result.data;
        } catch (error) {
            throw error;
        }
    }
)

const rolesSlice = createSlice({
    name: 'roles',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(roleAsync.fulfilled, (state: RolesState, action: PayloadAction<any>) => {
            state.result = action.payload;
            state.loading = false;
            state.error = false
        });

        builder.addCase(roleAsync.rejected, (state: RolesState) => {
            state.result = null;
            state.loading = false;
            state.error = true
        });

        builder.addCase(roleAsync.pending, (state: RolesState) => {
            state.result = null
            state.loading = true;
            state.error = false
        });
    },
})

export const { } = rolesSlice.actions
export const roleSelector = (store: RootState) => store.roleReducer
export default rolesSlice.reducer