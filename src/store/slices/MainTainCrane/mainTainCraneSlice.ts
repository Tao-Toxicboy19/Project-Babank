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
    noti_day: number
    noti: boolean
    name: string
    crane: Crane;
}

interface mainTainState {
    loading: boolean
    error: boolean
    result: MainTain[]
    notiPlan: MainTain[]
    count: number
}

const initialState: mainTainState = {
    loading: false,
    error: false,
    result: [],
    notiPlan: [],
    count: 0
}

export const mainTainCraneAsync = createAsyncThunk(
    'mainTainCrane/mainTainCraneAsync',
    async (id: number | undefined) => {
        try {
            const result = await httpClient.get(`${server.MAINTAIN_CRAN_URL}/${id}`)
            return result.data;
        } catch (error) {
            throw error;
        }
    }
)

export const removeNotiCrane = createAsyncThunk(
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

const mainTainCraneSlice = createSlice({
    name: 'mainTainCrane',
    initialState,
    reducers: {
        setRemove(state, action: PayloadAction<number>) {
            state.notiPlan = state.notiPlan.filter(p => p.maintain_crane_id !== action.payload)
            state.count = state.notiPlan.length
        }
    },
    extraReducers: (builder) => {
        builder.addCase(mainTainCraneAsync.fulfilled, (state: mainTainState, action: PayloadAction<MainTain[]>) => {
            state.result = action.payload

            state.notiPlan = action.payload.filter(notification => {
                const thirtyDaysAgo = new Date();
                thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - notification.noti_day)
                return new Date(notification.downtime) > thirtyDaysAgo && notification.noti === false
            })
            state.count = state.notiPlan.length
            state.loading = false
            state.error = false
        });

        builder.addCase(mainTainCraneAsync.rejected, (state: mainTainState) => {
            state.result = []
            state.loading = false
            state.error = true
        });

        builder.addCase(mainTainCraneAsync.pending, (state: mainTainState) => {
            state.result = []
            state.loading = true
            state.error = false
        });
    },
})

export const { setRemove } = mainTainCraneSlice.actions
export const mainTainCraneSelector = (store: RootState) => store.mainTainCraneReducer
export default mainTainCraneSlice.reducer