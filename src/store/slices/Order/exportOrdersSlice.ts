// orderSlice.ts
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { server } from '../../../Constants';
import { httpClient } from '../../../utils/httpclient';
import { RootState } from '../../store';

export interface orders {
    carrier_name: string
    cargo_name: string
    category: string
    arrival_time: string
    deadline_time: string
    latitude: number
    longitude: number
    maxFTS: number
    bulk: number
    penalty_rate: number
    reward_rate: number
}

interface OrderState {
    result: orders[];
    loading: boolean
    error: boolean
}

const initialState: OrderState = {
    result: [],
    loading: false,
    error: false,
}

export const exportOrderAsync = createAsyncThunk(
    'exportOrder/exportOrderAsync',
    async () => {
        try {
            const result = await httpClient.get<orders[]>(server.EXPORTORDER)
            return result.data
        } catch (error) {
            throw error
        }
    }
)

const exportOrderSlice = createSlice({
    name: 'exportOrder',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(exportOrderAsync.fulfilled, (state: OrderState, action: PayloadAction<orders[]>) => {
            state.result = action.payload
            state.loading = false
            state.error = false
        });

        builder.addCase(exportOrderAsync.rejected, (state: OrderState) => {
            state.result = []
            state.loading = false
            state.error = true
        });

        builder.addCase(exportOrderAsync.pending, (state: OrderState) => {
            state.result = []
            state.loading = true
            state.error = false
        });
    },
});

export const { } = exportOrderSlice.actions
export const exportOrderSelector = (store: RootState) => store.exportOrderReducer
export default exportOrderSlice.reducer