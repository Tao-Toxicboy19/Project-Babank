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
    noti_day: number;
    noti: boolean
    name: string
    fts: Fts;
}

interface mainTainFTSState {
    result: MainTainFTS[]
    notiPlan: MainTainFTS[]
    loading: boolean
    count: number
    error: boolean
}

const initialState: mainTainFTSState = {
    result: [],
    notiPlan: [],
    loading: false,
    count: 0,
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

export const removeNotiFTS = createAsyncThunk(
    'mainTainCrane/mainTainCraneAsync',
    async ({ id, type }: { id: number, type: string }, { dispatch }) => {
        try {
            dispatch(setRemove(id))
            await httpClient.post('delete/noti', { id, type })
        } catch (error) {
            throw error;
        }
    }
)

const mainTainSlice = createSlice({
    name: 'mainTain',
    initialState,
    reducers: {
        setRemove(state, action: PayloadAction<number>) {
            state.notiPlan = state.notiPlan.filter(p => p.maintain_FTS_id !== action.payload)
            state.count = state.notiPlan.length
        }
    },
    extraReducers: (builder) => {
        builder.addCase(mainTainAsync.fulfilled, (state: mainTainFTSState, action: PayloadAction<MainTainFTS[]>) => {
            state.result = action.payload
            state.notiPlan = action.payload.filter(notification => {
                const thirtyDaysAgo = new Date();
                thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
                return new Date(notification.downtime_FTS) > thirtyDaysAgo && notification.noti === false
            })
            state.count = state.notiPlan.length
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

export const { setRemove } = mainTainSlice.actions
export const mainTainFtsSelector = (store: RootState) => store.mainTainFtsReducer
export default mainTainSlice.reducer