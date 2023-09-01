// cargoSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Cargo, CargoState } from '../../types/Cargo.type';

const initialState: CargoState = {
  cargo: [],
  loading: false,
  error: null,
};

const cargoSlice = createSlice({
  name: 'cargo',
  initialState,
  reducers: {
    setCargoStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    setCargoSuccess: (state, action: PayloadAction<Cargo[]>) => {
      state.cargo = action.payload;
      state.loading = false;
    },
    setCargoFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    setInsertSuccess: (state, action: PayloadAction<Cargo>) => {
      state.cargo.push(action.payload);
      state.loading = false;
    },
    setUpdateCargo: (state, action: PayloadAction<Cargo>) => {
      state.loading = false;
      const cargoIndex = state.cargo.findIndex(c => c.cargo_id === action.payload.cargo_id);
      if (cargoIndex !== -1) {
        state.cargo[cargoIndex] = action.payload;
      }
    },
    setDeleteCargo: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.cargo = state.cargo.filter(
        (cargo) => cargo.cargo_id !== action.payload
      );
    },
  },
});

export const { setCargoStart, setCargoSuccess, setCargoFailure, setInsertSuccess, setUpdateCargo, setDeleteCargo } = cargoSlice.actions;
export default cargoSlice.reducer;