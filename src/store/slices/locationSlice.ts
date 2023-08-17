import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Floating, FloatingState } from '../../types/FloatingCrane.type';

const initialState: FloatingState = {
  data: []
}

const floatingSlice = createSlice({
  name: "floating",
  initialState,
  reducers: {
    addfloating: (state, action) => {
      state.data = action.payload;
    },
    deleteFloating: (state, action) => {
      const idToDelete = action.payload;
      state.data = state.data.filter(floating => floating.id !== idToDelete);
    },
    updateFloating: (state, action: PayloadAction<Floating>) => {
      const { id, ...updatedData } = action.payload;
      const existingFloatingIndex = state.data.findIndex(floating => floating.id === id);

      if (existingFloatingIndex !== -1) {
        state.data[existingFloatingIndex] = {
          ...state.data[existingFloatingIndex],
          ...updatedData,
        };
      }
    },
  }
});

export const { addfloating, deleteFloating, updateFloating } = floatingSlice.actions;
export default floatingSlice.reducer;
