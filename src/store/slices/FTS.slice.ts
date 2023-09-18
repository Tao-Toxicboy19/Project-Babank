import { PayloadAction, ThunkAction, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";
import { server } from "../../Constants";
import { httpClient } from "../../utlis/httpclient";


export interface FTSCrane {
    FTS_name: string;
    setuptime_FTS: number;
    speed: number;
    lat: number;
    lng: number;
    result: {
        crane_name: string
        setuptime_crane: number
    }[];
}

export interface FTSCraneState {
    FTS: FTSCrane[]
    loading: boolean
    error: string | null
}

const initialState: FTSCraneState = {
    FTS: [],
    loading: false,
    error: null
}

const FTSSlice = createSlice({
    name: 'FTS',
    initialState,
    reducers: {
        setFTSState: (state) => {
            state.FTS = []
            state.loading = true
            state.error = null
        },
        setFTSSuccess: (state, action: PayloadAction<FTSCrane[]>) => {
            state.FTS = action.payload
            state.loading = false
            state.error = null
        },
        setFTSFailure: (state, action: PayloadAction<string>) => {
            state.FTS = []
            state.error = action.payload
            state.loading = false
        },
        setInsertFTS: (state, action: PayloadAction<FTSCrane>) => {
            state.FTS.push(action.payload)
        },
    }
})
export const { setFTSState, setFTSSuccess, setFTSFailure, setInsertFTS } = FTSSlice.actions
export default FTSSlice.reducer

export const loadFTS = (): ThunkAction<void, RootState, unknown, any> => async (dispatch) => {
    try {
        dispatch(setFTSState())
        const result = await httpClient.get(server.FLOATING)
        dispatch(setFTSSuccess(result.data))
    }
    catch (error) {
        dispatch(setFTSFailure("Failed to fetch floating data"))
    }
}

export const addFTS = (formData: FormData, navigate: any) => {
    return async () => {
        try {
            await httpClient.post(server.FLOATING, formData);
            navigate('/transferstation')
        } catch (error) {
            console.error('Error while adding CARRIER:', error);
        }
    };
};