import { createSlice, PayloadAction, ThunkAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { httpClient } from "../../utils/httpclient";
import { RootState } from "../store";
import { apiManagePlans } from "../../Constants";


export interface ManagePlans {
    compute_time: number;
    data_date: string;
    start_date: number;
    status: string;
}


interface managePlansState {
    loading: boolean
    error: boolean
    result: ManagePlans | null
}

const initialState: managePlansState = {
    loading: false,
    error: false,
    result: null
}

const ManagePlansSlice = createSlice({
    name: 'ManagePlans',
    initialState,
    reducers: {
        setManagePlanstart(state: managePlansState) {
            state.result = null
            state.loading = true
            state.error = false
        },
        setManagePlansuccess(state: managePlansState, action: PayloadAction<ManagePlans>) {
            state.result = action.payload
            state.loading = false
            state.error = false
        },
        setManagePlanFailed(state: managePlansState) {
            state.result = null
            state.error = true
            state.loading = false
        },
    }
})

export const { setManagePlanstart, setManagePlansuccess, setManagePlanFailed } = ManagePlansSlice.actions
export default ManagePlansSlice.reducer;

export const ManagePlans = (fts: any[], order: any[], handleClickOpen: () => void, handleClose: () => void, handleCloseV2: () => void, computetime: any): ThunkAction<void, RootState, unknown, any> => async (dispatch) => {
    try {
        dispatch(setManagePlanstart())
        const values = {
            computetime,
            fts: fts,
            order: order
        };
        handleClickOpen();

        const result = await httpClient.post(apiManagePlans, values)
        dispatch(setManagePlansuccess(result.data));

        // เมื่อคำขอไปยัง API เสร็จสิ้น รอ 3 วินาทีแล้วค่อยปิด modal
        // setTimeout(() => {
        //     handleClose()
        //     handleCloseV2()
        //     console.log(values)
        //     toast.success('ประมวลผลเรียบร้อย')
        // }, 4000);
        handleClose()
        handleCloseV2()
        toast.success('ประมวลผลเรียบร้อย')

    } catch (error) {
        dispatch(setManagePlanFailed())
        handleClose()
        handleCloseV2()
    }
}

