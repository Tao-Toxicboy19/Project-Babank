import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { httpClient } from "../../../utils/httpclient"
import { SUCCESS, server } from "../../../Constants"
import { Orders, OrderEditState } from "../../../types/Order.type"
import { loadOrder } from "./order.slice"
import { toast } from "react-toastify"

const initialState: OrderEditState = {
  result: null,
  loading: false,
  error: null,
}

const orderEditSlice = createSlice({
  name: 'orderedit',
  initialState,
  reducers: {
    setOrderEditStart: (state) => {
      state.loading = true
      state.error = null
      state.result = null
    },
    setOrderEditSuccess: (state, action: PayloadAction<Orders>) => {
      state.result = action.payload
      state.loading = false
      state.error = null
    },
    setOrderEditFailure: (state, action: PayloadAction<string>) => {
      state.result = null
      state.loading = false
      state.error = action.payload
    },
  }
})

export const { setOrderEditStart, setOrderEditSuccess, setOrderEditFailure } = orderEditSlice.actions
export default orderEditSlice.reducer

export const updateOrder = (id: any, values: any, navigate: any, setIsSubmitting: any) => {
  return async (dispatch: any) => {
    try {
      setIsSubmitting(true);
      dispatch(setOrderEditStart());
      const result = await httpClient.patch(`${server.ORDER}/${id}`, values);
      dispatch(loadOrder())
      dispatch(setOrderEditSuccess(result.data));
      toast.success(SUCCESS)
      navigate(`/orders`)
    } catch (error) {
      dispatch(setOrderEditFailure('Failed to update floating data'));
    }
  };
};
