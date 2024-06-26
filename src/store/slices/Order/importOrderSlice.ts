// orderSlice.ts
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { server, SUCCESS } from '../../../Constants';
import { httpClient } from '../../../utils/httpclient';
import { RootState } from '../../store';
import { toast } from 'react-toastify';
import axios from 'axios';

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
    async ({ forms, fetch, group, handleClose, setIsSubmitting, chacks }: { forms: any, fetch: () => void, group?: number | undefined, handleClose: () => void, setIsSubmitting: React.Dispatch<React.SetStateAction<boolean>>, chacks: string }) => {
        try {
            setIsSubmitting(true)
            if (chacks === 'Overwirte') {
                if (group) {
                    await axios.delete(`https://sched.floatingcraneservice.com/backend/api/exportorder/${group}`)
                }
            }
            const result = await httpClient.post(server.IMPORTORDER, forms)
            fetch()
            toast.success(SUCCESS)
            handleClose()
            return result.data
        } catch (error) {
            setIsSubmitting(false)
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