import { createSlice, PayloadAction, ThunkAction } from "@reduxjs/toolkit";
import { MainTainFTS } from "../../../types/mainTain.type";
import { server } from "../../../Constants";
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
        console.log(result.data)
        dispatch(setMainTainFTSSuccess(result.data))
    }
    catch (error) {
        console.error(error)
        dispatch(setMainTainFTSFailed())
    }
}

export const addMainTainFTS = (formData: any, navigate: any) => {
    return async (dispatch: any) => {
        try {
            await httpClient.post(server.MAINTAIN_FTS_URL, formData);
            toast.success('เพิ่มข้อมูลเรียบร้อย')
            navigate('/transferstation')
            dispatch(loadMainTainFTS())
        } catch (error) {
            console.error('Error while adding CARRIER:', error);
        }
    };
};

export const deleteMainTainFTS = (id: any, setOpen: any) => {
    return async (dispatch: any) => {
        try {
            await httpClient.delete(`${server.MAINTAIN_FTS_URL}/${id}`)
            setOpen(false)
            dispatch(loadMainTainFTS())
            toast.success('ลบเรียบร้อย')
        } catch (error: any) {
            dispatch(setMainTainFTSFailed())
        }
    };
};