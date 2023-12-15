import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { httpClient } from "../../../utils/httpclient";
import { SUCCESS, server } from "../../../Constants";
import { toast } from "react-toastify";
import { RootState } from "../../store";
import { FieldValues } from "react-hook-form";


interface Cargo {
  cargo_id?: number;
  cargo_name: string;
}

interface CargoEditState {
  result: Cargo | null
  loading: boolean
  error: boolean
}

const initialState: CargoEditState = {
  result: null,
  loading: false,
  error: false
}

export const cargoEditAsync = createAsyncThunk(
  'cargoEdit/cargoEditAsync',
  async ({ id, data, handleClose, fetch }: { id: number, data: FieldValues, handleClose: () => void, fetch: () => void }) => {
    try {
      const result = await httpClient.put(`${server.CARGO}/${id}`, data);
      toast.success(SUCCESS)
      fetch()
      handleClose()
      return result.data;
    } catch (error) {
      throw error;
    }
  }
)

const cargoEditSlice = createSlice({
  name: 'carrieredit',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(cargoEditAsync.fulfilled, (state: CargoEditState, action: PayloadAction<Cargo>) => {
      state.result = action.payload
      state.loading = false
      state.error = false
    });

    builder.addCase(cargoEditAsync.rejected, (state: CargoEditState) => {
      state.result = null
      state.loading = false
      state.error = true
    });

    builder.addCase(cargoEditAsync.pending, (state: CargoEditState) => {
      state.result = null
      state.loading = true
      state.error = false
    });
  },
})

export const { } = cargoEditSlice.actions
export const cargoEditSelector = (store: RootState) => store.cargoEditReducer
export default cargoEditSlice.reducer