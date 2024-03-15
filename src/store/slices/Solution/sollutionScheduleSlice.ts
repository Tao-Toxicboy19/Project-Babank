import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { httpClient } from "../../../utils/httpclient";
import { server } from "../../../Constants";
import { RootState } from "../../store";

export interface Solution_schedule {
    solution_id: number;
    FTS_id: number;
    carrier_id: number;
    lat: number;
    lng: number;
    arrivaltime: Date | any;
    exittime: Date | any;
    operation_time: number | null;
    Setup_time: number | null;
    travel_Distance: number | null;
    travel_time: number | null;
    operation_rate: number | null;
    consumption_rate: number | null;
    id: number;
    FTS_name: string;
    setuptime_FTS: number;
    speed: number;
    cr_id: number | null;
    carrier_name: null | string;
    holder: null | string;
    maxcapacity: number | null;
    burden: number | null;
}

interface Solution_scheduleState {
    result: Solution_schedule[];
    loading: boolean;
    error: boolean
}

const initialState: Solution_scheduleState = {
    result: [],
    loading: false,
    error: false
}

export const sulutionScheduelAsync = createAsyncThunk(
    'sulutionScheduel/sulutionScheduelAsync',
    async (id: number) => {
        try {
            const result = await httpClient.get(`${server.SOLUTIONSCHEDULE}/${id}`)
            return result.data
        } catch (error) {
            throw error
        }
    }
)

const sulutionScheduelSlice = createSlice({
    name: "sulutionScheduel",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(sulutionScheduelAsync.fulfilled, (state: Solution_scheduleState, action: PayloadAction<Solution_schedule[]>) => {
            state.result = action.payload
            state.loading = false
            state.error = false
        });

        builder.addCase(sulutionScheduelAsync.rejected, (state: Solution_scheduleState) => {
            state.result = []
            state.loading = false
            state.error = true
        });

        builder.addCase(sulutionScheduelAsync.pending, (state: Solution_scheduleState) => {
            state.result = []
            state.loading = true
            state.error = false
        });
    },
})

export const { } = sulutionScheduelSlice.actions
export const sulutionScheduelSelector = (store: RootState) => store.sulutionScheduelReducer
export default sulutionScheduelSlice.reducer