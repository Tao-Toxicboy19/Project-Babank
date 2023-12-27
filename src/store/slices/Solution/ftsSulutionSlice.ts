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

const initialState: FTS_SolutionState = {
    result: [],
    loading: false,
    error: false,
}

export const ftsSulutionAsync = createAsyncThunk(
    'ftsSulution/ftsSulutionAsync',
    async () => {
        try {
            const result = await httpClient.get(server.SOLUTIONSCHEDULE)
            return result.data
        } catch (error) {
            throw error
        }
    }
)

const ftsSulutionSlice = createSlice({
    name: 'ftsSulution',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(ftsSulutionAsync.fulfilled, (state: FTS_SolutionState, action: PayloadAction<FTS_Solution[]>) => {
            state.result = action.payload
            state.loading = false
            state.error = false
        });

        builder.addCase(ftsSulutionAsync.rejected, (state: FTS_SolutionState) => {
            state.result = [];
            state.loading = false
            state.error = true
        });

        builder.addCase(ftsSulutionAsync.pending, (state: FTS_SolutionState) => {
            state.result = []
            state.loading = true
            state.error = false
        });
    },
})

export const { } = ftsSulutionSlice.actions
export const ftsSulutionSelector = (store: RootState) => store.ftsSulutionReducer
export default ftsSulutionSlice.reducer