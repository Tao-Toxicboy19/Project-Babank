import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { SUCCESS, server } from "../../../Constants";
import { httpClient } from "../../../utils/httpclient";
import { FieldValues } from "react-hook-form";
import { RootState } from "../../store";
import { NavigateFunction } from "react-router-dom";
import { toast } from "react-toastify";

interface Crane {
    id: number
    crane_name: string;
    FTS_id: number;
    setuptime_crane: number;
}

interface CraneAddState {
    result: Crane | null
    loading: boolean
    error: boolean
}

const initialState: CraneAddState = {
    result: null,
    loading: false,
    error: false
}

export const craneAddAsync = createAsyncThunk(
    'craneAdd/craneAddAsync',
    async ({ data, submitting, navigate }: { data: FieldValues, submitting: () => void, navigate: NavigateFunction }) => {
        try {
            const result = await httpClient.post(server.CRANE, data)
            submitting()
            toast.success(SUCCESS);
            navigate('/transferstation')
            return result.data;
        } catch (error) {
            throw error;
        }
    }
)

const craneAddSlice = createSlice({
    name: 'craneAdd',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(craneAddAsync.fulfilled, (state: CraneAddState, action: PayloadAction<Crane>) => {
            state.result = action.payload
            state.loading = false
            state.error = false
        });

        builder.addCase(craneAddAsync.rejected, (state: CraneAddState) => {
            state.result = null
            state.loading = false
            state.error = true
        });

        builder.addCase(craneAddAsync.pending, (state: CraneAddState) => {
            state.result = null
            state.loading = true
            state.error = false
        });
    },
})

export const { } = craneAddSlice.actions
export const craneAddSelector = (store: RootState) => store.craneAddReducer
export default craneAddSlice.reducer

// export const { setCraneAddState, setcraneAddSuccess, setcraneAddFailure } = craneAddSlice.actions
// export default craneAddSlice.reducer


// export const addCrane = (formData: FieldValues, navigate: any) => {
//     return async (dispatch: any) => {
//         try {
//             await httpClient.post(server.CRANE, formData);
//             toast.success(SUCCESS)
//             navigate('/transferstation')
//         } catch (error) {
//             dispatch(setcraneAddFailure("hello"))
//         }
//     };
// };

// export const getCraneById = (id: any) => {
//     return async (dispatch: any) => {
//         try {
//             dispatch(setCraneAddState())
//             const result = await httpClient.get(`${server.CRANE}/${id}`)
//             dispatch(setcraneAddSuccess(result.data))
//         }
//         catch (error) {
//             alert(JSON.stringify(error))
//             dispatch(setcraneAddFailure("hello"))
//         }
//     }
// }


// export const updateCrane = (formData: FormData, navigate: any, id: any) => {
//     return async () => {
//         await httpClient.put(`${server.CRANE}/${id}`, formData)
//         toast.success(SUCCESS)
//         navigate('/transferstation')
//     }
// }