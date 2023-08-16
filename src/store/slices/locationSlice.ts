import { createSlice } from '@reduxjs/toolkit';
import { FloatingState } from '../../types/FloatingCrane.type';

const initialState: FloatingState = {
  data: []
}

const floatingSlice = createSlice({
  name: "floating",
  initialState,
  reducers: {
    addfloating: (state, action) => {
      state.data = action.payload;
    }
  }
});

export const { addfloating } = floatingSlice.actions;
export default floatingSlice.reducer;
