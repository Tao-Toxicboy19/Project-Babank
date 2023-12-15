import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { server } from "../../../Constants";
import { httpClient } from "../../../utils/httpclient";
import { RootState } from "../../store";

interface Crane {
    id: number;
    crane_name: string;
    FTS_id: number;
    setuptime_crane: number;
    wage_month_cost: number;
    premium_rate: number;
}

interface MainTain {
    maintain_crane_id: number;
    desc: string;
    downtime: string;
    start_time: string;
    mt_crane_id: number;
    group: number;
    crane: Crane;
}

interface mainTainState {
    loading: boolean
    error: boolean
    result: MainTain | null
}

const initialState: mainTainState = {
    loading: false,
    error: false,
    result: null
}

export const mainTainCraneDeleteDeleteAsync = createAsyncThunk(
    'mainTainCraneDelete/mainTainCraneDeleteDeleteAsync',
    async ({ id, handleClose, fetch }: { id: number, handleClose: () => void, fetch: () => void }) => {
        try {
            const result = await httpClient.delete(`${server.MAINTAIN_CRAN_URL}/${id}`)
            fetch()
            handleClose()
            return result.data;
        } catch (error) {
            throw error;
        }
    }
)

const mainTainCraneDeleteSlice = createSlice({
    name: 'mainTainCraneDelete',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(mainTainCraneDeleteDeleteAsync.fulfilled, (state: mainTainState, action: PayloadAction<MainTain>) => {
            state.result = action.payload
            state.loading = false
            state.error = false
        });

        builder.addCase(mainTainCraneDeleteDeleteAsync.rejected, (state: mainTainState) => {
            state.result = null
            state.loading = false
            state.error = true
        });

        builder.addCase(mainTainCraneDeleteDeleteAsync.pending, (state: mainTainState) => {
            state.result = null
            state.loading = true
            state.error = false
        });
    },
})

export const { } = mainTainCraneDeleteSlice.actions
export const mainTainCraneDeleteSelector = (store: RootState) => store.mainTainCraneDeleteReducer
export default mainTainCraneDeleteSlice.reducer