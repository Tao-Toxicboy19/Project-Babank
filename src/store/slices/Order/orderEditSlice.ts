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

interface OrderEditState {
  result: Orders | null
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
  async ({ id, values }: { id: string | undefined, values: any }) => {
    try {
      const result = await httpClient.patch(`${server.ORDER}/${id}`, values)
      toast.success(SUCCESS)
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
    builder.addCase(orderEditAsync.fulfilled, (state: OrderEditState, action: PayloadAction<Orders>) => {
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