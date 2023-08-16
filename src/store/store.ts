// store.ts
import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit';
import locationSliceReducer from './slices/locationSlice';
import { api } from '../api';

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    locationSlice: locationSliceReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
});

export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;