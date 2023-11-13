import { createSlice, PayloadAction, ThunkAction } from '@reduxjs/toolkit';
import { server, SUCCESS } from '../../../Constants';
import { httpClient } from '../../../utils/httpclient';
import { RootState } from '../../store';
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

export const addCargoOrder = (values: any, navigate: any, setIsSubmitting: any): ThunkAction<void, RootState, unknown, any> => async (dispatch) => {
    try {
        dispatch(setcargoOrderStart());
        const result = await httpClient.post<CargordersState>(server.CARGOORDER_URL, values);
        dispatch(setcargoOrderSuccess(result.data));
        dispatch(loadOrder())
        setIsSubmitting(false)
        toast.success(SUCCESS);
        navigate('/orders')
    } catch (error: any) {
        if (error.response && error.response.status === 500) {
            toast.warn('สินค้าซ้ำกัน')
            setIsSubmitting(false)
        } else {
            dispatch(setcargoOrderFailure("error"));
        }
    }
};


export const updateCargoOrder = (id: any, values: any, navigate: any, setIsSubmitting: any) => {
    return async (dispatch: any) => {
        try {
            setIsSubmitting(true);
            dispatch(setcargoOrderStart());
            const result = await httpClient.put(`${server.CARGOORDER_URL}/${id}`, values);
            dispatch(setcargoOrderSuccess(result.data));
            toast.success(SUCCESS)
            await dispatch(loadOrder())
            navigate('/orders')
        } catch (error: any) {
            if (error.response && error.response.status === 500) {
                toast.warn('สินค้าซ้ำกัน')
                setIsSubmitting(false);
            } else {
                dispatch(setcargoOrderFailure('Failed to update floating data'));
            }
        }
    };
};
