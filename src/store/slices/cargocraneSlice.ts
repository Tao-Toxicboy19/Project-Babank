import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CargoCrane, CargoCraneState } from "../../types/CargoCrane.type";

const initialState: CargoCraneState = {
    cargoCrane: []
}

const cargoCraneSlice = createSlice({
    name: "cargoCrane",
    initialState,
    reducers: {
        setCargoCrane: (state, action: PayloadAction<CargoCrane[]>) => {
            state.cargoCrane = action.payload
        }
    }
})
export const { setCargoCrane } = cargoCraneSlice.actions
export default cargoCraneSlice.reducer