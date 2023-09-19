import { PayloadAction, ThunkAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { server } from "../../Constants";
import { httpClient } from "../../utlis/httpclient";
import { FTSCrane, FTSCraneState } from "../../types/FloatingCrane.type";

const initialState: FTSCraneState = {
    FTS: [],
    loading: false,
    error: null
}

const FTSSlice = createSlice({
    name: 'FTS',
    initialState,
    reducers: {
        setFTSState: (state) => {
            state.FTS = []
            state.loading = true
            state.error = null
        },
        setFTSSuccess: (state, action: PayloadAction<FTSCrane[]>) => {
            state.FTS = action.payload
            state.loading = false
            state.error = null
        },
        setFTSFailure: (state, action: PayloadAction<string>) => {
            state.FTS = []
            state.error = action.payload
            state.loading = false
        },
        setInsertFTS: (state, action: PayloadAction<FTSCrane>) => {
            state.FTS.push(action.payload)
        },
        setDeleteFTS: (state, action: PayloadAction<any>) => {
            state.FTS = state.FTS.filter(
                (FTS) => FTS.fts_id !== action.payload
            )
        },
    }
})
export const { setFTSState, setFTSSuccess, setFTSFailure, setInsertFTS, setDeleteFTS } = FTSSlice.actions
export default FTSSlice.reducer

export const loadFTS = (): ThunkAction<void, RootState, unknown, any> => async (dispatch) => {
    try {
        dispatch(setFTSState())
        const result = await httpClient.get(server.FLOATING)
        dispatch(setFTSSuccess(result.data))
    }
    catch (error) {
        dispatch(setFTSFailure("Failed to fetch floating data"))
    }
}

export const addFTS = (formData: FormData, navigate: any) => {
    return async () => {
        try {
            await httpClient.post(server.FLOATING, formData);
            alert('Successfully')
            navigate('/transferstation')
        } catch (error) {
            console.error('Error while adding CARRIER:', error);
        }
    };
};

export const deleteFTS = (id: any) => {
    return async (dispatch: any) => {
        await httpClient.delete(`${server.FLOATING}/${id}`);
        dispatch(setDeleteFTS(id))
    };
};

const doGetCrane = async (dispatch: any) => {
    try {
        const result = await httpClient.get(server.FLOATING);
        dispatch(setFTSSuccess(result.data));
    } catch (error: any) {
        dispatch(setFTSFailure(error.message));
    }
};

export const deleteCrane = (id: any, setOpen: any) => {
    return async (dispatch: any) => {
        try {
            await httpClient.delete(`${server.CRANE}/${id}`);
            setOpen(false);
            await doGetCrane(dispatch);
        } catch (error: any) {
            dispatch(setFTSFailure(error.message));
        }
    };
};