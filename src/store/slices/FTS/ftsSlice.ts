import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { server } from "../../../Constants";
import { httpClient } from "../../../utils/httpclient";

interface Result {
    crane_id: number;
    crane_name: string;
    FTS_id: number;
    setuptime_crane: number;
    wage_month_cost: number;
}

interface FtsCrane {
    fts_id: any;
    FTS_name: string;
    lat: number;
    lng: number;
    setuptime_FTS: number;
    speed: number;
    result: Result[];
}

interface FtsCraneState {
    result: FtsCrane[]
    loading: boolean
    error: boolean
}

const initialState: FtsCraneState = {
    result: [],
    loading: false,
    error: false
}

export const ftsAsync = createAsyncThunk(
    'fts/ftsAsync',
    async () => {
        try {
            const result = await httpClient.get(server.FLOATING)
            return result.data;
        } catch (error) {
            throw error;
        }
    }
)

const ftsSlice = createSlice({
    name: 'fts',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(ftsAsync.fulfilled, (state: FtsCraneState, action: PayloadAction<FtsCrane[]>) => {
            state.result = action.payload
            state.loading = false
            state.error = false
        });

        builder.addCase(ftsAsync.rejected, (state: FtsCraneState) => {
            state.result = []
            state.loading = false
            state.error = true
        });

        builder.addCase(ftsAsync.pending, (state: FtsCraneState) => {
            state.result = []
            state.loading = true
            state.error = false
        });
    },
})

export const { } = ftsSlice.actions
export const ftsSelector = (store: RootState) => store.ftsReducer
export default ftsSlice.reducer