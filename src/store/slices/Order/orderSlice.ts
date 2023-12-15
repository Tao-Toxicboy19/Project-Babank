// orderSlice.ts
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { server, SUCCESS } from '../../../Constants';
import { httpClient } from '../../../utils/httpclient';
import { RootState } from '../../store';
import { toast } from 'react-toastify';

interface Cargo {
  cargo_id: number;
  cargo_name: string;
}

interface CargoOrder {
  order_id: number
  cargo_id: number
  load: number
  bulk: number
  b1: number | null
  b2: number | null
  b3: number | null
  b4: number | null
  b5: number | null
  b6: number | null
  b7: null
  b8: null
  b9: null
  b10: null
  cargo: Cargo
}

interface Carrier {
  cr_id: number
  carrier_name: string
  holder: string
  maxcapacity: number
  burden: number
  Width: number
  carrier_max_FTS: number
  carrier_max_crane: number
  length: number
  has_crane: HasCrane | null
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
      const result = await httpClient.get(server.ORDER)
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
      state.result = action.payload
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

// export const { setOrderStart, setOrderSuccess, setOrdersFailure, setInsertOrder, setUpdateOrder } = orderSlice.actions;
// export default orderSlice.reducer;

// export const loadOrder = (): ThunkAction<void, RootState, unknown, any> => async (dispatch) => {
//   try {
//     dispatch(setOrderStart())
//     const result = await httpClient.get(server.ORDER)
//     dispatch(setOrderSuccess(result.data))
//   }
//   catch (error) {
//     dispatch(setOrdersFailure())
//   }
// }

// export const addOrder = (formattedValues: any, navigate: any) => {
//   return async (dispatch: any) => {
//     try {
//       await httpClient.post(server.ORDER, formattedValues);
//       await dispatch(loadOrder())
//       navigate('/orders/create/cargo')
//     } catch (error: any) {
//       dispatch(setOrdersFailure(error.message));
//     }
//   };
// };

// export const deleteOrder = (id: any, setOpen: any) => {
//   return async (dispatch: any) => {
//     try {
//       await httpClient.delete(`${server.ORDER}/${id}`)
//       await dispatch(loadOrder())
//       toast.success(SUCCESS)
//       setOpen(false)
//     } catch (error: any) {
//       dispatch(setOrdersFailure(error.message));
//     }
//   };
// };


// export const updateStatus = (id: number, setIsSubmitting: any, data: FieldValues, handleClose: () => void) => {
//   return async (dispatch: any) => {
//     try {
//       await httpClient.patch(`${server.UPDATESTATUS}/${id}`, data);
//       await dispatch(loadOrder());
//       toast.success(SUCCESS);
//       handleClose();
//     } catch (error: any) {
//       if (error.response && error.response.status === 500) {
//         toast.warn(Failure);
//         setIsSubmitting(false);
//       }
//       dispatch(setOrdersFailure());
//       setIsSubmitting(false);
//     }
//   };
// };