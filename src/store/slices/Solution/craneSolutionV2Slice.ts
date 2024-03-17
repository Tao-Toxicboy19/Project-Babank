import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { httpClient } from "../../../utils/httpclient";
import { server } from "../../../Constants";

export interface CraneSOlutionV2 {
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
    date: any;
}


interface CraneSOlutionV2State {
    result: CraneSOlutionV2[]
    loading: boolean
    error: boolean
}

const initialState: CraneSOlutionV2State = {
    result: [],
    loading: false,
    error: false
}

export const craneSolutionV2Async = createAsyncThunk(
    'craneSolutionV2/craneSolutionV2Async',
    async (id: number) => {
        try {
            const result = await httpClient.get<CraneSOlutionV2[]>(`${server.crane_solutionV2}/${id}`)
            return result.data
        } catch (error) {
            throw error
        }
    }
)

const craneSolutionV2Slice = createSlice({
    name: 'craneSolutionV2',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(craneSolutionV2Async.fulfilled, (state: CraneSOlutionV2State, action: PayloadAction<CraneSOlutionV2[]>) => {
            state.result = action.payload
            state.loading = false
            state.error = false
        });

        builder.addCase(craneSolutionV2Async.rejected, (state: CraneSOlutionV2State) => {
            state.result = [],
                state.loading = false
            state.error = true
        });

        builder.addCase(craneSolutionV2Async.pending, (state: CraneSOlutionV2State) => {
            state.result = [],
                state.loading = true
            state.error = false
        });
    },
})

export const { } = craneSolutionV2Slice.actions
export const craneSolutionV2Selector = (store: RootState) => store.craneSolutionV2Reducer
export default craneSolutionV2Slice.reducer