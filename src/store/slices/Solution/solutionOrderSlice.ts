import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { server } from "../../../Constants";
import { httpClient } from "../../../utils/httpclient";

interface SolutionOrder {
    s_id: number;
    order_id: number;
    start_time: any;
    finish_time: any;
    penalty_cost: number;
    reward: number;
    or_id: number;
    cr_id: number;
    category: string;
    arrival_time: string;
    deadline_time: string;
    latitude: number;
    longitude: number;
    maxFTS: number;
    penalty_rate: number;
    reward_rate: number;
    status_order: string;
    rel_start_time: null | string;
    rel_finish_time: null | string;
    reason: string;
    carrier_name: string;
    holder: string;
    maxcapacity: number;
    burden: number;
    Width: number;
    carrier_max_FTS: number;
    carrier_max_crane: number;
    length: number;
    has_crane: string;
}

interface SolutionOrderState {
    result: SolutionOrder[]
    loading: boolean
    error: boolean
}

const initialState: SolutionOrderState = {
    result: [],
    loading: false,
    error: false
}

export const solutionOrderAsync = createAsyncThunk(
    'solutionOrder/solutionOrderAsync',
    async () => {
        try {
            const result = await httpClient.get<SolutionOrder[]>(server.SOLUTION_CARRIER_ORDER_URL)
            return result.data
        } catch (error) {
            throw error
        }
    }
)

const solutionOrderSlice = createSlice({
    name: 'solutionOrder',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(solutionOrderAsync.fulfilled, (state: SolutionOrderState, action: PayloadAction<SolutionOrder[]>) => {
            state.result = action.payload
            state.loading = false
            state.error = false
        });

        builder.addCase(solutionOrderAsync.rejected, (state: SolutionOrderState) => {
            state.result = []
            state.loading = false
            state.error = true
        });

        builder.addCase(solutionOrderAsync.pending, (state: SolutionOrderState) => {
            state.result = []
            state.loading = true
            state.error = false
        });
    },
})

export const { } = solutionOrderSlice.actions
export const solutionOrderSSelector = (store: RootState) => store.solutionOrderSReducer
export default solutionOrderSlice.reducer