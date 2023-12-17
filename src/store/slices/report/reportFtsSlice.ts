import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { server } from "../../../Constants";
import { httpClient } from "../../../utils/httpclient";

enum Category {
    Export = "export",
    Import = "import",
}
interface report_solutions {
    solution_id: number;
    FTS_id: number;
    carrier_id: number;
    lat: number;
    lng: number;
    arrivaltime: any;
    exittime: any;
    operation_time: number;
    Setup_time: number;
    travel_Distance: number;
    travel_time: number;
    operation_rate: number;
    consumption_rate: number;
    or_id: number;
    cr_id: number;
    category: Category;
    arrival_time: any;
    deadline_time: any;
    latitude: number;
    longitude: number;
    maxFTS: number;
    penalty_rate: number;
    reward_rate: number;
    order_id: number;
    cargo_id: number;
    load: number;
    bulk: number;
    id: number;
    FTS_name: string;
    setuptime_FTS: number;
    speed: number;
    cargo_name: string;
    carrier_name: string;
    holder: string;
    maxcapacity: number;
    burden: number;
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
    async () => {
        try {
            const result = await httpClient.get<report_solutions[]>(server.REPORT_SOLUTION_URL)
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