import { PayloadAction, ThunkAction, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";
import { server } from "../../Constants";

export interface FtsSolution {
    solution_id: number;
    FTS_id: number;
    FTS_name: number;
    total_preparation_FTS_time: number;
    total_travel_consumption_cost: number;
    total_travel_distance: number;
}

export interface FtsSolutionState {
    result: FtsSolution
    loading: boolean
    error: string | null
}

const initialState: FtsSolutionState = {
    result: {
        solution_id: 0,
        FTS_id: 0,
        FTS_name: 0,
        total_preparation_FTS_time: 0,
        total_travel_consumption_cost: 0,
        total_travel_distance: 0,
    },
    loading: false,
    error: null,
}

const FtsSolutionV2Slice = createSlice({
    name: 'FtsSolutionV2',
    initialState,
    reducers: {
        setCraneSolutionState: (state) => {
            state.result = {
                solution_id: 0,
                FTS_id: 0,
                FTS_name: 0,
                total_preparation_FTS_time: 0,
                total_travel_consumption_cost: 0,
                total_travel_distance: 0,
            };
            state.loading = true;
            state.error = null;
        },
        setCraneSolutionSuccess: (state, action: PayloadAction<FtsSolution>) => {
            state.result = action.payload;
            state.loading = false;
            state.error = null;
        },
        setCraneSolutionFailure: (state, action: PayloadAction<string>) => {
            state.result = {
                solution_id: 0,
                FTS_id: 0,
                FTS_name: 0,
                total_preparation_FTS_time: 0,
                total_travel_consumption_cost: 0,
                total_travel_distance: 0,
            };
            state.error = action.payload;
            state.loading = false;
        },
    }
})

export const { setCraneSolutionState, setCraneSolutionSuccess, setCraneSolutionFailure } = FtsSolutionV2Slice.actions
export default FtsSolutionV2Slice.reducer

export const loadFtsSolutionV2 = (): ThunkAction<void, RootState, unknown, any> => async (dispatch) => {
    try {
        dispatch(setCraneSolutionState())
        const result = await axios.get(server.FTSSOLUTION)
        dispatch(setCraneSolutionSuccess(result.data))
        console.log(result.data)
    }
    catch (error) {
        dispatch(setCraneSolutionFailure("Failed to fetch floating data"))
    }
}