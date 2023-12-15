import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import loginReducer from "./slices/auth/loginSlice";
import registerReducer from "./slices/auth/registerSlice";
import roleReducer from "./slices/auth/rolesSlice";
import usersReducer from "./slices/auth/userSlice";
import permissionsReducer from "./slices/auth/permissionSlice";
import cargoEditReducer from "./slices/Cargo/cargoEditSlice";
import cargoReducer from "./slices/Cargo/cargoSlice";
import cargoAddReducer from "./slices/Cargo/cargoAddSlice";
import cargoDeleteReducer from "./slices/Cargo/cargoDeleteSlice";
import cargoCraneEditReducer from "./slices/CargoCrane/cargoCraneEditSlice";
import cargoCraneAddReducer from "./slices/CargoCrane/cargoCraneAddSlice";
import cargoCraneReducer from "./slices/CargoCrane/cargoCraneSlice";
import cargoCraneDeleteReducer from "./slices/CargoCrane/cargoCraneSlice";
import carrierEditReducer from "./slices/Carrier/carrierEditSlice";
import carrierReducer from "./slices/Carrier/carrierSlice";
import carrierAddReducer from "./slices/Carrier/carrierAddSlice";
import carrieDeleteReducer from "./slices/Carrier/carriceDeleteSlice";
import craneEditReducer from "./slices/Crane/craneEditSlice";
import craneReducer from "./slices/Crane/craneSlice";
import craneAddReducer from "./slices/Crane/craneAddSlice";
import craneDeleteReducer from "./slices/Crane/craneDeleteSlice";
import ftsEditReducer from "./slices/FTS/ftsEditSlice";
import ftsReducer from "./slices/FTS/ftsSlice";
import ftsAddReducer from "./slices/FTS/ftsAddSlice";
import ftsDeleteReducer from "./slices/FTS/ftsDeleteSlice";
import craneSolutionTableReducer from "./slices/FtsSolution/craneSolutionTableSlice";
import FtsSolutionReducer from "./slices/FtsSolution/ftsSolutionSlice";
import mainTainFtsReducer from "./slices/mainTainFts/mainTainFtsSlice";
import mainTainCraneReducer from "./slices/MainTainCrane/mainTainCraneSlice";
import mainTainCraneDeleteReducer from "./slices/MainTainCrane/mainTainCraneDeleteSlice";
import orderEditReducer from "./slices/Order/orderEditSlice";
import orderReducer from "./slices/Order/orderSlice";
import orderDeleteReducer from "./slices/Order/orderDeleteSlice";


const reducer = {
  loginReducer,
  registerReducer,
  roleReducer,
  usersReducer,
  permissionsReducer,
  cargoEditReducer,
  cargoReducer,
  cargoAddReducer,
  cargoDeleteReducer,
  cargoCraneEditReducer,
  cargoCraneReducer,
  cargoCraneAddReducer,
  cargoCraneDeleteReducer,
  carrierEditReducer,
  carrierReducer,
  carrierAddReducer,
  carrieDeleteReducer,
  craneEditReducer,
  craneReducer,
  craneAddReducer,
  craneDeleteReducer,
  ftsEditReducer,
  ftsReducer,
  ftsAddReducer,
  ftsDeleteReducer,
  craneSolutionTableReducer,
  FtsSolutionReducer,
  mainTainFtsReducer,
  mainTainCraneReducer,
  mainTainCraneDeleteReducer,
  orderEditReducer,
  orderReducer,
  orderDeleteReducer,
};

export const store = configureStore({
  reducer,
  devTools: process.env.NODE_ENV === "development",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();