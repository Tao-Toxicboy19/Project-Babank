import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { server } from "../../../Constants";
import { httpClient } from "../../../utils/httpclient";

export interface CraneSolution {
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
}

interface CraneSolutionState {
    result: CraneSolution[]
    loading: boolean
    error: boolean
}

const initialState: CraneSolutionState = {
    result: [],
    loading: false,
    error: false
}

export const craneSolutionAsync = createAsyncThunk(
    'craneSolution/craneSolutionAsync',
    async (id: number) => {
        try {
            const result = await httpClient.get<CraneSolution[]>(`${server.CRANESOLUTION}/${id}`)
            return result.data
        } catch (error) {
            throw error
        }
    }
)

const craneSolutionSlice = createSlice({
    name: 'craneSolution',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(craneSolutionAsync.fulfilled, (state: CraneSolutionState, action: PayloadAction<CraneSolution[]>) => {
            state.result = action.payload
            state.loading = false
            state.error = false
        });

        builder.addCase(craneSolutionAsync.rejected, (state: CraneSolutionState) => {
            state.result = [],
                state.loading = false
            state.error = true
        });

        builder.addCase(craneSolutionAsync.pending, (state: CraneSolutionState) => {
            state.result = [],
                state.loading = true
            state.error = false
        });
    },
})

export const { } = craneSolutionSlice.actions
export const craneSolutionSelector = (store: RootState) => store.craneSolutionReducer
export default craneSolutionSlice.reducer