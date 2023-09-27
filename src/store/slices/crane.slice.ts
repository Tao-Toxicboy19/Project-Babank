import { PayloadAction, ThunkAction, createSlice } from "@reduxjs/toolkit";
import { Crane, CraneState, } from "../../types/crane.type";
import { server } from "../../Constants";
import { httpClient } from "../../utlis/httpclient";
import { RootState } from "../store";

const initialState: CraneState = {
    result: [],
    loading: false,
    error: null
}

const CraneSlice = createSlice({
    name: 'Crane',
    initialState,
    reducers: {
        setCraneState: (state) => {
            state.result = [],
                state.loading = true,
                state.error = null
        },
        setCraneSuccess: (state, action: PayloadAction<Crane[]>) => {
            state.result = action.payload,
                state.loading = false,
                state.error = null
        },
        setCraneFailure: (state, action: PayloadAction<string>) => {
            state.result = [],
                state.error = action.payload,
                state.loading = false
        },
        setDeleteCrane: (state, action: PayloadAction<any>) => {
            state.result = state.result.filter(
                (result) => result.crane_id !== action.payload
            )
        },
    }
});

export const { setCraneState, setCraneSuccess, setCraneFailure, setDeleteCrane } = CraneSlice.actions;
export default CraneSlice.reducer;

export const loadCrane = (): ThunkAction<void, RootState, unknown, any> => async (dispatch) => {
    try {
        dispatch(setCraneState())
        const result = await httpClient.get(server.CRANE)
        dispatch(setCraneSuccess(result.data))
    }
    catch (error) {
        dispatch(setCraneFailure("Failed to fetch floating data"))
    }
}