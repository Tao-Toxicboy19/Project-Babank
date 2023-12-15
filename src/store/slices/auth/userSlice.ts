import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TOKEN, server } from "../../../Constants";
import { httpClient } from "../../../utils/httpclient";
import { RootState } from "../../store";

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

export const usersAsync = createAsyncThunk(
    'users/usersAsync',
    async () => {
        try {
            const token = localStorage.getItem(TOKEN);
            const config = {
                headers: {
                    Authorization: token
                }
            }
            const result = await httpClient.get(server.USERALL_URL, config)
            return result.data;
        } catch (error) {
            throw error
        }
    }
)

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(usersAsync.fulfilled, (state: UsersState, action: PayloadAction<Users[]>) => {
            state.result = action.payload
            state.loading = false
            state.error = false
        });

        builder.addCase(usersAsync.rejected, (state: UsersState) => {
            state.result = []
            state.loading = false
            state.error = true
        });

        builder.addCase(usersAsync.pending, (state: UsersState) => {
            state.result = []
            state.loading = true
            state.error = false
        })
    },
})

export const { } = usersSlice.actions
export const usersSelector = (store: RootState) => store.usersReducer
export default usersSlice.reducer