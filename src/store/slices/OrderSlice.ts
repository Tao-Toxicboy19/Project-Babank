// orderSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Order, OrderState } from '../../types/Order.type';

const initialState: OrderState = {
  orders: [],
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setOrders: (state, action: PayloadAction<Order[]>) => {
      state.orders = action.payload;
    },
    addOrder: (state, action: PayloadAction<Order>) => {
      state.orders.push(action.payload)
    }
  },
});

export const { setOrders, addOrder } = orderSlice.actions;
export default orderSlice.reducer;
