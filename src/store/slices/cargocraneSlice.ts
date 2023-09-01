// cargoCraneSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CargoCrane, CargoCraneState } from '../../types/CargoCrane.type'; // ปรับเป็นที่อยู่ของ CargoCrane interface ของคุณ

const initialState: CargoCraneState = {
  cargoCrane: [],
  loading: false,
  error: null,
};

const cargoCraneSlice = createSlice({
  name: 'cargoCrane',
  initialState,
  reducers: {
    setCargoCraneStart: (state) => {
      state.loading = true
      state.error = null
    },
    setCargoCraneSuccess: (state, action: PayloadAction<CargoCrane[]>) => {
      state.cargoCrane = action.payload
      state.loading = false
    },
    setCargoCraneFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload
      state.loading = false
    },
    setInsertCargoCrane: (state, action: PayloadAction<CargoCrane>) => {
      state.cargoCrane.push(action.payload);
    },
    setUpdateCargo: (state, action: PayloadAction<CargoCrane>) => {
      const CargoCraneIndex = state.cargoCrane.findIndex(c => c.cargo_crane_id === action.payload.cargo_crane_id);
      if (CargoCraneIndex !== -1) {
        state.cargoCrane[CargoCraneIndex] = action.payload;
      }
    },
    setDeleteCargo: (state, action: PayloadAction<string>) => {
      state.cargoCrane = state.cargoCrane.filter(
        (cargoCrane) => cargoCrane.cargo_crane_id !== action.payload
      );
    },
  },
});

export const { setDeleteCargo, setUpdateCargo, setInsertCargoCrane, setCargoCraneFailure, setCargoCraneSuccess, setCargoCraneStart } = cargoCraneSlice.actions;
export default cargoCraneSlice.reducer;
