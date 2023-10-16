import { PayloadAction, ThunkAction, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";
import { server } from "../../Constants";
import { report_solutionState, report_solutions } from "../../types/Solution_schedule.type";

const initialState: report_solutionState = {
    result: [],
    loading: false,
    error: null
}

const reportSlice = createSlice({
    name: 'report',
    initialState,
    reducers: {
        setreportStart: (state) => {
            state.result = []
            state.loading = true
            state.error = null
        },
        setreportSuccess: (state, action: PayloadAction<report_solutions[]>) => {
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
export const { setreportStart, setreportSuccess, setreportFailure } = reportSlice.actions
export default reportSlice.reducer

export const loadReport = (): ThunkAction<void, RootState, unknown, any> => async (dispatch) => {
    try {
        dispatch(setreportStart())
        const result = await axios.get<report_solutions[]>(server.REPORT_SOLUTION_URL)
        dispatch(setreportSuccess(result.data))
    }
    catch (error) {
        dispatch(setreportFailure("Failed to fetch floating data"))
    }
}