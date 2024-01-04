// orderSlice.ts
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { server, SUCCESS } from '../../../Constants';
import { httpClient } from '../../../utils/httpclient';
import { RootState } from '../../store';
import { toast } from 'react-toastify';

interface OrderState {
    result: any
    loading: boolean
    error: boolean
}

const initialState: OrderState = {
    result: [],
    loading: false,
    error: false,
}

export const importOrderAsync = createAsyncThunk(
    'importOrder/importOrderAsync',
    async ({ formData, fetch, group }: { formData: FormData, fetch: () => void, group?: number | undefined }) => {
        try {
            if (group) {
                await httpClient.delete(`http://crane.otpzlab.com:7070/api/exportorder/${group}`)
            }
            const result = await httpClient.post(server.IMPORTORDER, formData)
            fetch()
            toast.success(SUCCESS)
            return result.data
        } catch (error) {
            throw error
        }
    }
)

const importOrderSlice = createSlice({
    name: 'importOrder',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(importOrderAsync.fulfilled, (state: OrderState, action: PayloadAction<any>) => {
            state.result = action.payload
            state.loading = false
            state.error = false
        });

        builder.addCase(importOrderAsync.rejected, (state: OrderState) => {
            state.result = null
            state.loading = false
            state.error = true
        });

        builder.addCase(importOrderAsync.pending, (state: OrderState) => {
            state.result = null
            state.loading = true
            state.error = false
        });
    },
});

export const { } = importOrderSlice.actions
export const importOrderSelector = (store: RootState) => store.importOrderReducer
export default importOrderSlice.reducer