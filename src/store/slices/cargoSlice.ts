// cargoSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Cargo, CargoState } from '../../types/Cargo.type';

const initialState: CargoState = {
  cargo: [],
};

const cargoSlice = createSlice({
  name: 'cargo',
  initialState,
  reducers: {
    setCargo: (state, action: PayloadAction<Cargo[]>) => {
      state.cargo = action.payload;
    },
    addCargo: (state, action: PayloadAction<Cargo>) => {
      state.cargo.push(action.payload);
    },
  },
});

export const { setCargo, addCargo } = cargoSlice.actions;
export default cargoSlice.reducer;