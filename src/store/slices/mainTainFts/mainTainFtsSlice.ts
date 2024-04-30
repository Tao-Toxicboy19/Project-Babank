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
    result: MainTainFTS[]
    notiPlan: MainTainFTS[]
    loading: boolean
    error: boolean
}

const initialState: mainTainFTSState = {
    result: [],
    notiPlan: [],
    loading: false,
    error: false,
}

export const mainTainAsync = createAsyncThunk(
    'mainTain/mainTainAsync',
    async (id: number | undefined) => {
        try {
            const result = await httpClient.get<MainTainFTS[]>(`${server.MAINTAIN_FTS_URL}/${id}`)
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
        builder.addCase(mainTainAsync.fulfilled, (state: mainTainFTSState, action: PayloadAction<MainTainFTS[]>) => {
            state.result = action.payload
            // Filter notifications for the last 30 days
            const thirtyDaysAgo = new Date();
            thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
            state.notiPlan = action.payload.filter(notification => new Date(notification.downtime_FTS) > thirtyDaysAgo);

            state.loading = false
            state.error = false
        });

        builder.addCase(mainTainAsync.rejected, (state: mainTainFTSState) => {
            state.result = []
            state.loading = false
            state.error = true
        });

        builder.addCase(mainTainAsync.pending, (state: mainTainFTSState) => {
            state.result = []
            state.loading = true
            state.error = false
        });
    },
});

export const { } = mainTainSlice.actions
export const mainTainFtsSelector = (store: RootState) => store.mainTainFtsReducer
export default mainTainSlice.reducer