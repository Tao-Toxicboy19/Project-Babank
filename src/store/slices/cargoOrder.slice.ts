import { createSlice, PayloadAction, ThunkAction } from '@reduxjs/toolkit';
import { server } from '../../Constants';
import { httpClient } from '../../utlis/httpclient';
import { RootState } from '../store';
import { toast } from 'react-toastify';
import { loadOrder } from './order.slice';

export interface Cargorders {
    message: string;
    result: Result;
}

export interface Result {
    count: number;
}

export interface CargordersState {
    loading: boolean;
    error: string | null;
    result: any
}

const initialState: CargordersState = {
    result: null,
    loading: false,
    error: null,
};

const cargoOrderSlice = createSlice({
    name: 'cargoOrder',
    initialState,
    reducers: {
        setcargoOrderStart: (state) => {
            state.loading = true
            state.error = null
        },
        setcargoOrderSuccess: (state, action: PayloadAction<CargordersState>) => {
            state.result = action.payload
            state.loading = false
        },
        setcargoOrderFailure: (state, action: PayloadAction<string>) => {
            state.error = action.payload
            state.loading = false
        },
    },
})

export const { setcargoOrderStart, setcargoOrderSuccess, setcargoOrderFailure } = cargoOrderSlice.actions
export default cargoOrderSlice.reducer

export const cargoOrder = (values: any, navigate: any): ThunkAction<void, RootState, unknown, any> => async (dispatch) => {
    try {
        dispatch(setcargoOrderStart());
        const result = await httpClient.post<CargordersState>(server.CARGOORDER_URL, values);
        dispatch(setcargoOrderSuccess(result.data));
        await dispatch(loadOrder())
        toast.success('เพิ่มออเดอร์เรียบร้อย');
        navigate('/orders')
    } catch (error) {
        dispatch(setcargoOrderFailure("error"));
    }
};