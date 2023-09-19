import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { server } from "../../Constants";
import { Crane, CraneEditState, } from "../../types/crane.type";
import { httpClient } from "../../utlis/httpclient";

const initialState: CraneEditState = {
    result: null,
    loading: false,
    error: null
}

const CraneSlice = createSlice({
    name: 'Crane',
    initialState,
    reducers: {
        setCraneEditState: (state) => {
            state.result = null
            state.loading = true
            state.error = null
        },
        setCraneEditSuccess: (state, action: PayloadAction<Crane>) => {
            state.result = action.payload
            state.loading = false
            state.error = null
        },
        setCraneEditFailure: (state, action: PayloadAction<string>) => {
            state.result = null
            state.error = action.payload
            state.loading = false
        },
    }
})

export const { setCraneEditState, setCraneEditSuccess, setCraneEditFailure } = CraneSlice.actions
export default CraneSlice.reducer


export const addCrane = (formData: FormData, navigate: any) => {
    return async () => {
        try {
            await httpClient.post(server.CRANE, formData);
            alert('Successfully')
            navigate('/transferstation')
        } catch (error) {
            console.error('Error while adding CARRIER:', error);
        }
    };
};

export const updateCrane = (formData: FormData, navigate: any, id: any) => {
    return async () => {
        await httpClient.put(`${server.CRANE}/${id}`, formData)
        alert('Successfully')
        navigate('/transferstation')
    }
}

export const getCraneById = (id: any) => {
    return async (dispatch: any) => {
        try {
            dispatch(setCraneEditState())
            const result = await httpClient.get(`${server.CRANE}/${id}`)
            dispatch(setCraneEditSuccess(result.data))
            console.log(result.data)
        }
        catch (error) {
            alert(JSON.stringify(error))
            dispatch(setCraneEditFailure("hello"))
        }
    }
}