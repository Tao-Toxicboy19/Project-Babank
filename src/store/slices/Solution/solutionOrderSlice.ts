import { PayloadAction, ThunkAction, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../../store";
import { server } from "../../../Constants";

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

const solution_orderSlice = createSlice({
    name: 'solution_order',
    initialState,
    reducers: {
        setsolution_orderStart: (state) => {
            state.result = []
            state.loading = true
            state.error = false
        },
        setsolution_orderSuccess: (state, action: PayloadAction<SolutionOrder[]>) => {
            state.result = action.payload
            state.loading = false
            state.error = false
        },
        setsolution_orderFailure: (state) => {
            state.result = []
            state.error = true
            state.loading = false
        }
    }
})
export const { setsolution_orderStart, setsolution_orderSuccess, setsolution_orderFailure } = solution_orderSlice.actions
export default solution_orderSlice.reducer

export const loadSolution_order = (): ThunkAction<void, RootState, unknown, any> => async (dispatch) => {
    try {
        dispatch(setsolution_orderStart())
        const result = await axios.get<SolutionOrder[]>(server.SOLUTION_CARRIER_ORDER_URL)
        dispatch(setsolution_orderSuccess(result.data))
    }
    catch (error) {
        dispatch(setsolution_orderFailure())
    }
}