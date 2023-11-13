import { PayloadAction, ThunkAction, createSlice } from "@reduxjs/toolkit";
import { SUCCESS, server } from "../../../Constants";
import { httpClient } from "../../../utils/httpclient";
import { RootState } from "../../store";
import { Cargo, CargoState } from "../../../types/Cargo.type";
import { toast } from "react-toastify";

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
    setInsertCargo: (state, action: PayloadAction<any>) => {
      state.cargo.push(...action.payload);
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
    dispatch(setCargoSuccess(result.data))
  }
  catch (error) {
    dispatch(setCargoFailure("Failed to fetch CARGO data"))
  }
}

export const addCargo = (values: any, setOpen: any) => {
  return async (dispatch: any) => {
    try {
      await httpClient.post(server.CARGO, values);
      const result = await httpClient.get(server.CARGO)
      dispatch(setCargoSuccess(result.data))
      toast.success(SUCCESS)
      setOpen(false)
    } catch (error) {
      dispatch(setCargoFailure("Failed"));
    }
  };
};

export const deleteCargo = (id: any, setOpen: any) => {
  return async (dispatch: any) => {
    try {
      await httpClient.delete(`${server.CARGO}/${id}`)
      toast.success(SUCCESS)
      dispatch(setDeleteCargo(id));
    } catch (error: any) {
      if (error.response && error.response.status === 500) {
        toast.warn(`
        ไม่สามารถลบข้อมูลได้ เนื่องจากมี 
        ข้อมูลอยู่ที่ ออเดอร์
        `);
        setOpen(false)
      } else {
        dispatch(setCargoFailure(error.message));
      }
    }
  };
};