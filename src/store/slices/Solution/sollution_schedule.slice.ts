import { PayloadAction, ThunkAction, createSlice } from "@reduxjs/toolkit";
import { httpClient } from "../../../utils/httpclient";
import { server } from "../../../Constants";
import { RootState } from "../../store";
import { Solution_schedule, Solution_scheduleState } from "../../../types/Solution_schedule.type";

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
    }
    catch (error) {
        dispatch(faildSolutionSchedule("Failed to fetch floating data"))
    }
}