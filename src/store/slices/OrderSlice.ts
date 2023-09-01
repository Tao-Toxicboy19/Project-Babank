// orderSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Order, OrderState } from '../../types/Order.type';

const initialState: OrderState = {
  orders: [],
  loading: false,
  error: null,
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setOrderStart: (state) => {
      state.loading = true
      state.error = null
    },
    setOrderSuccess: (state, action: PayloadAction<Order[]>) => {
      state.orders = action.payload
      state.loading = false
    },
    setOrdersFailure: (state, action: PayloadAction<string>) => {
      state.loading = false
      state.error = action.payload
    },
    setInsertOrder: (state, action: PayloadAction<Order>) => {
      state.orders.push(action.payload)
    },
    setUpdateOrder: (state, action: PayloadAction<Order>) => {
      const orderIndex = state.orders.findIndex(order => order.order_id === action.payload.order_id);
      if (orderIndex !== -1) {
        state.orders[orderIndex] = action.payload;
      }
    },
    setDeleteOrder: (state, action: PayloadAction<string>) => {
      state.orders = state.orders.filter(
        (orders) => orders.order_id !== action.payload
      );
    },
  },
});

export const { setOrderStart, setOrderSuccess, setOrdersFailure, setInsertOrder, setUpdateOrder, setDeleteOrder } = orderSlice.actions;
export default orderSlice.reducer;
