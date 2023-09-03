import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { carrier, carrierState } from "../../types/Carrier.type";

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
        setCarrierSuccess: (state, action: PayloadAction<carrier[]>) => {
            state.carrier = action.payload
            state.loading = false
        },
        setCarrierFailure: (state, action: PayloadAction<string>) => {
            state.error = action.payload
            state.loading = false
        },
        setInsertCarrier: (state, action: PayloadAction<carrier>) => {
            state.carrier.push(action.payload)
        },
        setUpdateCarrier: (state, action: PayloadAction<carrier>) => {
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