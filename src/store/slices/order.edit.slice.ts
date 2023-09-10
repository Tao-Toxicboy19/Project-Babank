import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { httpClient } from "../../utlis/httpclient"
import { server } from "../../Constants"
import { CargoCrane, CargoCraneEditState } from "../../types/CargoCrane.type"
import { Order, OrderEditState } from "../../types/Order.type"

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
    setOrderEditSuccess: (state, action: PayloadAction<Order>) => {
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

export const updateOrder = (id: any, formData: FormData, setOpen: any) => {
  return async (dispatch: any) => {
    try {
      dispatch(setOrderEditStart());
      const result = await httpClient.put(`${server.ORDER}/${id}`, formData);
      dispatch(setOrderEditSuccess(result.data));
      setOpen(false)
    } catch (error) {
      alert(JSON.stringify(error));
      dispatch(setOrderEditFailure('Failed to update floating data'));
    }
  };
};