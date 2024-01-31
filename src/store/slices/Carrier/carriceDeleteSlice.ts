import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { SUCCESS, server } from "../../../Constants";
import { httpClient } from "../../../utils/httpclient";
import { toast } from "react-toastify";
import { RootState } from "../../store";

interface Carrier {
    cr_id: number;
    carrier_name: string;
    holder: string;
    maxcapacity: number;
    burden: number;
    carrier_max_FTS: number;
    carrier_max_crane: number;
    Width: number;
    length: number;
    has_crane: string;
    group: number
}

interface CarrierDeleteState {
    result: Carrier | null
    loading: boolean
    error: boolean
}

const initialState: CarrierDeleteState = {
    result: null,
    loading: false,
    error: false
}

export const carrieDeleteAsync = createAsyncThunk(
    'carrieDelete/carrieDeleteAsync',
    async ({ id, handleClose, fetch }: { id: number, handleClose: () => void, fetch: () => void }) => {
        try {
            const result = await httpClient.delete(`${server.CARRIER}/${id}`)
            toast.success(SUCCESS)
            fetch()
            handleClose()
            return result.data;
        } catch (error) {
            handleClose()
            toast.warning("ไม่สามารถลบได้")
            throw error;
        }
    }
)

const carrieDeleteSlice = createSlice({
    name: 'carrieDelete',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(carrieDeleteAsync.fulfilled, (state: CarrierDeleteState, action: PayloadAction<Carrier>) => {
            state.result = action.payload
            state.loading = false
            state.error = false
        });

        builder.addCase(carrieDeleteAsync.rejected, (state: CarrierDeleteState) => {
            state.result = null
            state.loading = false
            state.error = true
        });

        builder.addCase(carrieDeleteAsync.pending, (state: CarrierDeleteState) => {
            state.result = null
            state.loading = true
            state.error = false
        });
    },
})

export const { } = carrieDeleteSlice.actions
export const carrieDeleteSelector = (store: RootState) => store.carrieDeleteReducer
export default carrieDeleteSlice.reducer