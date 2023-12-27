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
    result: FTS_Solution[]
    loading: boolean
    error: boolean
}

export const ftsSulutionV2Async = createAsyncThunk(
    'ftsSulutionV2/ftsSulutionV2Async',
    async () => {
        try {
            const result = await httpClient.get<FTS_Solution[]>(server.FTSSOLUTION)
            return result.data
        } catch (error) {
            throw error
        }
    }
)

const initialState: FTS_SolutionState = {
    result: [],
    loading: false,
    error: false,
}

const ftsSolutionV2Slice = createSlice({
    name: 'ftsSolutionV2',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(ftsSulutionV2Async.fulfilled, (state: FTS_SolutionState, action: PayloadAction<FTS_Solution[]>) => {
            state.result = action.payload
            state.loading = false
            state.error = false
        });

        builder.addCase(ftsSulutionV2Async.rejected, (state: FTS_SolutionState) => {
            state.result = []
            state.loading = false
            state.error = true
        });

        builder.addCase(ftsSulutionV2Async.pending, (state: FTS_SolutionState) => {
            state.result = []
            state.loading = true
            state.error = false
        });
    },
})

export const { } = ftsSolutionV2Slice.actions
export const ftsSolutionV2Selector = (store: RootState) => store.ftsSolutionV2Reducer
export default ftsSolutionV2Slice.reducer