import { createSlice, PayloadAction, ThunkAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { RootState } from "../store";
import { apiManagePlans, SUCCESS } from "../../Constants";
import { craneSolutionAsync } from "./Solution/craneSolutionSlice";
import { solutionCarrierOrderAsync } from "./Solution/solutionCarrierOrderSlice";
import { ftsSulutionAsync } from "./Solution/ftsSulutionSlice";
import { ftsSolutionTableAsync } from "./Solution/ftsSolutionTableSlice";
import { solutionOrderAsync } from "./Solution/solutionOrderSlice";
import { carrierAsync } from "./Carrier/carrierSlice";
import { roleAsync } from "./auth/rolesSlice";
import { orderAsync } from "./Order/orderSlice";
import { craneAsync } from "./Crane/craneSlice";
import { ftsAsync } from "./FTS/ftsSlice";
import { cargoAsync } from "./Cargo/cargoSlice";
import { cargoCraneAsync } from "./CargoCrane/cargoCraneSlice";
import { httpClient } from "../../utils/httpclient";


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
    },
})

export const { setManagePlanstart, setManagePlansuccess, setManagePlanFailed } = ManagePlansSlice.actions
export default ManagePlansSlice.reducer;

export const ManagePlans = (fts: any[], order: any[], handleClickOpen: () => void, handleClose: () => void, handleCloseV2: () => void, formData: any, rolesReducer: any, started: any, ended: any): ThunkAction<void, RootState, unknown, any> => async (dispatch) => {
    try {
        let values: any = {
            computetime: formData.computetime,
            Group: rolesReducer,
            fts,
            order,
            started,
            ended,
            plan_name: formData.plan_name
        }
        handleClickOpen();
        const res = await httpClient.post('plan', values)
        values = {
            ...values,
            solution_id: res.data
        }
        const result = await httpClient.post(apiManagePlans, values)
        dispatch(setManagePlansuccess(result.data))
        dispatch(craneSolutionAsync())
        dispatch(ftsSulutionAsync())
        dispatch(ftsSolutionTableAsync())
        dispatch(solutionCarrierOrderAsync())
        dispatch(solutionOrderAsync())
        dispatch(carrierAsync())
        dispatch(roleAsync())
        dispatch(orderAsync())
        dispatch(craneAsync())
        dispatch(ftsAsync())
        dispatch(cargoAsync())
        dispatch(cargoCraneAsync())
        handleClose()
        handleCloseV2()
        toast.success(SUCCESS)
    } catch (error) {
        dispatch(setManagePlanFailed())
        handleClose()
        handleCloseV2()
    }
}

