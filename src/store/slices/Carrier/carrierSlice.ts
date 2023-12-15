import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { server } from "../../../Constants";
import { httpClient } from "../../../utils/httpclient";
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

interface carrierState {
    result: Carrier[]
    loading: boolean
    error: boolean
}

const initialState: carrierState = {
    result: [],
    loading: false,
    error: false
}

export const carrierAsync = createAsyncThunk(
    'carrier/carrierAsync',
    async () => {
        try {
            const result = await httpClient.get(server.CARRIER)
            return result.data;
        } catch (error) {
            throw error;
        }
    }
)

const carrierSlice = createSlice({
    name: 'carrier',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(carrierAsync.fulfilled, (state: carrierState, action: PayloadAction<Carrier[]>) => {
            state.result = action.payload
            state.loading = false
            state.error = false
        });

        builder.addCase(carrierAsync.rejected, (state: carrierState) => {
            state.result = []
            state.loading = false
            state.error = true
        });

        builder.addCase(carrierAsync.pending, (state: carrierState) => {
            state.result = []
            state.loading = true
            state.error = false
        });
    },
})

export const { } = carrierSlice.actions
export const carrierSelector = (store: RootState) => store.carrierReducer
export default carrierSlice.reducer