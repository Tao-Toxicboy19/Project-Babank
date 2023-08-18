// authSlice.ts
import { createSlice } from '@reduxjs/toolkit';

interface AuthState {
  userEmail: string | null;
}

const initialState: AuthState = {
  userEmail: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserEmail: (state, action) => {
      state.userEmail = action.payload;
    },
    clearUserEmail: (state) => {
      state.userEmail = null;
    },
  },
});

export const { setUserEmail, clearUserEmail } = authSlice.actions;

export default authSlice.reducer;
