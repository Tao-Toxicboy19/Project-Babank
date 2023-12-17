import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { server } from "../../../Constants";
import { httpClient } from "../../../utils/httpclient";

interface Crane {
    id: number;
    crane_name: string;
    setuptime_crane: number;
}

interface Fts {
    id: number;
    FTS_name: string;
    lat: number;
    lng: number;
    setuptime_FTS: number;
    speed: number;
}

interface Solution {
    fts_id: number;
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
    date: any;
}

interface SolutionCrane {
    fts: Fts;
    crane: Crane[];
    solutions: Solution[];
}

interface FTSSolutionState {
    result: SolutionCrane[]
    loading: boolean
    error: boolean
}

const initialState: FTSSolutionState = {
    result: [],
    loading: false,
    error: false
}

export const ftsSolutionTableAsync = createAsyncThunk(
    'ftsSolutionTable/ftsSolutionTableAsync',
    async () => {
        try {
            const result = await httpClient.get<SolutionCrane[]>(server.CRANESOLUTIONTABLE)
            return result.data
        } catch (error) {
            throw error
        }
    }
)

const ftsSolutionTableSlice = createSlice({
    name: 'ftsSolutionTable',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(ftsSolutionTableAsync.fulfilled, (state: FTSSolutionState, action: PayloadAction<SolutionCrane[]>) => {
            state.result = action.payload
            state.loading = false
            state.error = false
        });

        builder.addCase(ftsSolutionTableAsync.rejected, (state: FTSSolutionState) => {
            state.result = []
            state.loading = false
            state.error = true
        });

        builder.addCase(ftsSolutionTableAsync.pending, (state: FTSSolutionState) => {
            state.result = []
            state.loading = true
            state.error = false
        });
    },
})

export const { } = ftsSolutionTableSlice.actions
export const ftsSolutionTableSelector = (store: RootState) => store.ftsSolutionTableReducer
export default ftsSolutionTableSlice.reducer