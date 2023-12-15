import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { httpClient } from "../../../utils/httpclient"
import { SUCCESS, server } from "../../../Constants"
import { toast } from "react-toastify"
import { RootState } from "../../store";
import { FieldValues } from "react-hook-form";
import { NavigateFunction } from "react-router-dom";

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
interface CargoCraneAddState {
    result: CargoCrane | null
    loading: boolean
    error: boolean
}

const initialState: CargoCraneAddState = {
    result: null,
    loading: false,
    error: false,
}

export const cargoCraneAddAsync = createAsyncThunk(
    'cargoCraneAdd/cargoCraneAddAsync',
    async ({ data, navigate }: { data: FieldValues, navigate: NavigateFunction }) => {
        try {
            const result = await httpClient.post(server.CARGOCRANE, data);
            toast.success(SUCCESS)
            navigate('/cargocrane')
            return result.data;
        } catch (error) {
            throw error;
        }
    }
)

const cargoCraneAddSlice = createSlice({
    name: 'cargoCraneAdd',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(cargoCraneAddAsync.fulfilled, (state: CargoCraneAddState, action: PayloadAction<CargoCrane>) => {
            state.result = action.payload
            state.loading = false
            state.error = false
        });

        builder.addCase(cargoCraneAddAsync.rejected, (state: CargoCraneAddState) => {
            state.result = null
            state.loading = false
            state.error = true
        });

        builder.addCase(cargoCraneAddAsync.pending, (state: CargoCraneAddState) => {
            state.result = null
            state.loading = true
            state.error = false
        });
    },
})

export const { } = cargoCraneAddSlice.actions
export const cargocraneAddSelector = (store: RootState) => store.cargoCraneAddReducer;
export default cargoCraneAddSlice.reducer;
