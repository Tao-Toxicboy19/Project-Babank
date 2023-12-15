import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { server } from "../../../Constants";
import { httpClient } from "../../../utils/httpclient";
import { RootState } from "../../store";

interface Cargo {
  cargo_id?: number;
  cargo_name: string;
}

interface CargoState {
  result: Cargo[];
  loading: boolean;
  error: boolean
}

const initialState: CargoState = {
  result: [],
  loading: false,
  error: false
}

export const cargoAsync = createAsyncThunk(
  'cargo/cargoAsync',
  async () => {
    try {
      const result = await httpClient.get(server.CARGO)
      return result.data;
    } catch (error) {
      throw error;
    }
  }
)

const cargoSlice = createSlice({
  name: 'cargo',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(cargoAsync.fulfilled, (state: CargoState, action: PayloadAction<Cargo[]>) => {
      state.result = action.payload
      state.loading = false
      state.error = false
    });

    builder.addCase(cargoAsync.rejected, (state: CargoState) => {
      state.result = []
      state.loading = false
      state.error = true
    });

    builder.addCase(cargoAsync.pending, (state: CargoState) => {
      state.result = []
      state.loading = true
      state.error = false
    });
  },
})

export const { } = cargoSlice.actions
export const cargoSelector = (store: RootState) => store.cargoReducer;
export default cargoSlice.reducer;

// export const { setCargoStart, setCargoSuccess, setCargoFailure, setInsertCargo, setUpdateCargo, setDeleteCargo } = cargoSlice.actions
// export default cargoSlice.reducer

// export const loadCargo = (): ThunkAction<void, RootState, unknown, any> => async (dispatch) => {
//   try {
//     dispatch(setCargoStart())
//     const result = await httpClient.get(server.CARGO)
//     dispatch(setCargoSuccess(result.data))
//   }
//   catch (error) {
//     dispatch(setCargoFailure("Failed to fetch CARGO data"))
//   }
// }

// export const addCargo = (values: any, setOpen: any) => {
//   return async (dispatch: any) => {
//     try {
//       await httpClient.post(server.CARGO, values);
//       const result = await httpClient.get(server.CARGO)
//       dispatch(setCargoSuccess(result.data))
//       toast.success(SUCCESS)
//       setOpen(false)
//     } catch (error) {
//       dispatch(setCargoFailure("Failed"));
//     }
//   };
// };

// export const deleteCargo = (id: any, setOpen: any) => {
//   return async (dispatch: any) => {
//     try {
//       await httpClient.delete(`${server.CARGO}/${id}`)
//       toast.success(SUCCESS)
//       dispatch(setDeleteCargo(id));
//     } catch (error: any) {
//       if (error.response && error.response.status === 500) {
//         toast.warn(`
//         ไม่สามารถลบข้อมูลได้ เนื่องจากมี
//         ข้อมูลอยู่ที่ ออเดอร์
//         `);
//         setOpen(false)
//       } else {
//         dispatch(setCargoFailure(error.message));
//       }
//     }
//   };
// };