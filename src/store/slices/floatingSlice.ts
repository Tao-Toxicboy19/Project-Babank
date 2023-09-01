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
    setDeleteFloating: (state, action) => {
      const idToDelete = action.payload;
      state.floating = state.floating.filter(floating => floating.floating_id !== idToDelete);
    },
    setUpdateFloating: (state, action: PayloadAction<Floating>) => {
      const { floating_id, ...updatedData } = action.payload;
      const existingFloatingIndex = state.floating.findIndex(floating => floating.floating_id === floating_id);

      if (existingFloatingIndex !== -1) {
        state.floating[existingFloatingIndex] = {
          ...state.floating[existingFloatingIndex],
          ...updatedData,
        };
      }
    },
  }
});

export const { setFloatingStart, setFloatingSuccess, setFloatingFailure, setInsertFloating, setDeleteFloating, setUpdateFloating } = floatingSlice.actions;
export default floatingSlice.reducer;
