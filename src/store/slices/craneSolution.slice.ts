import { PayloadAction, ThunkAction, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";
import { server } from "../../Constants";

export interface CraneSolution {
    solution_id: number;
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
}

export interface CraneSolutionState {
    result: CraneSolution
    loading: boolean
    error: string | null
}

const initialState: CraneSolutionState = {
    result: {
        solution_id: 0,
        total_cost: 0,
        total_consumption_cost: 0,
        total_wage_cost: 0,
        penality_cost: 0,
        total_reward: 0,
        total_late_time: 0,
        total_early_time: 0,
        total_operation_consumption_cost: 0,
        total_operation_time: 0,
        total_preparation_crane_time: 0
    },
    loading: false,
    error: null
}

const CraneSolutionSlice = createSlice({
    name: 'CraneSolution',
    initialState,
    reducers: {
        setCraneSolutionState: (state) => {
            state.result = {
                solution_id: 0,
                total_cost: 0,
                total_consumption_cost: 0,
                total_wage_cost: 0,
                penality_cost: 0,
                total_reward: 0,
                total_late_time: 0,
                total_early_time: 0,
                total_operation_consumption_cost: 0,
                total_operation_time: 0,
                total_preparation_crane_time: 0
            };
            state.loading = true;
            state.error = null;
        },
        setCraneSolutionSuccess: (state, action: PayloadAction<CraneSolution>) => {
            state.result = action.payload;
            state.loading = false;
            state.error = null;
        },
        setCraneSolutionFailure: (state, action: PayloadAction<string>) => {
            state.result = {
                solution_id: 0,
                total_cost: 0,
                total_consumption_cost: 0,
                total_wage_cost: 0,
                penality_cost: 0,
                total_reward: 0,
                total_late_time: 0,
                total_early_time: 0,
                total_operation_consumption_cost: 0,
                total_operation_time: 0,
                total_preparation_crane_time: 0
            };
            state.error = action.payload;
            state.loading = false;
        },
    }
})

export const { setCraneSolutionState, setCraneSolutionSuccess, setCraneSolutionFailure } = CraneSolutionSlice.actions
export default CraneSolutionSlice.reducer


export const loadCraneSolution = (): ThunkAction<void, RootState, unknown, any> => async (dispatch) => {
    try {
        dispatch(setCraneSolutionState())
        const result = await axios.get(server.CRANESOLUTION)
        dispatch(setCraneSolutionSuccess(result.data))
        console.log(result.data)
    }
    catch (error) {
        dispatch(setCraneSolutionFailure("Failed to fetch floating data"))
    }
}