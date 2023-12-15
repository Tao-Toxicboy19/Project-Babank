import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { httpClient } from "../../../utils/httpclient"
import { SUCCESS, server } from "../../../Constants"
import { toast } from "react-toastify"
import { RootState } from "../../store"

interface Cargo {
    cargo_id: number;
    cargo_name: string;
}

interface CargoOrder {
    order_id: number;
    cargo_id: number;
    load: number;
    bulk: number;
    b1: number | null;
    b2: number | null;
    b3: number | null;
    b4: number | null;
    b5: number | null;
    b6: number | null;
    b7: null;
    b8: null;
    b9: null;
    b10: null;
    cargo: Cargo;
}

interface Carrier {
    cr_id: number;
    carrier_name: string;
    holder: string;
    maxcapacity: number;
    burden: number;
    Width: number;
    carrier_max_FTS: number;
    carrier_max_crane: number;
    length: number;
    has_crane: HasCrane | null;
}

enum HasCrane {
    Has = "has",
    No = "no",
}

enum StatusOrder {
    Approved = "Approved",
    Assign = "Assign",
    InPlan = "In Plan",
    Newer = "Newer",
}

interface Orders {
    or_id: number;
    cr_id: number;
    category: string;
    arrival_time: string;
    deadline_time: string;
    latitude: number;
    longitude: number;
    maxFTS: number;
    penalty_rate: number;
    reward_rate: number;
    status_order: StatusOrder;
    rel_start_time: null | string;
    rel_finish_time: null | string;
    reason: null | string;
    group: number;
    carrier: Carrier;
    cargo_order: CargoOrder[];
}

interface orderDeleteState {
    result: Orders | null
    loading: boolean
    error: boolean
}

const initialState: orderDeleteState = {
    result: null,
    loading: false,
    error: false,
}

export const orderDeleteAsync = createAsyncThunk(
    'orderDelete/orderDeleteAsync',
    async (id: number) => {
        try {
            const result = await httpClient.delete(`${server.ORDER}/${id}`)
            toast.success(SUCCESS)
            return result.data
        } catch (error) {
            throw error
        }
    }
)

const orderDeleteSlice = createSlice({
    name: 'orderDelete',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(orderDeleteAsync.fulfilled, (state: orderDeleteState, action: PayloadAction<Orders>) => {
            state.result = action.payload
            state.loading = false
            state.error = false
        });

        builder.addCase(orderDeleteAsync.rejected, (state: orderDeleteState) => {
            state.result = null
            state.loading = false
            state.error = true
        });

        builder.addCase(orderDeleteAsync.pending, (state: orderDeleteState) => {
            state.result = null
            state.loading = true
            state.error = false
        });
    },
})

export const { } = orderDeleteSlice.actions
export const orderDeleteSelector = (store: RootState) => store.orderDeleteReducer
export default orderDeleteSlice.reducer