// orderSlice.ts
import { createSlice, PayloadAction, ThunkAction } from '@reduxjs/toolkit';
import { Order, OrderState } from '../../types/Order.type';
import { server } from '../../Constants';
import { httpClient } from '../../utlis/httpclient';
import { RootState } from '../store';

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
      const orderIndex = state.orders.findIndex(order => order.or_id === action.payload.or_id);
      if (orderIndex !== -1) {
        state.orders[orderIndex] = action.payload;
      }
    },
  },
});

export const { setOrderStart, setOrderSuccess, setOrdersFailure, setInsertOrder, setUpdateOrder } = orderSlice.actions;
export default orderSlice.reducer;

export const loadOrder = (): ThunkAction<void, RootState, unknown, any> => async (dispatch) => {
  try {
    dispatch(setOrderStart())
    const result = await httpClient.get(server.ORDER)
    dispatch(setOrderSuccess(result.data))
  }
  catch (error) {
    dispatch(setOrdersFailure("Failed to fetch CARRIER data"))
  }
}

export const addOrder = (formData: FormData, setOpen: any) => {
  return async () => {
    try {
      await httpClient.post(server.ORDER, formData);
      setOpen(false)
    } catch (error) {
      console.error('Error while adding CARRIER:', error);
    }
  };
};

// export const deleteOrder = (id: string) => {
//   return async (dispatch: any) => {
//     try {
//       await httpClient.delete(`${server.ORDER}${id}`)
//       dispatch(setDeleteOrder(id));
//     } catch (error: any) {
//       dispatch(setOrdersFailure(error.message));
//     }
//   };
// };