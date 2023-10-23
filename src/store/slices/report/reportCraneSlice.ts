import { PayloadAction, ThunkAction, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../../store";
import { server } from "../../../Constants";
import { report_solution_crane, report_solution_craneState } from "../../../types/Solution_schedule.type";

const initialState: report_solution_craneState = {
    result: [],
    loading: false,
    error: null
}

const reportCraneSlice = createSlice({
    name: 'reportCrane',
    initialState,
    reducers: {
        setreportStart: (state) => {
            state.result = []
            state.loading = true
            state.error = null
        },
        setreportSuccess: (state, action: PayloadAction<report_solution_crane[]>) => {
            state.result = action.payload
            state.loading = false
            state.error = null
        },
        setreportFailure: (state, action: PayloadAction<string>) => {
            state.result = []
            state.error = action.payload
            state.loading = false
        }
    }
})
export const { setreportStart, setreportSuccess, setreportFailure } = reportCraneSlice.actions
export default reportCraneSlice.reducer

export const loadReportCrane = (): ThunkAction<void, RootState, unknown, any> => async (dispatch) => {
    try {
        dispatch(setreportStart())
        const result = await axios.get<report_solution_crane[]>(server.REPORT_SOLUTION_CRANE_URL)
        dispatch(setreportSuccess(result.data))
    }
    catch (error) {
        dispatch(setreportFailure("Failed to fetch floating data"))
    }
}