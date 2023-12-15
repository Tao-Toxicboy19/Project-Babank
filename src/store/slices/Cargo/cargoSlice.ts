import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { server } from "../../../Constants";
import { httpClient } from "../../../utils/httpclient";
import { RootState } from "../../store";

interface Cargo {
  cargo_id?: number
  cargo_name: string
  premium_rate: number
}

interface CargoState {
  result: Cargo[]
  loading: boolean
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
export const cargoSelector = (store: RootState) => store.cargoReducer
export default cargoSlice.reducer