import { PayloadAction, ThunkAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

export interface Status {
    status: boolean
    loading: boolean
    error: string | null
}

const initialState: Status = {
    status: false,
    loading: false,
    error: null
}

const StatusSlice = createSlice({
    name: "Status",
    initialState,
    reducers: {
        setStatusStart: (state) => {
            state.loading = true
            state.status = false
            state.error = null
        },
        setStatusSuccess: (state, actions: PayloadAction<any>) => {
            state.status = actions.payload
            state.loading = false
            state.error = null
        },
        setStatusFailure: (state, action: PayloadAction<string>) => {
            state.loading = false
            state.status = false
            state.error = action.payload
        },
    }
});

export const { setStatusStart, setStatusSuccess, setStatusFailure } = StatusSlice.actions;
export default StatusSlice.reducer;

export const statusClick = (): ThunkAction<void, RootState, unknown, any> => async (dispatch) => {
    try {
        dispatch(setStatusStart());
        dispatch(setStatusSuccess(true));
    } catch (error) {
        dispatch(setStatusFailure("error"));
    }
}


export const resetStatus = (): ThunkAction<void, RootState, unknown, any> => async (dispatch) => {
    try {
        dispatch(setStatusStart());
        dispatch(setStatusSuccess(false));
    } catch (error) {
        dispatch(setStatusFailure("error"));
    }
}