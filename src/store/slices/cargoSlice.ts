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
    updateCargo: (state, action: PayloadAction<Cargo>) => {
      const cargoIndex = state.cargo.findIndex(c => c.cargo_id === action.payload.cargo_id);
      if (cargoIndex !== -1) {
        state.cargo[cargoIndex] = action.payload;
      }
    },
    deleteCargo: (state, action: PayloadAction<string>) => {
      state.cargo = state.cargo.filter(
        (cargo) => cargo.cargo_id !== action.payload
      );
    },
  },
});

export const { setCargo, addCargo, updateCargo, deleteCargo } = cargoSlice.actions;
export default cargoSlice.reducer;