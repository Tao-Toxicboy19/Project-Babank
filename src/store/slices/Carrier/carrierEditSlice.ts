import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { SUCCESS, server } from "../../../Constants";
import { httpClient } from "../../../utils/httpclient";
import { toast } from "react-toastify";
import { FieldValues } from "react-hook-form";
import { NavigateFunction } from "react-router-dom";
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

interface CarrierEditState {
    result: Carrier | null
    loading: boolean
    error: boolean
}

const initialState: CarrierEditState = {
    result: null,
    loading: false,
    error: false
}

export const carrierEditAsync = createAsyncThunk(
    'carrierEdit/carrierEditAsync',
    async ({ id, data, navigate, fetch }: { id: string | undefined, data: FieldValues, navigate: NavigateFunction, fetch: () => void }) => {
        try {
            const result = await httpClient.put(`${server.CARRIER}/${id}`, data);
            toast.success(SUCCESS)
            fetch()
            navigate('/carrier')
            return result.data;
        } catch (error) {
            throw error;
        }
    }
)

const carrierEditSlice = createSlice({
    name: 'carrierEdit',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(carrierEditAsync.fulfilled, (state: CarrierEditState, action: PayloadAction<Carrier>) => {
            state.result = action.payload
            state.loading = false
            state.error = false
        });

        builder.addCase(carrierEditAsync.rejected, (state: CarrierEditState) => {
            state.result = null
            state.loading = false
            state.error = true
        });

        builder.addCase(carrierEditAsync.pending, (state: CarrierEditState) => {
            state.result = null
            state.loading = true
            state.error = false
        });
    },
})

export const { } = carrierEditSlice.actions
export const carrierEditSelector = (store: RootState) => store.carrierEditReducer
export default carrierEditSlice.reducer