import { createSlice, PayloadAction, ThunkAction } from "@reduxjs/toolkit";
import { MainTainFTS } from "../../../types/mainTain.type";
import { server } from "../../../Constants";
import { httpClient } from "../../../utils/httpclient";
import { RootState } from "../../store";


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