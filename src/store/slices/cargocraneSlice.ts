// cargoCraneSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CargoCrane } from '../../types/CargoCrane.type'; // ปรับเป็นที่อยู่ของ CargoCrane interface ของคุณ

interface CargoCraneState {
  cargoCrane: CargoCrane[];
}

const initialState: CargoCraneState = {
  cargoCrane: [],
};

const cargoCraneSlice = createSlice({
  name: 'cargoCrane',
  initialState,
  reducers: {
    setCargoCrane: (state, action: PayloadAction<CargoCrane[]>) => {
      state.cargoCrane = action.payload;
    },
    addCargoCrane: (state, action: PayloadAction<CargoCrane>) => {
      state.cargoCrane.push(action.payload);
    },
  },
});

export const { setCargoCrane, addCargoCrane } = cargoCraneSlice.actions;

export default cargoCraneSlice.reducer;
