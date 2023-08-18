// store.ts
import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit';
import floatingReducer from "./slices/locationSlice"
import authReducer from "./slices/authSlice"

export const store = configureStore({
  reducer: {
    floating: floatingReducer,
    auth: authReducer,
  },
});

export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;