import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { server } from "../../../Constants";
import { httpClient } from "../../../utils/httpclient";
import { RootState } from "../../store";

interface Crane {
    id: number;
    crane_name: string;
    FTS_id: number;
    setuptime_crane: number;
    wage_month_cost: number;
    premium_rate: number;
}

interface MainTain {
    maintain_crane_id: number;
    desc: string;
    downtime: string;
    start_time: string;
    mt_crane_id: number;
    group: number;
    crane: Crane;
}

interface mainTainState {
    loading: boolean
    error: boolean
    result: MainTain[]
}

const initialState: mainTainState = {
    loading: false,
    error: false,
    result: []
}

export const mainTainCraneAsync = createAsyncThunk(
    'mainTainCrane/mainTainCraneAsync',
    async () => {
        try {
            const result = await httpClient.get(server.MAINTAIN_CRAN_URL)
            return result.data;
        } catch (error) {
            throw error;
        }
    }
)

const mainTainCraneSlice = createSlice({
    name: 'mainTainCrane',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(mainTainCraneAsync.fulfilled, (state: mainTainState, action: PayloadAction<MainTain[]>) => {
            state.result = action.payload
            state.loading = false
            state.error = false
        });

        builder.addCase(mainTainCraneAsync.rejected, (state: mainTainState) => {
            state.result = []
            state.loading = false
            state.error = true
        });

        builder.addCase(mainTainCraneAsync.pending, (state: mainTainState) => {
            state.result = []
            state.loading = true
            state.error = false
        });
    },
})

export const { } = mainTainCraneSlice.actions
export const mainTainCraneSelector = (store: RootState) => store.mainTainCraneReducer
export default mainTainCraneSlice.reducer
// export const { setMainTainStart, setMainTainSuccess, setMainTainFailed } = mainTainSlice.actions
// export default mainTainSlice.reducer;

// export const loadMainTainCrane = (): ThunkAction<void, RootState, unknown, any> => async (dispatch) => {
//     try {
//         dispatch(setMainTainStart())
//         const result = await httpClient.get(server.MAINTAIN_CRAN_URL)
//         dispatch(setMainTainSuccess(result.data))
//     }
//     catch (error) {
//         dispatch(setMainTainFailed())
//     }
// }

// export const addMainTainCrane = (formData: any, navigate: any) => {
//     return async (dispatch: any) => {
//         try {
//             await httpClient.post(server.MAINTAIN_CRAN_URL, formData);
//             toast.success(SUCCESS)
//             navigate('/transferstation')
//             dispatch(loadMainTainCrane())
//         } catch (error) {
//             dispatch(setMainTainFailed())
//         }
//     };
// };

// export const deleteMainTainCrane = (id: any, setOpen: any) => {
//     return async (dispatch: any) => {
//         try {
//             await httpClient.delete(`${server.MAINTAIN_CRAN_URL}/${id}`)
//             setOpen(false)
//             dispatch(loadMainTainCrane())
//             toast.success(SUCCESS)
//         } catch (error: any) {
//             dispatch(setMainTainFailed())
//         }
//     };
// };