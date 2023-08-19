// store.ts
import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit';
import floatingReducer from "./slices/locationSlice"
import authReducer from "./slices/authSlice"
import orderReducer from "./slices/OrderSlice"
import cargoReducer from "./slices/cargoSlice"
import cargoCraneReducer from "./slices/cargocraneSlice"

export const store = configureStore({
  reducer: {
    floating: floatingReducer,
    order: orderReducer,
    cargo: cargoReducer,
    cargoCrane: cargoCraneReducer,
    auth: authReducer,
  },
});

export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;