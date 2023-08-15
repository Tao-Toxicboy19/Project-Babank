import { ThunkAction, configureStore, Action } from "@reduxjs/toolkit";
import floatingReducer from "./slices/GetFloatingCraneSlice"

export const store = configureStore({
    reducer: {
        floating: floatingReducer,
    },
});

export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;