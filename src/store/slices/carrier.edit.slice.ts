import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Carrier, CarrierEditState } from "../../types/Carrier.type";
import { server } from "../../Constants";
import { httpClient } from "../../utlis/httpclient";

const initialState: CarrierEditState = {
    carrier: null,
    loading: false,
    error: null
}

const carrierEditSlice = createSlice({
    name: 'carrieredit',
    initialState,
    reducers: {
        setCarrierStart: (state) => {
            state.loading = true
            state.error = null
            state.carrier = null
        },
        setCarrierSuccess: (state, action: PayloadAction<Carrier>) => {
            state.carrier = action.payload
            state.loading = false
            state.error = null
        },
        setCarrierFailure: (state, action: PayloadAction<string>) => {
            state.error = action.payload
            state.loading = false
            state.carrier = null
        },
    }
})

export const { setCarrierStart, setCarrierSuccess, setCarrierFailure } = carrierEditSlice.actions
export default carrierEditSlice.reducer

export const updateCarrier = (id: any, formData: FormData, setOpen: any) => {
    return async (dispatch: any) => {
        try {
            dispatch(setCarrierStart());
            const result = await httpClient.put(`${server.CARRIER}/${id}`, formData);
            dispatch(setCarrierSuccess(result.data));
            setOpen(false)
        } catch (error) {
            alert(JSON.stringify(error));
            dispatch(setCarrierFailure('Failed to update floating data'));
        }
    };
};