import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { httpClient } from "../../../utils/httpclient";
import { SUCCESS, server } from "../../../Constants";
import { toast } from "react-toastify";
import { RootState } from "../../store";

interface Result {
    crane_id: number;
    crane_name: string;
    FTS_id: number;
    setuptime_crane: number;
    wage_month_cost: number;
    premium_rate: number;
}

interface FtsCrane {
    fts_id: any;
    FTS_name: string;
    lat: number;
    lng: number;
    setuptime_FTS: number;
    speed: number;
    result: Result[];
}

interface ftsDeleteState {
    result: FtsCrane | null
    loading: boolean
    error: boolean
}
const initialState: ftsDeleteState = {
    result: null,
    loading: false,
    error: false
}

export const ftsDeleteAsync = createAsyncThunk(
    'ftsDelete/ftsDeleteAsync',
    async ({ id, handleClose, fetch }: { id: string | undefined | number, handleClose: () => void, fetch: () => void }) => {
        try {
            const result = await httpClient.delete(`${server.FLOATING}/${id}`)
            toast.success(SUCCESS)
            fetch()
            handleClose()
            return result.data
        } catch (error) {
            throw error
        }
    }
)

const ftsDeleteSlice = createSlice({
    name: 'ftsDelete',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(ftsDeleteAsync.fulfilled, (state: ftsDeleteState, action: PayloadAction<FtsCrane>) => {
            state.result = action.payload
            state.loading = false
            state.error = false
        });

        builder.addCase(ftsDeleteAsync.rejected, (state: ftsDeleteState) => {
            state.result = null
            state.loading = false
            state.error = true
        });

        builder.addCase(ftsDeleteAsync.pending, (state: ftsDeleteState) => {
            state.result = null
            state.loading = true
            state.error = false
        });
    },
})

export const { } = ftsDeleteSlice.actions
export const ftsDeleteSelector = (store: RootState) => store.ftsDeleteReducer
export default ftsDeleteSlice.reducer