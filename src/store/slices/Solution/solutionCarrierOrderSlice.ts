import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { httpClient } from "../../../utils/httpclient";
import { server } from "../../../Constants";
import { RootState } from "../../store";

interface SolutionCarrierOrder {
    s_id: number;
    order_id: number;
    penalty_cost: number;
    reward: number;
}

interface SolutionCarrierOrderState {
    result: SolutionCarrierOrder[]
    loading: boolean
    error: boolean
}

const initialState: SolutionCarrierOrderState = {
    result: [],
    loading: false,
    error: false
}

export const solutionCarrierOrderAsync = createAsyncThunk(
    'solutionCarrierOrder/solutionCarrierOrderAsync',
    async () => {
        try {
            const result = await httpClient.get<SolutionCarrierOrder[]>(server.SOLUTION_CARRIER_ORDER_SUM)
            return result.data
        } catch (error) {
            throw error
        }
    }
)

const solutionCarrierOrderSlice = createSlice({
    name: "solutionCarrierOrder",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(solutionCarrierOrderAsync.fulfilled, (state: SolutionCarrierOrderState, action: PayloadAction<SolutionCarrierOrder[]>) => {
            state.result = action.payload
            state.loading = false
            state.error = false
        });

        builder.addCase(solutionCarrierOrderAsync.rejected, (state: SolutionCarrierOrderState) => {
            state.result = []
            state.loading = false
            state.error = true
        });

        builder.addCase(solutionCarrierOrderAsync.pending, (state: SolutionCarrierOrderState) => {
            state.result = []
            state.loading = true
            state.error = false
        });
    },
})

export const { } = solutionCarrierOrderSlice.actions
export const solutionCarrierOrderSelector = (store: RootState) => store.solutionCarrierOrderReducer
export default solutionCarrierOrderSlice.reducer