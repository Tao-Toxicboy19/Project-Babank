// store.ts
import { Action, ThunkAction, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { logger } from 'redux-logger';

import floatingReducer from './slices/floatingSlice.bak';
import authReducer from './slices/authSlice';
import orderReducer from './slices/OrderSlice';
import cargoReducer from './slices/cargoSlice';
import cargoCraneReducer from './slices/cargocraneSlice';
import carrierReducer from './slices/carrierSlice';
import floatingEditReducer from './slices/floating.edit.slice'

const middleware = [...getDefaultMiddleware()];

if (process.env.NODE_ENV !== 'production') {
  middleware.push(logger);
}

export const store = configureStore({
  reducer: {
    floating: floatingReducer,
    floatingedit: floatingEditReducer,
    order: orderReducer,
    cargo: cargoReducer,
    cargoCrane: cargoCraneReducer,
    carrier: carrierReducer,
    auth: authReducer,
  },
  middleware: middleware,
});

export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;