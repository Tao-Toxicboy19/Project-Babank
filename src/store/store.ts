// store.ts
import { Action, ThunkAction, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { logger } from 'redux-logger';

import orderReducer from './slices/order.slice';
import cargoReducer from './slices/cargo.slice';
import cargoCraneReducer from './slices/cargocrane.slice';
import carrierReducer from './slices/carrier.slice';
import carrierEditReducer from './slices/carrier.slice';
import floatingEditReducer from './slices/floating.edit.slice'
import cargoCraneEditReducer from './slices/cargocrane.edit.slice'
import loginReducer from './slices/login.slice'

const middleware = [...getDefaultMiddleware()];

if (process.env.NODE_ENV !== 'production') {
  middleware.push(logger);
}

export const store = configureStore({
  reducer: {
    // floating: floatingReducer,
    floatingEdit: floatingEditReducer,
    carrier: carrierReducer,
    carrierEdit: carrierEditReducer,
    order: orderReducer,
    cargo: cargoReducer,
    cargoCrane: cargoCraneReducer,
    cargoCraneEdit: cargoCraneEditReducer,
    login: loginReducer,
  },
  middleware: middleware,
});

export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;