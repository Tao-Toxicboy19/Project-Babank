import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { httpClient } from "../../../utils/httpclient";
import { SUCCESS, server } from "../../../Constants";
import { toast } from "react-toastify";
import { FieldValues } from "react-hook-form";
import { NavigateFunction } from "react-router-dom";
import { RootState } from "../../store";

interface Result {
    crane_id: number;
    crane_name: string;
    FTS_id: number;
    setuptime_crane: number;
    wage_month_cost: number;
    premium_rate: number;
}

interface FtsCrane {
    fts_id: any;
    FTS_name: string;
    lat: number;
    lng: number;
    setuptime_FTS: number;
    speed: number;
    result: Result[];
}

interface FtsEditState {
    result: FtsCrane | null
    loading: boolean
    error: boolean
}
const initialState: FtsEditState = {
    result: null,
    loading: false,
    error: false
}

export const ftsEditAsync = createAsyncThunk(
    'ftsEdit/ftsEditAsync',
    async ({ id, data, submitting, navigate }: { id: string | undefined, data: FieldValues, submitting: () => void, navigate: NavigateFunction }) => {
        try {
            const result = await httpClient.put(`${server.FLOATING}/${id}`, data)
            submitting()
            toast.success(SUCCESS);
            navigate('/transferstation')
            return result.data;
        } catch (error) {
            throw error;
        }
    }
)

const ftsEditSlice = createSlice({
    name: 'FTSEdit',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(ftsEditAsync.fulfilled, (state: FtsEditState, action: PayloadAction<FtsCrane>) => {
            state.result = action.payload
            state.loading = false
            state.error = false
        });

        builder.addCase(ftsEditAsync.rejected, (state: FtsEditState) => {
            state.result = null
            state.loading = false
            state.error = true
        });

        builder.addCase(ftsEditAsync.pending, (state: FtsEditState) => {
            state.result = null
            state.loading = true
            state.error = false
        });
    },
})

export const { } = ftsEditSlice.actions
export const ftsEditSelector = (store: RootState) => store.ftsEditReducer
export default ftsEditSlice.reducer
// export const { setFTSEditStart, setFTSEditSuccess, setFTSEditFailure } = FTSEditSlice.actions
// export default FTSEditSlice.reducer

// export const updateFTS = (formData: FormData, navigate: any, id: any) => {
//     return async () => {
//         await httpClient.put(`${server.FLOATING}/${id}`, formData)
//         toast.success(SUCCESS)
//         navigate('/transferstation')
//     }
// }

// export const getFTSById = (id: any) => {
//     return async (dispatch: any) => {
//         try {
//             dispatch(setFTSEditStart())
//             const result = await httpClient.get(`${server.FLOATING}/${id}`)
//             await dispatch(setFTSEditSuccess(result.data))
//         }
//         catch (error) {
//             toast.success(JSON.stringify(error))
//             dispatch(setFTSEditFailure("hello"))
//         }
//     }
// }
