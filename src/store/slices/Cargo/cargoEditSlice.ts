import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { httpClient } from "../../../utils/httpclient";
import { SUCCESS, server } from "../../../Constants";
import { toast } from "react-toastify";
import { RootState } from "../../store";


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
  async ({ id, values, handleClose }: { id: number, values: FormData, handleClose: () => void }) => {
    try {
      const result = await httpClient.put(`${server.CARGO}/${id}`, values);
      toast.success(SUCCESS)
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
export const cargoEditSelector = (store: RootState) => store.cargoEditReducer;
export default cargoEditSlice.reducer;

// export const { setCargoStart, setCargoSuccess, setCargoFailure } = cargoEditSlice.actions
// export default cargoEditSlice.reducer

// export const updateCargo = (id: any, formData: FormData, setOpen: any) => {
//   return async (dispatch: any) => {
//     try {
//       dispatch(setCargoStart());
//       const result = await httpClient.put(`${server.CARGO}/${id}`, formData);
//       dispatch(setCargoSuccess(result.data));
//       toast.success(SUCCESS)
//       setOpen(false)
//     } catch (error) {
//       alert(JSON.stringify(error));
//       dispatch(setCargoFailure('Failed to update cargo data'));
//     }
//   };
// };