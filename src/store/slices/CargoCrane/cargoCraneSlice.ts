// cargoCraneSlice.ts
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { server } from '../../../Constants';
import { httpClient } from '../../../utils/httpclient';
import { RootState } from '../../store';

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

interface craneCargoState {
  result: CargoCrane[]
  where_fts_id: CargoCrane[]
  loading: boolean
  error: boolean
}

const initialState: craneCargoState = {
  result: [],
  where_fts_id: [],
  loading: false,
  error: false,
};


export const cargoCraneAsync = createAsyncThunk(
  'cargoCrane/cargoCraneAsync',
  async () => {
    try {
      const result = await httpClient.get(server.CARGOCRANE)
      return result.data;
    } catch (error) {
      throw error;
    }
  }
)

const cargoCraneSlice = createSlice({
  name: 'cargoCrane',
  initialState,
  reducers: {
    setWherFTSId(state: craneCargoState, action: PayloadAction<number>) {
      // console.log(action.payload)
      // console.log(state.result.filter(i => i.FTS_id === action.payload))
      state.where_fts_id = state.result.filter(i => i.FTS_id === action.payload)
    }
  },
  extraReducers: (builder) => {
    builder.addCase(cargoCraneAsync.fulfilled, (state: craneCargoState, action: PayloadAction<CargoCrane[]>) => {
      state.result = action.payload
      state.loading = false
      state.error = false
    });

    builder.addCase(cargoCraneAsync.rejected, (state: craneCargoState) => {
      state.result = []
      state.loading = false
      state.error = true
    });

    builder.addCase(cargoCraneAsync.pending, (state: craneCargoState) => {
      state.result = []
      state.loading = true
      state.error = false
    })
  },
})

export const { setWherFTSId } = cargoCraneSlice.actions
export const cargoCraneSelector = (store: RootState) => store.cargoCraneReducer
export default cargoCraneSlice.reducer




