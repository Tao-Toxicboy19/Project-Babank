import { PayloadAction, ThunkAction, createSlice } from "@reduxjs/toolkit";
import { httpClient } from "../../../utils/httpclient";
import { server } from "../../../Constants";
import { RootState } from "../../store";
import { Solution_carrier_order, Solution_carrier_orderState } from "../../../type/Solution_schedule.type";

const initialState: Solution_carrier_orderState = {
    result: {
        s_id: 0,
        order_id: 0,
        penalty_cost: 0,
        reward: 0
    },
    loading: false,
    error: null
}

const solution_carrier_order = createSlice({
    name: "solution_carrier_order",
    initialState,
    reducers: {
        loadingSolution_carrier_order: (state) => {
            state.loading = true;
            state.error = null;
            state.result = {
                s_id: 0,
                order_id: 0,
                penalty_cost: 0,
                reward: 0
            }
        },
        successSolution_carrier_order: (state, actions: PayloadAction<Solution_carrier_order>) => {
            state.loading = false;
            state.error = null;
            state.result = actions.payload
        },
        faildSolution_carrier_order: (state, actions: PayloadAction<string>) => {
            state.loading = false;
            state.error = actions.payload;
            state.result = {
                s_id: 0,
                order_id: 0,
                penalty_cost: 0,
                reward: 0
            }
        }
    }
})

export const { loadingSolution_carrier_order, successSolution_carrier_order, faildSolution_carrier_order } = solution_carrier_order.actions

export default solution_carrier_order.reducer

export const loadSolution_carrier_order = (): ThunkAction<void, RootState, unknown, any> => async (dispatch) => {
    try {
        dispatch(loadingSolution_carrier_order())
        const result = await httpClient.get<Solution_carrier_order>(server.SOLUTION_CARRIER_ORDER_SUM)
        dispatch(successSolution_carrier_order(result.data))
    }
    catch (error) {
        dispatch(faildSolution_carrier_order("Failed to fetch floating data"))
    }
}