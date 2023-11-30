import { PayloadAction, ThunkAction, createSlice } from "@reduxjs/toolkit";
import { Carrier, carrierState } from "../../../type/Carrier.type";
import { SUCCESS, server } from "../../../Constants";
import { httpClient } from "../../../utils/httpclient";
import { RootState } from "../../store";
import { toast } from "react-toastify";

const initialState: carrierState = {
    carrier: [],
    loading: false,
    error: null
}

const carrierSlice = createSlice({
    name: 'carrier',
    initialState,
    reducers: {
        setCarrierStart: (state) => {
            state.carrier = []
            state.loading = true
            state.error = null
        },
        setCarrierSuccess: (state, action: PayloadAction<Carrier[]>) => {
            state.carrier = action.payload
            state.loading = false
            state.error = null
        },
        setCarrierFailure: (state, action: PayloadAction<string>) => {
            state.carrier = []
            state.error = action.payload
            state.loading = false
        },
        setInsertCarrier: (state, action: PayloadAction<Carrier>) => {
            state.carrier.push(action.payload)
        },
    }
})

export const { setCarrierStart, setCarrierSuccess, setCarrierFailure, setInsertCarrier } = carrierSlice.actions
export default carrierSlice.reducer

export const loadCarrier = (): ThunkAction<void, RootState, unknown, any> => async (dispatch) => {
    try {
        dispatch(setCarrierStart())
        const result = await httpClient.get(server.CARRIER)
        dispatch(setCarrierSuccess(result.data))
    }
    catch (error) {
        dispatch(setCarrierFailure("Failed to fetch CARRIER data"))
    }
}

export const addCarrier = (formData: any, navigate: any) => {
    return async (dispatch: any) => {
        try {
            await httpClient.post(server.CARRIER, formData);
            toast.success(SUCCESS)
            await dispatch(loadCarrier())
            navigate('/carrier')
        } catch (error) {
            dispatch(setCarrierFailure("Failed"));
        }
    };
};

export const deleteCarrier = (id: any, setOpen: any) => {
    return async (dispatch: any) => {
        try {
            await httpClient.delete(`${server.CARRIER}/${id}`);
            toast.success(SUCCESS)
            setOpen(false);
            await dispatch(loadCarrier())
        } catch (error: any) {
            if (error.response && error.response.status === 500) {
                toast.warn(`
                ไม่สามารถลบข้อมูลได้ เนื่องจากมี 
                ข้อมูลอยู่ที่ ออเดอร์
            `);
                setOpen(false)
            } else {
                dispatch(setCarrierFailure(error.message));
            }
        }
    };
};