import { PayloadAction, ThunkAction, createSlice } from "@reduxjs/toolkit";
import { Carrier, carrierState } from "../../types/Carrier.type";
import { server } from "../../Constants";
import { httpClient } from "../../utlis/httpclient";
import { RootState } from "../store";

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
            state.loading = true
            state.error = null
        },
        setCarrierSuccess: (state, action: PayloadAction<Carrier[]>) => {
            state.carrier = action.payload
            state.loading = false
        },
        setCarrierFailure: (state, action: PayloadAction<string>) => {
            state.error = action.payload
            state.loading = false
        },
        setInsertCarrier: (state, action: PayloadAction<Carrier>) => {
            state.carrier.push(action.payload)
        },
        setUpdateCarrier: (state, action: PayloadAction<Carrier>) => {
            const carrierIndex = state.carrier.findIndex(carrier => carrier.cr_id === action.payload.cr_id);
            if (carrierIndex !== -1) {
                state.carrier[carrierIndex] = action.payload
            }
        },
        setDeleteCarrier: (state, action: PayloadAction<string>) => {
            state.carrier = state.carrier.filter(
                (carrier) => carrier.cr_id !== action.payload
            )
        },
    }
})

export const { setDeleteCarrier, setUpdateCarrier, setCarrierStart, setCarrierSuccess, setCarrierFailure, setInsertCarrier } = carrierSlice.actions
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

export const addCarrier = (formData: FormData, setOpen: any) => {
    return async () => {
        try {
            await httpClient.post(server.CARRIER, formData);
            setOpen(false)
        } catch (error) {
            console.error('Error while adding CARRIER:', error);
        }
    };
};

export const deleteCarrier = (id: string) => {
    return async (dispatch: any) => {
        try {
            await httpClient.delete(`${server.CARRIER}/${id}`)
            dispatch(setDeleteCarrier(id));
        } catch (error: any) {
            dispatch(setCarrierFailure(error.message));
        }
    };
};