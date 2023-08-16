// locationSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Floating } from '../../types/FloatingCrane.type';

interface LocationSliceState {
  data: Floating[];
  loading: boolean;
  error: string | null;
}

const initialState: LocationSliceState = {
  data: [],
  loading: false,
  error: null,
};

const locationSlice = createSlice({
  name: 'locationSlice',
  initialState,
  reducers: {
    fetchDataStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchDataSuccess(state, action: PayloadAction<Floating[]>) {
      state.loading = false;
      state.data = action.payload;
    },
    fetchDataFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchDataStart, fetchDataSuccess, fetchDataFailure } = locationSlice.actions;

export default locationSlice.reducer;
