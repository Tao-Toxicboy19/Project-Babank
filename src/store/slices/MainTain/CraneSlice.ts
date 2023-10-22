import { createSlice, PayloadAction, ThunkAction } from "@reduxjs/toolkit";
import { MainTain } from "../../../types/mainTain.type";
import { server } from "../../../Constants";
import { httpClient } from "../../../utils/httpclient";
import { RootState } from "../../store";
import { toast } from "react-toastify";


interface mainTainState {
    loading: boolean
    error: boolean
    data: MainTain[]
}

const initialState: mainTainState = {
    loading: false,
    error: false,
    data: []
}

const mainTainSlice = createSlice({
    name: 'MainTain',
    initialState,
    reducers: {
        setMainTainStart(state) {
            state.data = []
            state.loading = true
            state.error = false
        },
        setMainTainSuccess(state, action: PayloadAction<MainTain[]>) {
            state.data = action.payload
            state.loading = false
            state.error = false
        },
        setMainTainFailed(state) {
            state.data = []
            state.error = true
            state.loading = false
        },
    }
})

export const { setMainTainStart, setMainTainSuccess, setMainTainFailed } = mainTainSlice.actions
export default mainTainSlice.reducer;

export const loadMainTainCrane = (): ThunkAction<void, RootState, unknown, any> => async (dispatch) => {
    try {
        dispatch(setMainTainStart())
        const result = await httpClient.get(server.MAINTAIN_CRAN_URL)
        dispatch(setMainTainSuccess(result.data))
    }
    catch (error) {
        dispatch(setMainTainFailed())
    }
}

export const addMainTainCrane = (formData: any, navigate: any) => {
    return async (dispatch: any) => {
        try {
            await httpClient.post(server.MAINTAIN_CRAN_URL, formData);
            toast.success('เพิ่มข้อมูลเรียบร้อย')
            navigate('/transferstation')
            dispatch(loadMainTainCrane())
        } catch (error) {
            console.error('Error while adding CARRIER:', error);
        }
    };
};

export const deleteMainTainCrane = (id: any, setOpen: any) => {
    return async (dispatch: any) => {
        try {
            await httpClient.delete(`${server.MAINTAIN_CRAN_URL}/${id}`)
            setOpen(false)
            dispatch(loadMainTainCrane())
            toast.success('ลบเรียบร้อย')
        } catch (error: any) {
            dispatch(setMainTainFailed())
        }
    };
};