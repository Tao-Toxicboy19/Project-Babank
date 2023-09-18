import { PayloadAction, ThunkAction, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";
import { server } from "../../Constants";

export interface Solution {
    solution_id: number;
    FTS_name: string;
    total_cost_sum: number;
    total_consumption_cost_sum: number;
    total_wage_cost_sum: number;
    penality_cost_sum: number;
    total_reward_sum: number;
    result: Result[];
}

export interface Result {
    crane_name: string;
    total_cost: number;
    total_consumption_cost: number;
    total_wage_cost: number;
    penality_cost: number;
    total_reward: number;
}


export interface FTSSolutionState {
    result: Solution[]
    loading: boolean
    error: string | null
}

const initialState: FTSSolutionState = {
    result: [],
    loading: false,
    error: null
}

const FTSsolutionSlice = createSlice({
    name: 'FTSsolution',
    initialState,
    reducers: {
        setFTSsolutionStart: (state) => {
            state.result = []
            state.loading = true
            state.error = null
        },
        setFTSsolutionSuccess: (state, action: PayloadAction<Solution[]>) => {
            state.result = action.payload
            state.loading = false
            state.error = null
        },
        setFTSsolutionFailure: (state, action: PayloadAction<string>) => {
            state.result = []
            state.error = action.payload
            state.loading = false
        }
    }
})
export const { setFTSsolutionStart, setFTSsolutionSuccess, setFTSsolutionFailure } = FTSsolutionSlice.actions
export default FTSsolutionSlice.reducer

export const loadFTSsolution = (): ThunkAction<void, RootState, unknown, any> => async (dispatch) => {
    try {
        dispatch(setFTSsolutionStart())
        const result = await axios.get(server.CRANESOLUTIONTABLE)
        dispatch(setFTSsolutionSuccess(result.data))
        console.log(result.data)
    }
    catch (error) {
        dispatch(setFTSsolutionFailure("Failed to fetch floating data"))
    }
}