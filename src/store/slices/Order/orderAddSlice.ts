import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { httpClient } from "../../../utils/httpclient"
import { SUCCESS, server } from "../../../Constants"
import { toast } from "react-toastify"
import { RootState } from "../../store"
import { NavigateFunction } from "react-router-dom"

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

interface OrderAddState {
    result: Orders | null
    loading: boolean
    error: boolean
}

const initialState: OrderAddState = {
    result: null,
    loading: false,
    error: false,
}

export const orderAddAsync = createAsyncThunk(
    'order/orderAddAsync',
    async ({ values, navigate, fetch }: { values: any, navigate: NavigateFunction, fetch: () => void }) => {
        try {
            const result = await httpClient.post(server.ORDER, values)
            toast.success(SUCCESS)
            fetch()
            navigate('/orders')
            return result.data
        } catch (error) {
            throw error
        }
    }
)

const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(orderAddAsync.fulfilled, (state: OrderAddState, action: PayloadAction<Orders>) => {
            state.result = action.payload
            state.loading = false
            state.error = false
        });

        builder.addCase(orderAddAsync.rejected, (state: OrderAddState) => {
            state.result = null
            state.loading = false
            state.error = true
        });

        builder.addCase(orderAddAsync.pending, (state: OrderAddState) => {
            state.result = null
            state.loading = true
            state.error = false
        });
    },
})

export const { } = orderSlice.actions
export const orderSelector = (store: RootState) => store.orderReducer
export default orderSlice.reducer