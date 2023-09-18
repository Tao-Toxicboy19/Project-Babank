import { PayloadAction, ThunkAction, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";
import { server } from "../../Constants";

export interface FTSCraneCargo {
    FTS_name: string;
    result: {
        crane_name: string;
        category: string;
        category_v1: {
            category: string;
            cargo: {
                cargo_name: string;
                work_rate: number;
                consumption_rate: number;
            }[];
        }[];
    }[];
}

export interface FTScraneCargoState {
    result: FTSCraneCargo[]
    loading: boolean
    error: string | null
}

const initialState: FTScraneCargoState = {
    result: [],
    loading: false,
    error: null,
}

const FTScraneCargoSlice = createSlice({
    name: 'FTScraneCargo',
    initialState,
    reducers: {
        setFTScraneCargoStart: (state) => {
            state.result = []
            state.loading = true
            state.error = null
        },
        setFTSCraneCargoSuccess: (state, action: PayloadAction<FTSCraneCargo[]>) => {
            state.result = action.payload
            state.loading = false
            state.error = null
        },
        setFTSCraneCargoFailure: (state, action: PayloadAction<string>) => {
            state.result = []
            state.error = action.payload
            state.loading = false
        }
    }
})
export const { setFTScraneCargoStart, setFTSCraneCargoSuccess, setFTSCraneCargoFailure } = FTScraneCargoSlice.actions
export default FTScraneCargoSlice.reducer

export const loadFTScraneCargo = (): ThunkAction<void, RootState, unknown, any> => async (dispatch) => {
    try {
        dispatch(setFTScraneCargoStart())
        const result = await axios.get(server.CARGOCRANE)
        dispatch(setFTSCraneCargoSuccess(result.data))
    }
    catch (error) {
        dispatch(setFTSCraneCargoFailure("Failed to fetch floating data"))
    }
}