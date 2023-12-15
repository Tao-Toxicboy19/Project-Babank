import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { SUCCESS, server } from "../../../Constants";
import { httpClient } from "../../../utils/httpclient";
import { RootState } from "../../store";
import { toast } from "react-toastify";

interface Cargo {
    cargo_id?: number;
    cargo_name: string;
}

interface CargoState {
    result: Cargo | null
    loading: boolean;
    error: boolean
}

const initialState: CargoState = {
    result: null,
    loading: false,
    error: false
}

export const cargoAddAsync = createAsyncThunk(
    'cargoAdd/cargoAddAsync',
    async ({ data, handleClose }: { data: any, handleClose: () => void }) => {
        try {
            const result = await httpClient.post(server.CARGO, data);
            toast.success(SUCCESS)
            handleClose()
            return result.data;
        } catch (error) {
            throw error;
        }
    }
)

const cargoAddSlice = createSlice({
    name: 'cargoAdd',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(cargoAddAsync.fulfilled, (state: CargoState, action: PayloadAction<Cargo>) => {
            state.result = action.payload
            state.loading = false
            state.error = false
        });

        builder.addCase(cargoAddAsync.rejected, (state: CargoState) => {
            state.result = null
            state.loading = false
            state.error = true
        });

        builder.addCase(cargoAddAsync.pending, (state: CargoState) => {
            state.result = null
            state.loading = true
            state.error = false
        });
    },
})

export const { } = cargoAddSlice.actions
export const cargoAddSelector = (store: RootState) => store.cargoAddReducer;
export default cargoAddSlice.reducer;

// export const { setCargoStart, setCargoSuccess, setCargoFailure, setInsertCargo, setUpdateCargo, setDeleteCargo } = cargoSlice.actions
// export default cargoSlice.reducer

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