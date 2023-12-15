import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { SUCCESS, server } from "../../../Constants";
import { httpClient } from "../../../utils/httpclient";
import { RootState } from "../../store";
import { toast } from "react-toastify";

interface Crane {
    id: number
    crane_name: string;
    FTS_id: number;
    setuptime_crane: number;
}

interface CraneDeleteState {
    result: Crane | null
    loading: boolean
    error: boolean
}

const initialState: CraneDeleteState = {
    result: null,
    loading: false,
    error: false
}

export const craneDeleteAsync = createAsyncThunk(
    'craneDelete/craneDeleteAsync',
    async ({ id, handleClose, fetch }: { id: any, handleClose: () => void, fetch: () => void }) => {
        try {
            const result = await httpClient.delete(`${server.CRANE}/${id}`)
            toast.success(SUCCESS)
            fetch()
            handleClose()
            return result.data
        } catch (error) {
            throw error
        }
    }
)

const craneDeleteSlice = createSlice({
    name: 'craneDelete',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(craneDeleteAsync.fulfilled, (state: CraneDeleteState, action: PayloadAction<Crane>) => {
            state.result = action.payload
            state.loading = false
            state.error = false
        });

        builder.addCase(craneDeleteAsync.rejected, (state: CraneDeleteState) => {
            state.result = null
            state.loading = false
            state.error = true
        });

        builder.addCase(craneDeleteAsync.pending, (state: CraneDeleteState) => {
            state.result = null
            state.loading = true
            state.error = false
        });
    },
})

export const { } = craneDeleteSlice.actions
export const craneDeleteSelector = (store: RootState) => store.craneDeleteReducer
export default craneDeleteSlice.reducer