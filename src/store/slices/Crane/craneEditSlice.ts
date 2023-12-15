import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { SUCCESS, server } from "../../../Constants";
import { httpClient } from "../../../utils/httpclient";
import { FieldValues } from "react-hook-form";
import { RootState } from "../../store";
import { NavigateFunction } from "react-router-dom";
import { toast } from "react-toastify";

interface Crane {
    id: number
    crane_name: string;
    FTS_id: number;
    setuptime_crane: number;
}

interface CraneEditState {
    result: Crane | null
    loading: boolean
    error: boolean
}

const initialState: CraneEditState = {
    result: null,
    loading: false,
    error: false
}

export const craneEditAsync = createAsyncThunk(
    'craneEdit/craneEditAsync',
    async ({ id, data, submitting, navigate, fetch }: { id: string | undefined, data: FieldValues, submitting: () => void, navigate: NavigateFunction, fetch: () => void }) => {
        try {
            const result = await httpClient.put(`${server.CRANE}/${id}`, data)
            submitting()
            fetch()
            toast.success(SUCCESS);
            navigate('/transferstation')
            return result.data;
        } catch (error) {
            throw error;
        }
    }
)

const craneEditSlice = createSlice({
    name: 'craneEdit',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(craneEditAsync.fulfilled, (state: CraneEditState, action: PayloadAction<Crane>) => {
            state.result = action.payload
            state.loading = false
            state.error = false
        });

        builder.addCase(craneEditAsync.rejected, (state: CraneEditState) => {
            state.result = null
            state.loading = false
            state.error = true
        });

        builder.addCase(craneEditAsync.pending, (state: CraneEditState) => {
            state.result = null
            state.loading = true
            state.error = false
        });
    },
})

export const { } = craneEditSlice.actions
export const craneEditSliceSelector = (store: RootState) => store.craneEditReducer
export default craneEditSlice.reducer