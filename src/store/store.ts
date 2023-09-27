// store.ts
import { Action, ThunkAction, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { logger } from 'redux-logger';

import orderReducer from './slices/order.slice';
import cargoReducer from './slices/cargo.slice';
import cargoCraneReducer from './slices/cargocrane.slice';
import carrierReducer from './slices/carrier.slice';
import carrierEditReducer from './slices/carrier.slice';
import cargoCraneEditReducer from './slices/cargocrane.edit.slice'
import loginReducer from './slices/login.slice'
import FTSCraneSlice from './slices/FTS.slice';
import FTSCraneCargoSlice from './slices/FTSCraneCargo.slice';
import FTSsolutionSlice from './slices/FTSsolution.slice';
import craneSolutionSlice from './slices/craneSolution.slice';
import FTSsolutionV2Slice from './slices/FTSsolutionV2.slice';
import FTSEditSlice from './slices/FTS.edit.slice';
import craneSlice from './slices/crane.slice';
import craneEditSlice from './slices/crane.edit.slice';
import registerReducer from './slices/register.slice'
import SolutionscheduleSlice from './slices/sollution_schedule.slice'

const middleware = [...getDefaultMiddleware()];

if (process.env.NODE_ENV !== 'production') {
  middleware.push(logger);
}

export const store = configureStore({
  reducer: {
    FTS: FTSCraneSlice,
    FTSCraneCargo: FTSCraneCargoSlice,
    FTSsolution: FTSsolutionSlice,
    craneSolution: craneSolutionSlice,
    FTSSolutionV2: FTSsolutionV2Slice,
    FTSEdit: FTSEditSlice,
    Crane: craneSlice,
    CraneEdit: craneEditSlice,
    Solutionschedule: SolutionscheduleSlice,
    // floating: floatingReducer,
    carrier: carrierReducer,
    carrierEdit: carrierEditReducer,
    order: orderReducer,
    cargo: cargoReducer,
    cargoCrane: cargoCraneReducer,
    cargoCraneEdit: cargoCraneEditReducer,
    login: loginReducer,
    register: registerReducer,
  },
  middleware: middleware,
});

export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;