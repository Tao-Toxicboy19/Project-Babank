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
  },
});

export const { setCargo } = cargoSlice.actions;

export default cargoSlice.reducer;
