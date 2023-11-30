import { PayloadAction, ThunkAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { server } from "../../../Constants";
import { FTS_Solution, FTS_SolutionState } from "../../../type/FTS_solution.type";
import { httpClient } from "../../../utils/httpclient";

const initialState: FTS_SolutionState = {
    result: {
        solution_id: 0,
        FTS_id: 0,
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
        setCraneSolutionState: (state: FTS_SolutionState) => {
            state.result = {
                solution_id: 0,
                FTS_id: 0,
                total_preparation_FTS_time: 0,
                total_travel_consumption_cost: 0,
                total_travel_distance: 0,
            };
            state.loading = true;
            state.error = null;
        },
        setCraneSolutionSuccess: (state: FTS_SolutionState, action: PayloadAction<FTS_Solution>) => {
            state.result = action.payload;
            state.loading = false;
            state.error = null;
        },
        setCraneSolutionFailure: (state: FTS_SolutionState, action: PayloadAction<string>) => {
            state.result = {
                solution_id: 0,
                FTS_id: 0,
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
        const result = await httpClient.get<FTS_Solution>(server.FTSSOLUTION)
        dispatch(setCraneSolutionSuccess(result.data))
    }
    catch (error) {
        dispatch(setCraneSolutionFailure("Failed to fetch floating data"))
    }
}