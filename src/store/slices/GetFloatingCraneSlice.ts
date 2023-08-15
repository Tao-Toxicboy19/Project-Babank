import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { AppThunk, RootState } from "../store";
import { Floating, FloatingState } from "../../types/FloatingCrane.type";

const initialState: FloatingState = {
    data: [],
    loading: false,
    error: null,
}

const getfloatingSlice = createSlice({
    name: "floating",
    initialState,
    reducers: {
        fetchGetFloatingStart: (state) => {
            state.loading = true
            state.error = null
        },
        fetchGetFloatingSuccess: (state, action: PayloadAction<Floating[]>) => {
            state.loading = false;
            state.data = action.payload;
        },
        fetchGetFloatingFailure: (state, action: PayloadAction<string>) => {
            state.loading = false
            state.error = action.payload
        }
    }
})

export const { fetchGetFloatingStart, fetchGetFloatingSuccess, fetchGetFloatingFailure } = getfloatingSlice.actions
export const GetfetchFloating = (): AppThunk => async (dispatch) => {
    try {
        dispatch(fetchGetFloatingStart());
        const response = await axios.get(
            "http://localhost:8080/api/getLocations"
        );
        dispatch(fetchGetFloatingSuccess(response.data.floatingcrane));
    } catch {
        dispatch(fetchGetFloatingFailure("Error fetching posts"));
    }
}

export const selectFloating = (state: RootState) => state.floating.data;
export default getfloatingSlice.reducer