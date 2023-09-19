import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { server } from "../../Constants";
import { Crane, CraneState, } from "../../types/crane.type";
import { httpClient } from "../../utlis/httpclient";

const initialState: CraneState = {
    result: [],
    loading: false,
    error: null
}

const CraneSlice = createSlice({
    name: 'Crane',
    initialState,
    reducers: {
        setCraneState: (state) => {
            state.result = [],
                state.loading = true,
                state.error = null
        },
        setCraneSuccess: (state, action: PayloadAction<Crane[]>) => {
            state.result = action.payload,
                state.loading = false,
                state.error = null
        },
        setCraneFailure: (state, action: PayloadAction<string>) => {
            state.result = [],
                state.error = action.payload,
                state.loading = false
        },
        setDeleteCrane: (state, action: PayloadAction<any>) => {
            state.result = state.result.filter(
                (result) => result.crane_id !== action.payload
            )
        },
    }
});

export const { setCraneState, setCraneSuccess, setCraneFailure, setDeleteCrane } = CraneSlice.actions;
export default CraneSlice.reducer;

// const doGetCrane = async (dispatch: any) => {
//     try {
//         const result = await httpClient.get(server.FLOATING);
//         dispatch(setCraneState(result.data));
//     } catch (error: any) {
//         dispatch(setCraneFailure(error.message));
//     }
// };

// export const deleteCrane = (id: any, setOpen: any) => {
//     return async (dispatch: any) => {
//         try {
//             await httpClient.delete(`${server.CRANE}/${id}`);
//             dispatch(setDeleteCrane(id));
//             setOpen(false);
//             await doGetCrane(dispatch);
//         } catch (error: any) {
//             dispatch(setCraneFailure(error.message));
//         }
//     };
// };
