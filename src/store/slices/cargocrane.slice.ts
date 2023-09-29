// cargoCraneSlice.ts
import { createSlice, PayloadAction, ThunkAction } from '@reduxjs/toolkit';
import { server } from '../../Constants';
import { httpClient } from '../../utlis/httpclient';
import { RootState } from '../store';
import { toast } from 'react-toastify';
import { CargoCrane, craneCargoState } from '../../types/CargoCrane.type';

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

export const addCargoCrane = (formData: FormData, naviagte: any) => {
  return async (dispatch: any) => {
    try {
      await httpClient.post(server.CARGOCRANE, formData);
      toast.success('successfully')
      await dispatch(doGetCargoCrane())
      naviagte('/cargocrane')
    } catch (error) {
      toast.warn('มีสินค้าแล้ว')
      naviagte('/cargocrane')
      console.error('Error while adding CARRIER:', error);
    }
  };
};