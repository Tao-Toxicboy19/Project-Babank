import { createSlice, PayloadAction, ThunkAction } from "@reduxjs/toolkit";
import { MainTainFTS } from "../../../type/mainTain.type";
import { server, SUCCESS } from "../../../Constants";
import { httpClient } from "../../../utils/httpclient";
import { RootState } from "../../store";
import { toast } from "react-toastify";


interface mainTainFTSState {
    loading: boolean
    error: boolean
    data: MainTainFTS[]
}

const initialState: mainTainFTSState = {
    loading: false,
    error: false,
    data: []
}

const mainTainFTSSlice = createSlice({
    name: 'MainTainFTS',
    initialState,
    reducers: {
        setMainTainFTSStart(state) {
            state.data = []
            state.loading = true
            state.error = false
        },
        setMainTainFTSSuccess(state, action: PayloadAction<MainTainFTS[]>) {
            state.data = action.payload
            state.loading = false
            state.error = false
        },
        setMainTainFTSFailed(state) {
            state.data = []
            state.error = true
            state.loading = false
        },
    }
})

export const { setMainTainFTSStart, setMainTainFTSSuccess, setMainTainFTSFailed } = mainTainFTSSlice.actions
export default mainTainFTSSlice.reducer;

export const loadMainTainFTS = (): ThunkAction<void, RootState, unknown, any> => async (dispatch) => {
    try {
        dispatch(setMainTainFTSStart())
        const result = await httpClient.get(server.MAINTAIN_FTS_URL)
        dispatch(setMainTainFTSSuccess(result.data))
    }
    catch (error) {
        dispatch(setMainTainFTSFailed())
    }
}

export const addMainTainFTS = (formData: any, navigate: any) => {
    return async (dispatch: any) => {
        try {
            await httpClient.post(server.MAINTAIN_FTS_URL, formData);
            toast.success(SUCCESS)
            navigate('/transferstation')
            dispatch(loadMainTainFTS())
        } catch (error) {
            dispatch(setMainTainFTSFailed())
        }
    };
};

export const deleteMainTainFTS = (id: any, setOpen: any) => {
    return async (dispatch: any) => {
        try {
            await httpClient.delete(`${server.MAINTAIN_FTS_URL}/${id}`)
            setOpen(false)
            dispatch(loadMainTainFTS())
            // toast.success(SUCCESS)
        } catch (error: any) {
            dispatch(setMainTainFTSFailed())
        }
    };
};