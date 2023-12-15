import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { server } from "../../../Constants";
import { httpClient } from "../../../utils/httpclient";
import { RootState } from "../../store";

interface Crane {
    id: number
    crane_name: string;
    FTS_id: number;
    setuptime_crane: number;
}

interface CraneState {
    result: Crane[]
    loading: boolean
    error: boolean
}

const initialState: CraneState = {
    result: [],
    loading: false,
    error: false
}

export const craneAsync = createAsyncThunk(
    'crane/craneAsync',
    async () => {
        try {
            const result = await httpClient.get(server.CRANE)
            return result.data
        } catch (error) {
            throw error
        }
    }
)

const craneSlice = createSlice({
    name: 'crane',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(craneAsync.fulfilled, (state: CraneState, action: PayloadAction<Crane[]>) => {
            state.result = action.payload
            state.loading = false
            state.error = false
        });

        builder.addCase(craneAsync.rejected, (state: CraneState) => {
            state.result = []
            state.loading = false
            state.error = true
        });

        builder.addCase(craneAsync.pending, (state: CraneState) => {
            state.result = []
            state.loading = true
            state.error = false
        });
    },
});

export const { } = craneSlice.actions
export const craneSelector = (store: RootState) => store.craneReducer
export default craneSlice.reducer