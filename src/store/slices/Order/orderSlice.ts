// orderSlice.ts
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { server } from '../../../Constants';
import { httpClient } from '../../../utils/httpclient';
import { RootState } from '../../store';

export interface Orders {
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
  cargo_name: CargoName;
  premium_rate: number;
}

export enum CargoName {
  กากถั่ว = "กากถั่ว",
  ถั่วเม็ด = "ถั่วเม็ด",
  ถ่านหิน = "ถ่านหิน",
  มันเส้น = "มันเส้น",
}

export interface Carrier {
  cr_id: number;
  carrier_name: string;
  holder: null | string;
  maxcapacity: number | null;
  burden: number | null;
  Width: number | null;
  carrier_max_FTS: number;
  carrier_max_crane: number | null;
  length: number | null;
  has_crane: HasCrane | null;
}

export enum HasCrane {
  Has = "has",
  No = "no",
}


interface OrderState {
  result: Orders[];
  loading: boolean
  error: boolean
}

const initialState: OrderState = {
  result: [],
  loading: false,
  error: false,
}

export const orderAsync = createAsyncThunk(
  'order/orderAsync',
  async () => {
    try {
      const result = await httpClient.get(`${server.ORDER}`)
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
    builder.addCase(orderAsync.fulfilled, (state: OrderState, action: PayloadAction<Orders[]>) => {
      // state.result = action.payload
      state.result = action.payload.sort((a, b) => {
        // แปลง arrival_time เป็นวัตถุ Date เพื่อเปรียบเทียบ
        const arrivalTimeA = new Date(a.arrival_time);
        const arrivalTimeB = new Date(b.arrival_time);
    
        // เรียงลำดับตาม arrival_time โดยใช้ getTime() เพื่อเปรียบเทียบค่าตัวเลข
        return arrivalTimeB.getTime() - arrivalTimeA.getTime();
      })
      state.loading = false
      state.error = false
    });

    builder.addCase(orderAsync.rejected, (state: OrderState) => {
      state.result = []
      state.loading = false
      state.error = true
    });

    builder.addCase(orderAsync.pending, (state: OrderState) => {
      state.result = []
      state.loading = true
      state.error = false
    });
  },
});

export const { } = orderSlice.actions
export const orderSelector = (store: RootState) => store.orderReducer
export default orderSlice.reducer