import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { httpClient } from "../../../utils/httpclient"
import { SUCCESS, server } from "../../../Constants"
import { toast } from "react-toastify"
import { RootState } from "../../store";
import { FieldValues } from "react-hook-form";
import { NavigateFunction } from "react-router-dom";

interface Cargo {
  cargo_id: number;
  cargo_name: string;
}
interface Crane {
  id: number;
  crane_name: string;
  FTS_id: number;
  setuptime_crane: number;
}

interface Fts {
  id: number;
  FTS_name: string;
  lat: number;
  lng: number;
  setuptime_FTS: number;
  speed: number;
}

interface CargoCrane {
  cargo_crane_id: number
  crane_id: number;
  cargo_id: number;
  FTS_id: number;
  consumption_rate: number;
  work_rate: number;
  category: string;
  crane?: Crane;
  fts?: Fts;
  cargo?: Cargo;
}
interface CargoCraneEditState {
  result: CargoCrane | null
  loading: boolean
  error: boolean
}

const initialState: CargoCraneEditState = {
  result: null,
  loading: false,
  error: false,
}

export const cargoCraneEditAsync = createAsyncThunk(
  'cargoCraneEdit/cargoCraneEditAsync',
  async ({ id, data, navigate }: { id: string | undefined, data: FieldValues, navigate: NavigateFunction }) => {
    try {
      const result = await httpClient.put(`${server.CARGOCRANE}/${id}`, data)
      toast.success(SUCCESS)
      navigate('/cargocrane')
      return result.data;
    } catch (error) {
      throw error;
    }
  }
)

const cargoCraneEditSlice = createSlice({
  name: 'cargoCraneEdit',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(cargoCraneEditAsync.fulfilled, (state: CargoCraneEditState, action: PayloadAction<CargoCrane>) => {
      state.result = action.payload
      state.loading = false
      state.error = false
    });

    builder.addCase(cargoCraneEditAsync.rejected, (state: CargoCraneEditState) => {
      state.result = null
      state.loading = false
      state.error = true
    });

    builder.addCase(cargoCraneEditAsync.pending, (state: CargoCraneEditState) => {
      state.result = null
      state.loading = true
      state.error = false
    });
  },
})

export const { } = cargoCraneEditSlice.actions
export const cargocraneEditSelector = (store: RootState) => store.cargoCraneEditReducer;
export default cargoCraneEditSlice.reducer;

// export const { setCargoCraneEditStart, setCargoCraneEditSuccess, setCargoCraneEditFailure } = cargocraneEditSlice.actions
// export default cargocraneEditSlice.reducer

// export const updateCargoCrane = (id: any, formData: any, navigate: any) => {
//   return async (dispatch: any) => {
//     try {
//       dispatch(setCargoCraneEditStart());
//       const result = await httpClient.put(`${server.CARGOCRANE}/${id}`, formData);
//       dispatch(setCargoCraneEditSuccess(result.data));
//       toast.success(SUCCESS)
//       navigate('/cargocrane')
//     } catch (error) {
//       toast.warn('เกิดข้อผิดพลาด');
//       dispatch(setCargoCraneEditFailure('Failed to update floating data'));
//     }
//   };
// };
