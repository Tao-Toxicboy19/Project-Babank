import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { server } from "../../../Constants";
import { httpClient } from "../../../utils/httpclient";
import { RootState } from "../../store";

interface Fts {
    id: number;
    FTS_name: string;
    lat: number;
    lng: number;
    setuptime_FTS: number;
    speed: number;
}

interface MainTainFTS {
    maintain_FTS_id: number;
    desc_FTS: string;
    downtime_FTS: any;
    start_time_FTS: any;
    mt_FTS_id: number;
    group: number;
    fts: Fts;
}

interface mainTainFTSState {
    result: MainTainFTS | null
    loading: boolean
    error: boolean
}

const initialState: mainTainFTSState = {
    result: null,
    loading: false,
    error: false,
}

export const mainTainDeleteAsync = createAsyncThunk(
    'mainTainDelete/mainTainDeleteAsync',
    async ({ id, handleClose, fetch }: { id: number, handleClose: () => void, fetch: () => void }) => {
        try {
            const result = await httpClient.delete(`${server.MAINTAIN_FTS_URL}/${id}`)
            handleClose()
            fetch()
            return result.data;
        } catch (error) {
            throw error;
        }
    }
)

const mainTainSlice = createSlice({
    name: 'mainTain',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(mainTainDeleteAsync.fulfilled, (state: mainTainFTSState, action: PayloadAction<MainTainFTS>) => {
            state.result = action.payload
            state.loading = false
            state.error = false
        });

        builder.addCase(mainTainDeleteAsync.rejected, (state: mainTainFTSState) => {
            state.result = null
            state.loading = false
            state.error = true
        });

        builder.addCase(mainTainDeleteAsync.pending, (state: mainTainFTSState) => {
            state.result = null
            state.loading = true
            state.error = false
        });
    },
});

export const { } = mainTainSlice.actions
export const mainTainFtsSelector = (store: RootState) => store.mainTainFtsReducer
export default mainTainSlice.reducer