// store.ts
import { Action, ThunkAction, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { logger } from 'redux-logger';

import orderReducer from './slices/Order/order.slice';
import cargoReducer from './slices/Cargo/cargoSlice';
import cargoCraneReducer from './slices/CargoCrane/cargoCraneSlice';
import carrierReducer from './slices/Carrier/carrierSlice';
import carrierEditReducer from './slices/Carrier/carrierEditSlice';
import cargoCraneEditReducer from './slices/CargoCrane/cargoCraneEditSlice'
import loginReducer from './slices/auth/loginSlice'
import FTSCraneSlice from './slices/FTS/ftsSlice';
import FTSCraneCargoSlice from './slices/FTS/FTSCraneCargo.slice';
import FTSsolutionSlice from './slices/FTS/FTSsolution.slice';
import craneSolutionSlice from './slices/Solution/craneSolution.slice';
import FTSsolutionV2Slice from './slices/FTS/FTSsolutionV2.slice';
import FTSEditSlice from './slices/FTS/ftsEditSlice';
import craneSlice from './slices/Crane/craneSlice';
import craneEditSlice from './slices/Crane/craneEditSlice';
import registerReducer from './slices/auth/registerSlice'
import SolutionscheduleSlice from './slices/Solution/sollution_schedule.slice'
import reportReducer from './slices/report/reportSlice'
import reportCraneReducer from './slices/report/reportCraneSlice'
import mainTainReducer from './slices/MainTain/CraneSlice'
import mainTainFTSReducer from './slices/MainTain/FTSSlice'
import managePlansSlice from './slices/managePlansSlice'
import CarneSolutionV2Slice from './slices/Solution/craneSolutionV2Slice'
import Solution_carrier_orderReducer from './slices/Solution/solution_carrier_orderSlice'
import rolesReducer from './slices/auth/rolesSlice'
import usersReducer from './slices/auth/userSlice'
import solution_orderSlice from './slices/Solution/solutionOrderSlice'

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
    manMgePlanReducer: managePlansSlice,
    carneSolutionV2Reducer: CarneSolutionV2Slice,
    Solution_carrier_orderReducer: Solution_carrier_orderReducer,
    rolesReducer: rolesReducer,
    usersReducer: usersReducer,
    solution_orderReducer: solution_orderSlice,
  },
  middleware: middleware,
});

export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;