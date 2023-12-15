import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { httpClient } from "../../../utils/httpclient";
import { SUCCESS, server } from "../../../Constants";
import { toast } from "react-toastify";
import { FieldValues } from "react-hook-form";
import { NavigateFunction } from "react-router-dom";
import { RootState } from "../../store";

interface Result {
    crane_id: number;
    crane_name: string;
    FTS_id: number;
    setuptime_crane: number;
    wage_month_cost: number;
    premium_rate: number;
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

interface ftsAddState {
    result: FtsCrane | null
    loading: boolean
    error: boolean
}
const initialState: ftsAddState = {
    result: null,
    loading: false,
    error: false
}

export const ftsAddAsync = createAsyncThunk(
    'ftsAdd/ftsAddAsync',
    async ({ values, navigate }: { values: FieldValues, navigate: NavigateFunction }) => {
        try {
            const result = await httpClient.post(server.FLOATING, values)
            toast.success(SUCCESS);
            navigate('/transferstation')
            return result.data;
        } catch (error) {
            throw error;
        }
    }
)

const ftsAddSlice = createSlice({
    name: 'ftsAdd',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(ftsAddAsync.fulfilled, (state: ftsAddState, action: PayloadAction<FtsCrane>) => {
            state.result = action.payload
            state.loading = false
            state.error = false
        });

        builder.addCase(ftsAddAsync.rejected, (state: ftsAddState) => {
            state.result = null
            state.loading = false
            state.error = true
        });

        builder.addCase(ftsAddAsync.pending, (state: ftsAddState) => {
            state.result = null
            state.loading = true
            state.error = false
        });
    },
})

export const { } = ftsAddSlice.actions
export const ftsAddSelector = (store: RootState) => store.ftsAddReducer
export default ftsAddSlice.reducer