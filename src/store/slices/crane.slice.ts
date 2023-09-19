import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Crane, CraneState, } from "../../types/crane.type";

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
