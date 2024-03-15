import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { server } from "../../../Constants";
import { httpClient } from "../../../utils/httpclient";

export type report_solutions = {
    FTS_name: string;
    carrier_name: string;
    min_start_time: any;
    max_due_time: any;
    total_load_cargo: number;
}

interface report_solutionState {
    result: report_solutions[]
    loading: boolean
    error: boolean
}

const initialState: report_solutionState = {
    result: [],
    loading: false,
    error: false
}

export const reportFtsAsync = createAsyncThunk(
    'reportFts/reportFtsAsync',
    async (id: number) => {
        try {
            const result = await httpClient.get<report_solutions[]>(`${server.REPORT_SOLUTION_URL}/${id}`)
            return result.data
        } catch (error) {
            throw error
        }
    }
)

const reportFtsSlice = createSlice({
    name: 'reportFts',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(reportFtsAsync.fulfilled, (state: report_solutionState, action: PayloadAction<report_solutions[]>) => {
            state.result = action.payload
            state.loading = false
            state.error = false
        });

        builder.addCase(reportFtsAsync.rejected, (state: report_solutionState) => {
            state.result = []
            state.loading = false
            state.error = true
        });

        builder.addCase(reportFtsAsync.pending, (state: report_solutionState) => {
            state.result = []
            state.loading = true
            state.error = false
        });
    },
})

export const { } = reportFtsSlice.actions
export const reportFtsSelector = (store: RootState) => store.reportFtsReducer
export default reportFtsSlice.reducer