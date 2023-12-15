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

export const cargoDeleteAsync = createAsyncThunk(
    'cargoDelete/cargoDeleteAsync',
    async ({ id, handleClose }: { id: number, handleClose: () => void }) => {
        try {
            const result = await httpClient.delete(`${server.CARGO}/${id}`)
            toast.success(SUCCESS)
            handleClose()
            return result.data;
        } catch (error: any) {
            if (error.response && error.response.status === 500) {
                toast.warn(`
                ไม่สามารถลบข้อมูลได้ เนื่องจากมี
                ข้อมูลอยู่ที่ ออเดอร์
                `)
            }
            throw error;
        }
    }
)

const cargoDeleteSlice = createSlice({
    name: 'cargoDelete',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(cargoDeleteAsync.fulfilled, (state: CargoState, action: PayloadAction<Cargo>) => {
            state.result = action.payload
            state.loading = false
            state.error = false
        });

        builder.addCase(cargoDeleteAsync.rejected, (state: CargoState) => {
            state.result = null
            state.loading = false
            state.error = true
        });

        builder.addCase(cargoDeleteAsync.pending, (state: CargoState) => {
            state.result = null
            state.loading = true
            state.error = false
        });
    },
})

export const { } = cargoDeleteSlice.actions
export const cargoDeleteSelector = (store: RootState) => store.cargoDeleteReducer;
export default cargoDeleteSlice.reducer;

// export const { setCargoStart, setCargoSuccess, setCargoFailure, setInsertCargo, setUpdateCargo, setDeleteCargo } = cargoSlice.actions
// export default cargoSlice.reducer

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