// cargoCraneSlice.ts
import { createSlice, PayloadAction, ThunkAction } from '@reduxjs/toolkit';
import { server, SUCCESS } from '../../../Constants';
import { httpClient } from '../../../utils/httpclient';
import { RootState } from '../../store';
import { toast } from 'react-toastify';
import { CargoCrane, craneCargoState } from '../../../type/CargoCrane.type';

const initialState: craneCargoState = {
  result: [],
  loading: false,
  error: null,
};

const cargoCraneSlice = createSlice({
  name: 'cargoCrane',
  initialState,
  reducers: {
    setCargoCraneStart: (state) => {
      state.loading = true
      state.error = null
    },
    setCargoCraneSuccess: (state, action: PayloadAction<CargoCrane[]>) => {
      state.result = action.payload
      state.loading = false
    },
    setCargoCraneFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload
      state.loading = false
    },
    setInsertCargoCrane: (state, action: PayloadAction<CargoCrane>) => {
      state.result.push(action.payload);
    },
  },
});

export const { setInsertCargoCrane, setCargoCraneFailure, setCargoCraneSuccess, setCargoCraneStart } = cargoCraneSlice.actions;
export default cargoCraneSlice.reducer;

export const loadCargoCrane = (): ThunkAction<void, RootState, unknown, any> => async (dispatch) => {
  try {
    dispatch(setCargoCraneStart())
    const result = await httpClient.get(server.CARGOCRANE)
    dispatch(setCargoCraneSuccess(result.data))
  }
  catch (error) {
    dispatch(setCargoCraneFailure("Failed to fetch CARGO data"))
  }
}

const doGetCargoCrane = () => {
  return async (dispatch: any) => {
    try {
      const result = await httpClient.get(server.CARGOCRANE);
      dispatch(setCargoCraneSuccess(result.data));
    } catch (error: any) {
      dispatch(setCargoCraneFailure(error.message));
    }
  }
};

export const DeleteCargoCrane = (id: any, setOpen: any) => async (dispatch: any) => {
  try {
    await httpClient.delete(`${server.CARGOCRANE}/${id}`)
    await dispatch(doGetCargoCrane())
    setOpen(false);
    toast.success(SUCCESS);
  } catch (error) {
    dispatch(setCargoCraneFailure('error deleting cargo'));

  }
}


export const addCargoCrane = (formData: any, naviagte: any) => {
  return async (dispatch: any) => {
    try {
      await httpClient.post(server.CARGOCRANE, formData);
      toast.success(SUCCESS)
      await dispatch(doGetCargoCrane())
      naviagte('/cargocrane')
    } catch (error) {
      toast.warn('มีสินค้าแล้ว')
      naviagte('/cargocrane')
    }
  };
};