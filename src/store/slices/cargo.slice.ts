import { PayloadAction, ThunkAction, createSlice } from "@reduxjs/toolkit";
import { server } from "../../Constants";
import { httpClient } from "../../utlis/httpclient";
import { RootState } from "../store";
import { Cargo, CargoState } from "../../types/Cargo.type";

const initialState: CargoState = {
  cargo: [],
  loading: false,
  error: null
}

const cargoSlice = createSlice({
  name: 'carrier',
  initialState,
  reducers: {
    setCargoStart: (state) => {
      state.loading = true
      state.error = null
      state.cargo = []
    },
    setCargoSuccess: (state, action: PayloadAction<Cargo[]>) => {
      state.cargo = action.payload
      state.loading = false
      state.error = null
    },
    setCargoFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload
      state.loading = false
      state.cargo = []
    },
    setInsertCargo: (state, action: PayloadAction<Cargo>) => {
      state.cargo.push(action.payload)
      state.loading = false
      state.error = null
    },
    setUpdateCargo: (state, action: PayloadAction<Cargo>) => {
      const carrierIndex = state.cargo.findIndex(cargo => cargo.cargo_id === action.payload.cargo_id);
      if (carrierIndex !== -1) {
        state.cargo[carrierIndex] = action.payload
        state.loading = false
        state.error = null
      }
    },
    setDeleteCargo: (state, action: PayloadAction<any>) => {
      state.cargo = state.cargo.filter(
        (carrier) => carrier.cargo_id !== action.payload
      )
    },
  }
})

export const { setCargoStart, setCargoSuccess, setCargoFailure, setInsertCargo, setUpdateCargo, setDeleteCargo } = cargoSlice.actions
export default cargoSlice.reducer

export const loadCargo = (): ThunkAction<void, RootState, unknown, any> => async (dispatch) => {
  try {
    dispatch(setCargoStart())
    const result = await httpClient.get(server.CARGO)
    setTimeout(() => {
      dispatch(setCargoSuccess(result.data))
    }, 1500);
  }
  catch (error) {
    dispatch(setCargoFailure("Failed to fetch CARGO data"))
  }
}

export const addCargo = (formData: FormData, setOpen: any) => {
  return async () => {
    try {
      await httpClient.post(server.CARGO, formData);
      setOpen(false)
    } catch (error) {
      console.error('Error while adding CARRIER:', error);
    }
  };
};

export const deleteCargo = (id: any) => {
  return async (dispatch: any) => {
    try {
      await httpClient.delete(`${server.CARGO}/${id}`)
      dispatch(setDeleteCargo(id));
    } catch (error: any) {
      dispatch(setCargoFailure(error.message));
    }
  };
};