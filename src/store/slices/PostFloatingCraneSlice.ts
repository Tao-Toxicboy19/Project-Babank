import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { Floating, FloatingState } from "../../types/FloatingCrane.type";
import { AppThunk, RootState } from "../store";

const initialState: FloatingState = {
    data: [],
    loading: false,
    error: null,
}

const postfloatingSlice = createSlice({
    name: "floating",
    initialState,
    reducers: {
        fetchPostFloatingStart: (state) => {
            state.loading = true
            state.error = null
        },
        fetchPostFloatingSuccess: (state, action: PayloadAction<Floating[]>) => {
            state.loading = false
            state.data = action.payload
        },
        fetchPostFloatingFailure: (state, action: PayloadAction<string>) => {
            state.loading = false
            state.error = action.payload
        }

    }
})

export const { fetchPostFloatingStart, fetchPostFloatingSuccess, fetchPostFloatingFailure } = postfloatingSlice.actions
export const Postfloating = (newFloating: Floating): AppThunk => async (dispatch) => {
    try {
        dispatch(fetchPostFloatingStart())
        const response = await axios.post(
            "http://localhost:8080/api/addLocation", newFloating
        )
        dispatch(fetchPostFloatingSuccess(response.data));
    } catch (error) {
        dispatch(fetchPostFloatingFailure("Error fetching Posts"))
    }
}

export const selectFloatingPost = (state: RootState) => state.floating.data
export default postfloatingSlice.reducer
