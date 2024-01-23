import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { httpClient } from "../../../utils/httpclient"
import { SUCCESS, server } from "../../../Constants"
import { toast } from "react-toastify"
import { RootState } from "../../store"
import { NavigateFunction } from "react-router-dom"

export interface OrdersEdit {
  or_id: number;
  cr_id: number;
  category: string;
  arrival_time: any;
  deadline_time: any;
  latitude: number;
  longitude: number;
  maxFTS: number;
  penalty_rate: number;
  reward_rate: number;
  status_order: string;
  rel_start_time: null;
  rel_finish_time: null;
  reason: null;
  group: number;
  carrier: Carrier;
  cargo_order: CargoOrder;
}

export interface CargoOrder {
  order_id: number;
  cargo_id: number;
  load: number;
  bulk: number;
  group: number;
  cargo: Cargo;
  Bulks: Bulk[];
}

export interface Bulk {
  id: number;
  load_bulk: number;
  cargo_orderOrder_id: number;
  group: number;
}

export interface Cargo {
  cargo_id: number;
  cargo_name: string;
  premium_rate: number;
}

export interface Carrier {
  cr_id: number;
  carrier_name: string;
  holder: string;
  maxcapacity: number;
  burden: number;
  Width: number;
  carrier_max_FTS: number;
  carrier_max_crane: number;
  length: number;
  has_crane: null;
}


interface OrderEditState {
  result: OrdersEdit | null
  loading: boolean
  error: boolean
}

const initialState: OrderEditState = {
  result: null,
  loading: false,
  error: false,
}

export const orderEditAsync = createAsyncThunk(
  'orderEdit/orderEditAsync',
  async ({ id, values, navigate, fetch }: { id: string | undefined, values: any, navigate: NavigateFunction, fetch: () => void }) => {
    try {
      const result = await httpClient.patch(`${server.ORDER}/${id}`, values)
      toast.success(SUCCESS)
      fetch()
      navigate('/orders')
      return result.data
    } catch (error) {
      throw error
    }
  }
)

const orderEditSlice = createSlice({
  name: 'orderedit',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(orderEditAsync.fulfilled, (state: OrderEditState, action: PayloadAction<OrdersEdit>) => {
      state.result = action.payload
      state.loading = false
      state.error = false
    });

    builder.addCase(orderEditAsync.rejected, (state: OrderEditState) => {
      state.result = null
      state.loading = false
      state.error = true
    });

    builder.addCase(orderEditAsync.pending, (state: OrderEditState) => {
      state.result = null
      state.loading = true
      state.error = false
    });
  },
})

export const { } = orderEditSlice.actions
export const orderEditSelector = (store: RootState) => store.orderEditReducer
export default orderEditSlice.reducer