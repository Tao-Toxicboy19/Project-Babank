import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { apiUrlV2 } from "../../../Constants";
import { httpClient } from "../../../utils/httpclient";
import { RootState } from "../../store";

export type TotalTable = {
    FTS_id:                     number;
    total_cost_sum:             number;
    total_consumption_cost_sum: number;
    penality_cost_sum:          number;
    total_all_costs_sum:        number;
    FTS_name:                   string;
    total_reward_sum:           number;
}


interface TotalTableState {
    loading: boolean
    error: boolean
    result: TotalTable[]
}

const initialState: TotalTableState = {
    loading: false,
    error: false,
    result: []
}

export const totalTableAsync = createAsyncThunk(
    'craneSolutionTableV2/craneSolutionTableV2Async',
    async (id:number) => {
        try {
            const result = await httpClient.get<TotalTable[]>(`${apiUrlV2}/total/table/fts/${id}`)
            return result.data
        } catch (error) {
            throw error
        }
    }
)

const totalTableAsyncSlice = createSlice({
    name: 'craneSolutionTableV2',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(totalTableAsync.fulfilled, (state: TotalTableState, action: PayloadAction<TotalTable[]>) => {
            state.result = action.payload
            state.loading = false
            state.error = false
        });

        builder.addCase(totalTableAsync.rejected, (state: TotalTableState) => {
            state.result = []
            state.loading = false
            state.error = true
        });

        builder.addCase(totalTableAsync.pending, (state: TotalTableState) => {
            state.result = []
            state.loading = true
            state.error = false
        });
    },
})

export const { } = totalTableAsyncSlice.actions
export const totalTableAsyncSelector = (store: RootState) => store.totalTableAsyncReducer
export default totalTableAsyncSlice.reducer