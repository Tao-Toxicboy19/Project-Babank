import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Floating, FloatingState } from '../../types/FloatingCrane.type';

const initialState: FloatingState = {
  floating: [],
  loading: false,
  error: null
}

const floatingSlice = createSlice({
  name: "floating",
  initialState,
  reducers: {
    setFloatingStart: (state) => {
      state.loading = true
      state.error = null
    },
    setFloatingSuccess: (state, action: PayloadAction<Floating[]>) => {
      state.floating = action.payload
      state.loading = false
    },
    setFloatingFailure: (state, action: PayloadAction<string>) => {
      state.loading = false
      state.error = action.payload
    },
    setInsertFloating: (state, action: PayloadAction<Floating>) => {
      state.floating.push(action.payload);
    },
    setUpdateFloating: (state, action: PayloadAction<Floating>) => {
      state.loading = false;
      const cargoIndex = state.floating.findIndex(floating => floating.fl_id === action.payload.fl_id);
      if (cargoIndex !== -1) {
        state.floating[cargoIndex] = action.payload;
      }
    },
    setDeleteFloating: (state, action) => {
      state.loading = false;
      const idToDelete = action.payload;
      state.floating = state.floating.filter(floating => floating.fl_id !== idToDelete);
    },
  }
});

export const { setFloatingStart, setFloatingSuccess, setFloatingFailure, setInsertFloating, setDeleteFloating, setUpdateFloating } = floatingSlice.actions;
export default floatingSlice.reducer;
