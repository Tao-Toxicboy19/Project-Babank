import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { httpClient } from "../../../utils/httpclient"
import { SUCCESS, server } from "../../../Constants"
import { toast } from "react-toastify"
import { RootState } from "../../store";

interface Cargo {
    cargo_id: number;
    cargo_name: string;
}
interface Crane {
    id: number;
    crane_name: string;
    FTS_id: number;
    setuptime_crane: number;
}

interface Fts {
    id: number;
    FTS_name: string;
    lat: number;
    lng: number;
    setuptime_FTS: number;
    speed: number;
}

interface CargoCrane {
    cargo_crane_id: number
    crane_id: number;
    cargo_id: number;
    FTS_id: number;
    consumption_rate: number;
    work_rate: number;
    category: string;
    crane?: Crane;
    fts?: Fts;
    cargo?: Cargo;
}
interface CargoCraneDeleteState {
    result: CargoCrane | null
    loading: boolean
    error: boolean
}

const initialState: CargoCraneDeleteState = {
    result: null,
    loading: false,
    error: false,
}

export const cargoCraneDeleteAsync = createAsyncThunk(
    'cargoCraneDelete/cargoCraneDeleteAsync',
    async ({ id, handleClose }: { id: any, handleClose: () => void }) => {
        try {
            const result = await httpClient.delete(`${server.CARGOCRANE}/${id}`)
            toast.success(SUCCESS)
            handleClose()
            return result.data;
        } catch (error) {
            throw error;
        }
    }
)

const cargoCraneDeleteSlice = createSlice({
    name: 'cargoCraneDelete',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(cargoCraneDeleteAsync.fulfilled, (state: CargoCraneDeleteState, action: PayloadAction<CargoCrane>) => {
            state.result = action.payload
            state.loading = false
            state.error = false
        });

        builder.addCase(cargoCraneDeleteAsync.rejected, (state: CargoCraneDeleteState) => {
            state.result = null
            state.loading = false
            state.error = true
        });

        builder.addCase(cargoCraneDeleteAsync.pending, (state: CargoCraneDeleteState) => {
            state.result = null
            state.loading = true
            state.error = false
        });
    },
})

export const { } = cargoCraneDeleteSlice.actions
export const cargoCraneDeleteSelector = (store: RootState) => store.cargoCraneDeleteReducer;
export default cargoCraneDeleteSlice.reducer;