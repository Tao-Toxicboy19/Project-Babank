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

interface CarrierAddState {
    result: Carrier | null
    loading: boolean
    error: boolean
}

const initialState: CarrierAddState = {
    result: null,
    loading: false,
    error: false
}

export const carrierAddAsync = createAsyncThunk(
    'carrierAdd/carrierAddAsync',
    async ({ values, navigate, handleClose, fetch }: { values: FieldValues, navigate: NavigateFunction, handleClose?: () => void, fetch?: () => void }) => {
        try {
            const result = await httpClient.post(server.CARRIER, values);
            toast.success(SUCCESS)
            if (handleClose && fetch) {
                fetch()
                handleClose()
            }
            else {
                navigate('/carrier')
            }
            return result.data;
        } catch (error) {
            throw error;
        }
    }
)

const carrierAddSlice = createSlice({
    name: 'carrierAdd',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(carrierAddAsync.fulfilled, (state: CarrierAddState, action: PayloadAction<Carrier>) => {
            state.result = action.payload
            state.loading = false
            state.error = false
        });

        builder.addCase(carrierAddAsync.rejected, (state: CarrierAddState) => {
            state.result = null
            state.loading = false
            state.error = true
        });

        builder.addCase(carrierAddAsync.pending, (state: CarrierAddState) => {
            state.result = null
            state.loading = true
            state.error = false
        });
    },
})

export const { } = carrierAddSlice.actions
export const carrierAddSelector = (store: RootState) => store.carrierAddReducer
export default carrierAddSlice.reducer