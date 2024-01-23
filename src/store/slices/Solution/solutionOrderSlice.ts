import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { server } from "../../../Constants";
import { httpClient } from "../../../utils/httpclient";

export interface SolutionOrder {
    s_id: number;
    order_id: number;
    start_time: any;
    finish_time: any;
    penalty_cost: number;
    reward: number;
    total_cost: number;
    total_consumption_cost: number;
    total_wage_cost: number;
    or_id: number;
    cr_id: number;
    category: string;
    arrival_time: any;
    deadline_time: any;
    latitude: number;
    longitude: number;
    maxFTS: number;
    penalty_rate: number;
    reward_rate: number;
    status_order: string;
    rel_start_time: null;
    rel_finish_time: null;
    reason: null;
    group: number;
    carrier_name: string;
    holder: null | string;
    maxcapacity: number | null;
    burden: number | null;
    Width: number | null;
    carrier_max_FTS: number;
    carrier_max_crane: number | null;
    length: number | null;
    has_crane: HasCrane | null;
}

export enum HasCrane {
    Has = "has",
    No = "no",
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