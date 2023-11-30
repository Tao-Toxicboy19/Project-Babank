import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { FTSEditState } from "../../../type/FloatingCrane.type";
import { httpClient } from "../../../utils/httpclient";
import { SUCCESS, server } from "../../../Constants";
import { toast } from "react-toastify";


const initialState: FTSEditState = {
    result: null,
    loading: false,
    error: null
}

const FTSEditSlice = createSlice({
    name: 'FTSEdit',
    initialState,
    reducers: {
        setFTSEditStart: (state) => {
            state.loading = true
            state.error = null
            state.result = null
        },
        setFTSEditSuccess: (state, action: PayloadAction<any>) => {
            state.result = action.payload;
            state.loading = false;
            state.error = null;
        },

        setFTSEditFailure: (state, action: PayloadAction<string>) => {
            state.result = null;
            state.error = action.payload;
            state.loading = false;
        },
    }
})

export const { setFTSEditStart, setFTSEditSuccess, setFTSEditFailure } = FTSEditSlice.actions
export default FTSEditSlice.reducer

export const updateFTS = (formData: FormData, navigate: any, id: any) => {
    return async () => {
        await httpClient.put(`${server.FLOATING}/${id}`, formData)
        toast.success(SUCCESS)
        navigate('/transferstation')
    }
}

export const getFTSById = (id: any) => {
    return async (dispatch: any) => {
        try {
            dispatch(setFTSEditStart())
            const result = await httpClient.get(`${server.FLOATING}/${id}`)
            await dispatch(setFTSEditSuccess(result.data))
        }
        catch (error) {
            toast.success(JSON.stringify(error))
            dispatch(setFTSEditFailure("hello"))
        }
    }
}
