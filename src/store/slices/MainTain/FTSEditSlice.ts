import { PayloadAction, ThunkAction, createSlice } from "@reduxjs/toolkit";
import { httpClient } from "../../../utils/httpclient";
import { SUCCESS, server } from "../../../Constants";
import { RootState } from "../../store";
import { loadMainTainFTS } from "./FTSSlice";
import { toast } from "react-toastify";

const initialState: any = {
    result: null,
    loading: false,
    error: null
}

const FTSEditSlice = createSlice({
    name: 'carrieredit',
    initialState,
    reducers: {
        setFTSStart: (state) => {
            state.loading = true
            state.error = null
            state.result = null
        },
        setFTSSuccess: (state, action: PayloadAction<any>) => {
            state.result = action.payload
            state.loading = false
            state.error = null
        },
        setFTSFailure: (state, action: PayloadAction<string>) => {
            state.error = action.payload
            state.loading = false
            state.result = null
        },
    }
})

export const { setFTSStart, setFTSSuccess, setFTSFailure } = FTSEditSlice.actions
export default FTSEditSlice.reducer

export const updateMainTainFTS = (id: any, valuse: any, navigate: any): ThunkAction<void, RootState, unknown, any> => async (dispatch) => {
    try {
        dispatch(setFTSStart())
        const result = await httpClient.put(`${server.MAINTAIN_FTS_URL}/${id}`, valuse)
        dispatch(setFTSSuccess(result.data))
        dispatch(loadMainTainFTS())
        toast.success(SUCCESS);
        navigate('/transferstation')
    } catch (error) {
        dispatch(setFTSFailure('Failed to update cargo data'))
    }
}