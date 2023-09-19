import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { FTSCrane, FTSEditState } from "../../types/FloatingCrane.type";
import { httpClient } from "../../utlis/httpclient";
import { server } from "../../Constants";


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
        setFTSEditSuccess: (state, action: PayloadAction<FTSCrane>) => {
            state.result = action.payload
            state.loading = false
            state.error = null
        },
        setFTSEditFailure: (state, action: PayloadAction<string>) => {
            state.error = action.payload
            state.loading = false
            state.result = null
        },
    }
})

export const { setFTSEditStart, setFTSEditSuccess, setFTSEditFailure } = FTSEditSlice.actions
export default FTSEditSlice.reducer

export const updateFTS = (formData: FormData, navigate: any, id: any) => {
    return async () => {
        await httpClient.put(`${server.FLOATING}/${id}`, formData)
        alert('Successfully')
        navigate('/transferstation')
    }
}

export const getFTSById = (id: any) => {
    return async (dispatch: any) => {
        try {
            dispatch(setFTSEditStart())
            const result = await httpClient.get(`${server.FLOATING}/${id}`)
            dispatch(setFTSEditSuccess(result.data))
            console.log(result.data)
        }
        catch (error) {
            alert(JSON.stringify(error))
            dispatch(setFTSEditFailure("hello"))
        }
    }
}
