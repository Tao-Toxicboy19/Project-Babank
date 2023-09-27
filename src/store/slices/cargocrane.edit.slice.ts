import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { httpClient } from "../../utlis/httpclient"
import { server } from "../../Constants"
import { CargoCrane, CargoCraneEditState } from "../../types/CargoCrane.type"
import { toast } from "react-toastify"

const initialState: CargoCraneEditState = {
  result: null,
  loading: false,
  error: null,
}

const cargocraneEditSlice = createSlice({
  name: 'cargocraneedit',
  initialState,
  reducers: {
    setCargoCraneEditStart: (state) => {
      state.loading = true
      state.error = null
      state.result = null
    },
    setCargoCraneEditSuccess: (state, action: PayloadAction<CargoCrane>) => {
      state.result = action.payload
      state.loading = false
      state.error = null
    },
    setCargoCraneEditFailure: (state, action: PayloadAction<string>) => {
      state.result = null
      state.loading = false
      state.error = action.payload
    },
  }
})

export const { setCargoCraneEditStart, setCargoCraneEditSuccess, setCargoCraneEditFailure } = cargocraneEditSlice.actions
export default cargocraneEditSlice.reducer

export const updateCargoCrane = (id: any, formData: FormData, setOpen: any) => {
  return async (dispatch: any) => {
    try {
      dispatch(setCargoCraneEditStart());
      const result = await httpClient.put(`${server.CARGOCRANE}/${id}`, formData);
      dispatch(setCargoCraneEditSuccess(result.data));
      setOpen(false)
    } catch (error) {
      toast.success(JSON.stringify(error));
      dispatch(setCargoCraneEditFailure('Failed to update floating data'));
    }
  };
};