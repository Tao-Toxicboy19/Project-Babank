import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { Floating } from "../../types/FloatingCrane.type"
import { httpClient } from "../../utlis/httpclient"
import { server } from "../../Constants"

export interface floatingEditState {
    result: Floating | null
    loading: boolean
    error: null | string
}

const initialState: floatingEditState = {
    result: null,
    loading: false,
    error: null,
}

const floatingEditSlice = createSlice({
    name: 'floatingedit',
    initialState,
    reducers: {
        setFloatingEditStart: (state) => {
            state.loading = true
            state.error = null
            state.result = null
        },
        setFloatingEditSuccess: (state, action: PayloadAction<Floating>) => {
            state.result = action.payload
            state.loading = false
            state.error = null
        },
        setFloatingEditFailure: (state, action: PayloadAction<string>) => {
            state.result = null
            state.loading = false
            state.error = action.payload
        },
    }
})

export const { setFloatingEditStart, setFloatingEditSuccess, setFloatingEditFailure } = floatingEditSlice.actions
export default floatingEditSlice.reducer

export const updateFloating = (id: any, formData: FormData, setOpen: any) => {
    return async (dispatch: any) => {
        try {
            dispatch(setFloatingEditStart());
            const result = await httpClient.put(`${server.FLOATING}/${id}`, formData);
            dispatch(setFloatingEditSuccess(result.data));
            alert(JSON.stringify(result.data));
            setOpen(false)
        } catch (error) {
            alert(JSON.stringify(error));
            dispatch(setFloatingEditFailure('Failed to update floating data'));
        }
    };
};


export const getFloatingById = (id: any) => {
    return async (dispatch: any) => {
        try {
            dispatch(setFloatingEditStart())
            const result = await httpClient.get(`${server.FLOATING}/${id}`)
            dispatch(setFloatingEditSuccess(result.data))
        }
        catch (error) {
            alert(JSON.stringify(error))
            dispatch(setFloatingEditFailure('Failed to fetch floating data'))
        }
    }
}