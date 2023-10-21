import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { httpClient } from "../../../utils/httpclient";
import { Cargo, CargoEditState } from "../../../types/Cargo.type";
import { server } from "../../../Constants";
import { toast } from "react-toastify";

const initialState: CargoEditState = {
  cargo: null,
  loading: false,
  error: null
}

const cargoEditSlice = createSlice({
  name: 'carrieredit',
  initialState,
  reducers: {
    setCargoStart: (state) => {
      state.loading = true
      state.error = null
      state.cargo = null
    },
    setCargoSuccess: (state, action: PayloadAction<Cargo>) => {
      state.cargo = action.payload
      state.loading = false
      state.error = null
    },
    setCargoFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload
      state.loading = false
      state.cargo = null
    },
  }
})

export const { setCargoStart, setCargoSuccess, setCargoFailure } = cargoEditSlice.actions
export default cargoEditSlice.reducer

export const updateCargo = (id: any, formData: FormData, setOpen: any) => {
  return async (dispatch: any) => {
    try {
      dispatch(setCargoStart());
      const result = await httpClient.put(`${server.CARGO}/${id}`, formData);
      dispatch(setCargoSuccess(result.data));
      toast.success('แก้ไข้เรียบร้อย')
      setOpen(false)
    } catch (error) {
      alert(JSON.stringify(error));
      dispatch(setCargoFailure('Failed to update cargo data'));
    }
  };
};