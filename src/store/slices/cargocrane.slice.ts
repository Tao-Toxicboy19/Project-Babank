// cargoCraneSlice.ts
import { createSlice, PayloadAction, ThunkAction } from '@reduxjs/toolkit';
// import { CargoCrane } from '../../types/CargoCrane.type'; // ปรับเป็นที่อยู่ของ CargoCrane interface ของคุณ
import { server } from '../../Constants';
import { httpClient } from '../../utlis/httpclient';
import { RootState } from '../store';

export interface FTSCraneCargo {
  FTS_name: string;
  work_rate: number;
  consumption_rate: number;
  result: {
    crane_name: string;
    category: string;
    cargo: {
      cargo_name: string
      work_rate: number,
      consumption_rate: number
    }[];
  }[];
}

export interface CargoCraneState {
  cargoCrane: FTSCraneCargo[];
  loading: boolean
  error: string | null
}

const initialState: CargoCraneState = {
  cargoCrane: [],
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
    setCargoCraneSuccess: (state, action: PayloadAction<FTSCraneCargo[]>) => {
      state.cargoCrane = action.payload
      state.loading = false
    },
    setCargoCraneFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload
      state.loading = false
    },
    setInsertCargoCrane: (state, action: PayloadAction<FTSCraneCargo>) => {
      state.cargoCrane.push(action.payload);
    },
    // setUpdateCargoCrane: (state, action: PayloadAction<FTSCraneCargo>) => {
    //   const CargoCraneIndex = state.cargoCrane.findIndex(c => c.cc_id === action.payload.cc_id);
    //   if (CargoCraneIndex !== -1) {
    //     state.cargoCrane[CargoCraneIndex] = action.payload;
    //   }
    // },
    // setDeleteCargoCrane: (state, action: PayloadAction<string>) => {
    //   state.cargoCrane = state.cargoCrane.filter(
    //     (cargoCrane) => cargoCrane.cc_id !== action.payload
    //   );
    // },
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

export const addCargoCrane = (formData: FormData, setOpen: any) => {
  return async () => {
    try {
      await httpClient.post(server.CARGOCRANE, formData);
      alert(JSON.stringify(formData))
      setOpen(false)
    } catch (error) {
      console.error('Error while adding CARRIER:', error);
    }
  };
};

// export const DeleteCargoCrane = (id: string) => {
//   return async (dispatch: any) => {
//     try {
//       await httpClient.delete(`${server.CARGOCRANE}/${id}`)
//       dispatch(setDeleteCargoCrane(id));
//     } catch (error: any) {
//       dispatch(setCargoCraneFailure(error.message));
//     }
//   };
// };