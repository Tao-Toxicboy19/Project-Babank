import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { server } from "../../../Constants";
import { httpClient } from "../../../utils/httpclient";

export type report_solution_crane = {
    solution_id: number;
    order_id: number;
    carrier_id: number;
    start_time: Date;
    due_time: Date;
    operation_time: number;
    Setup_time: number;
    travel_Distance: number;
    travel_time: number;
    operation_rate: number;
    consumption_rate: number;
    crane_id: number;
    bulk: number;
    load_cargo: number;
    cargo_id: number;
    penalty_cost: number;
    reward: number;
    cr_id: number;
    carrier_name: string;
    holder: string;
    maxcapacity: number;
    burden: number;
    Width: number;
    carrier_max_FTS: number;
    carrier_max_crane: number;
    length: number;
    has_crane: HasCrane;
    id: number;
    crane_name: string;
    FTS_id: number;
    setuptime_crane: number;
    wage_month_cost: number;
    FTS_name: string;
    lat: number;
    lng: number;
    setuptime_FTS: number;
    speed: number;
    cargo_name: string;
    premium_rate: number;
    total_cost: string
}

enum HasCrane {
    Has = "has",
    No = "no",
}

interface report_solution_craneState {
    result: report_solution_crane[]
    loading: boolean
    error: boolean
}

const initialState: report_solution_craneState = {
    result: [],
    loading: false,
    error: false
}

export const reportCraneAsync = createAsyncThunk(
    'reportCrane/reportCraneAsync',
    async (id: number) => {
        try {
            const result = await httpClient.get<report_solution_crane[]>(`${server.REPORT_SOLUTION_CRANE_URL}/${id}`)
            // console.log(result.data)
            return result.data
        } catch (error) {
            throw error
        }
    }
)

const reportCraneSlice = createSlice({
    name: 'reportCrane',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(reportCraneAsync.fulfilled, (state: report_solution_craneState, action: PayloadAction<report_solution_crane[]>) => {
            state.result = action.payload
            state.loading = false
            state.error = false
        });

        builder.addCase(reportCraneAsync.rejected, (state: report_solution_craneState) => {
            state.result = []
            state.loading = false
            state.error = true
        });

        builder.addCase(reportCraneAsync.pending, (state: report_solution_craneState) => {
            state.result = []
            state.loading = true
            state.error = false
        });
    },
})

export const { } = reportCraneSlice.actions
export const reportCraneSelector = (store: RootState) => store.reportCraneReducer
export default reportCraneSlice.reducer