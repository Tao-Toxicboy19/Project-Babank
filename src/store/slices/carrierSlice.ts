import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { carrier, carrierState } from "../../types/Carrier.type";

const initialState: carrierState = {
    carrier: []
}

const carrierSlice = createSlice({
    name: 'carrier',
    initialState,
    reducers: {
        setCarrier: (state, action: PayloadAction<carrier[]>) => {
            state.carrier = action.payload
        },
        addCarrier: (state, action: PayloadAction<carrier>) => {
            state.carrier.push(action.payload)
        },
    }
})

export const { setCarrier, addCarrier } = carrierSlice.actions
export default carrierSlice.reducer