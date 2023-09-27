import { PayloadAction, ThunkAction, createSlice } from "@reduxjs/toolkit";
import { httpClient } from "../../utlis/httpclient";
import { server } from "../../Constants";
import { RootState } from "../store";

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

export interface Solution_scheduleState {
    solution_schedule: Solution_schedule[];
    loading: boolean;
    error: string | null;
}

const initialState: Solution_scheduleState = {
    solution_schedule: [],
    loading: false,
    error: null
}

const solution_scheduleSlice = createSlice({
    name: "solution_schedule",
    initialState,
    reducers: {
        loadingSolutionSchedule: (state) => {
            state.loading = true;
            state.error = null;
            state.solution_schedule = []
        },
        successSolutionSchedule: (state, actions: PayloadAction<Solution_schedule[]>) => {
            state.loading = false;
            state.error = null;
            state.solution_schedule = actions.payload
        },
        faildSolutionSchedule: (state, actions: PayloadAction<string>) => {
            state.loading = false;
            state.error = actions.payload;
            state.solution_schedule = []
        }
    }
})

export const { loadingSolutionSchedule, successSolutionSchedule, faildSolutionSchedule } = solution_scheduleSlice.actions

export default solution_scheduleSlice.reducer

export const loadSolution = (): ThunkAction<void, RootState, unknown, any> => async (dispatch) => {
    try {
        dispatch(loadingSolutionSchedule())
        const result = await httpClient.get(server.SOLUTIONSCHEDULE)
        dispatch(successSolutionSchedule(result.data))
        console.log(result.data)
    }
    catch (error) {
        dispatch(faildSolutionSchedule("Failed to fetch floating data"))
    }
}