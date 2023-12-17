import { createAsyncThunk, createSlice, PayloadAction, ThunkAction } from "@reduxjs/toolkit";
import { server } from "../../../Constants";
import { httpClient } from "../../../utils/httpclient";
import { RootState } from "../../store";

interface CraneV2 {
    id: number;
    crane_name: string;
    FTS_id: number;
    setuptime_crane: number;
}

interface FtsV2 {
    id: number;
    FTS_name: string;
    lat: number;
    lng: number;
    setuptime_FTS: number;
    speed: number;
}

interface CarneSolutionV2 {
    solution_id: number;
    FTS_id: number;
    crane_id: number;
    total_cost: number;
    total_consumption_cost: number;
    total_wage_cost: number;
    penality_cost: number;
    total_reward: number;
    total_late_time: number;
    total_early_time: number;
    total_operation_consumption_cost: number;
    total_operation_time: number;
    total_preparation_crane_time: number;
    date: Date;
    crane: CraneV2;
    fts: FtsV2;
}

interface CarneSolutionV2State {
    loading: boolean
    error: boolean
    result: CarneSolutionV2[]
}

const initialState: CarneSolutionV2State = {
    loading: false,
    error: false,
    result: []
}

export const craneSolutionTableV2Async = createAsyncThunk(
    'craneSolutionTableV2/craneSolutionTableV2Async',
    async () => {
        try {
            const result = await httpClient.get<CarneSolutionV2[]>(server.CRANESOLUTIONTABLEV2_URL)
            return result.data
        } catch (error) {
            throw error
        }
    }
)

const craneSolutionTableV2Slice = createSlice({
    name: 'craneSolutionTableV2',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(craneSolutionTableV2Async.fulfilled, (state: CarneSolutionV2State, action: PayloadAction<CarneSolutionV2[]>) => {
            state.result = action.payload
            state.loading = false
            state.error = false
        });

        builder.addCase(craneSolutionTableV2Async.rejected, (state: CarneSolutionV2State) => {
            state.result = []
            state.loading = false
            state.error = true
        });

        builder.addCase(craneSolutionTableV2Async.pending, (state: CarneSolutionV2State) => {
            state.result = []
            state.loading = true
            state.error = false
        });
    },
})

export const { } = craneSolutionTableV2Slice.actions
export const craneSolutionTableV2Selector = (store: RootState) => store.craneSolutionTableV2Reducer
export default craneSolutionTableV2Slice.reducer