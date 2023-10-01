import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { httpClient } from "../../utlis/httpclient"
import { server } from "../../Constants"
import { Orders, OrderEditState } from "../../types/Order.type"

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
      const result = await httpClient.put(`${server.ORDER}/${id}`, values);
      dispatch(setOrderEditSuccess(result.data));
      navigate('/orders/cargo/edit')
    } catch (error) {
      alert(JSON.stringify(error));
      dispatch(setOrderEditFailure('Failed to update floating data'));
    } finally {
      setTimeout(() => {
        setIsSubmitting(false);
      }, 2000);
    }
  };
};
