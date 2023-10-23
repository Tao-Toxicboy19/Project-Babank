// store.ts
import { Action, ThunkAction, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { logger } from 'redux-logger';

import orderReducer from './slices/Order/order.slice';
import cargoReducer from './slices/Cargo/cargo.slice';
import cargoCraneReducer from './slices/CargoCrane/cargocrane.slice';
import carrierReducer from './slices/Carrier/carrier.slice';
import carrierEditReducer from './slices/Carrier/carrier.slice';
import cargoCraneEditReducer from './slices/CargoCrane/cargocrane.edit.slice'
import loginReducer from './slices/login.slice'
import FTSCraneSlice from './slices/FTS/FTS.slice';
import FTSCraneCargoSlice from './slices/FTS/FTSCraneCargo.slice';
import FTSsolutionSlice from './slices/FTS/FTSsolution.slice';
import craneSolutionSlice from './slices/Solution/craneSolution.slice';
import FTSsolutionV2Slice from './slices/FTS/FTSsolutionV2.slice';
import FTSEditSlice from './slices/FTS/FTS.edit.slice';
import craneSlice from './slices/Cargo/crane.slice';
import craneEditSlice from './slices/Cargo/crane.edit.slice';
import registerReducer from './slices/register.slice'
import SolutionscheduleSlice from './slices/Solution/sollution_schedule.slice'
import statusSlice from './slices/status.slice'
import reportReducer from './slices/report/reportSlice'
import reportCraneReducer from './slices/report/reportCraneSlice'
import mainTainReducer from './slices/MainTain/CraneSlice'
import mainTainFTSReducer from './slices/MainTain/FTSSlice'

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
    status: statusSlice,
    carrier: carrierReducer,
    carrierEdit: carrierEditReducer,
    order: orderReducer,
    cargo: cargoReducer,
    cargoCrane: cargoCraneReducer,
    cargoCraneEdit: cargoCraneEditReducer,
    login: loginReducer,
    register: registerReducer,
    reportReducer: reportReducer,
    reportCraneReducer: reportCraneReducer,
    mainTainReducer: mainTainReducer,
    mainTainFTSReducer: mainTainFTSReducer,
  },
  middleware: middleware,
});

export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;