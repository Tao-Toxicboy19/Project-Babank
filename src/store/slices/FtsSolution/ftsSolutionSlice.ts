import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { server } from "../../../Constants";
import { httpClient } from "../../../utils/httpclient";

interface FTS_Solution {
    solution_id: number;
    FTS_id: number;
    total_preparation_FTS_time: number;
    total_travel_consumption_cost: number;
    total_travel_distance: number;
}

interface FTS_SolutionState {
    result: FTS_Solution
    loading: boolean
    error: boolean
}

const initialState: FTS_SolutionState = {
    result: {
        solution_id: 0,
        FTS_id: 0,
        total_preparation_FTS_time: 0,
        total_travel_consumption_cost: 0,
        total_travel_distance: 0,
    },
    loading: false,
    error: false,
}

export const ftsSolutionAsync = createAsyncThunk(
    'ftsSolution/ftsSolutionAsync',
    async () => {
        try {
            const result = await httpClient.get<FTS_Solution>(server.FTSSOLUTION)
            return result.data;
        } catch (error) {
            throw error;
        }
    }
)

const FtsSolutionSlice = createSlice({
    name: 'FtsSolution',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(ftsSolutionAsync.fulfilled, (state: FTS_SolutionState, action: PayloadAction<FTS_Solution>) => {
            state.result = action.payload
            state.loading = false
            state.error = false
        });

        builder.addCase(ftsSolutionAsync.rejected, (state: FTS_SolutionState) => {
            state.result = {
                solution_id: 0,
                FTS_id: 0,
                total_preparation_FTS_time: 0,
                total_travel_consumption_cost: 0,
                total_travel_distance: 0,
            }
            state.loading = false
            state.error = true
        });

        builder.addCase(ftsSolutionAsync.pending, (state: FTS_SolutionState) => {
            state.result = {
                solution_id: 0,
                FTS_id: 0,
                total_preparation_FTS_time: 0,
                total_travel_consumption_cost: 0,
                total_travel_distance: 0,
            }
            state.loading = true
            state.error = false
        });
    },
})

export const { } = FtsSolutionSlice.actions
export const FtsSolutionSelector = (store: RootState) => store.FtsSolutionReducer
export default FtsSolutionSlice.reducer