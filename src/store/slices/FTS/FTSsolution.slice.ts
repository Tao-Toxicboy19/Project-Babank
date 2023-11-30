import { PayloadAction, ThunkAction, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../../store";
import { server } from "../../../Constants";
import { SolutionCrane } from "../../../type/Solution_schedule.type";

export interface FTSSolutionState {
    result: SolutionCrane[]
    loading: boolean
    error: string | null
}

const initialState: FTSSolutionState = {
    result: [],
    loading: false,
    error: null
}

const FTSsolutionSlice = createSlice({
    name: 'FTSsolution',
    initialState,
    reducers: {
        setFTSsolutionStart: (state) => {
            state.result = []
            state.loading = true
            state.error = null
        },
        setFTSsolutionSuccess: (state, action: PayloadAction<SolutionCrane[]>) => {
            state.result = action.payload
            state.loading = false
            state.error = null
        },
        setFTSsolutionFailure: (state, action: PayloadAction<string>) => {
            state.result = []
            state.error = action.payload
            state.loading = false
        }
    }
})
export const { setFTSsolutionStart, setFTSsolutionSuccess, setFTSsolutionFailure } = FTSsolutionSlice.actions
export default FTSsolutionSlice.reducer

export const loadFTSsolution = (): ThunkAction<void, RootState, unknown, any> => async (dispatch) => {
    try {
        dispatch(setFTSsolutionStart())
        const result = await axios.get<SolutionCrane[]>(server.CRANESOLUTIONTABLE)
        dispatch(setFTSsolutionSuccess(result.data))
    }
    catch (error) {
        dispatch(setFTSsolutionFailure("Failed to fetch floating data"))
    }
}