import { createSlice, PayloadAction, ThunkAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { RootState } from "../store";
import { apiManagePlans, SUCCESS } from "../../Constants";
import { craneSolutionAsync } from "./Solution/craneSolutionSlice";
import { sulutionScheduelAsync } from "./Solution/sollutionScheduleSlice";
import { solutionCarrierOrderAsync } from "./Solution/solutionCarrierOrderSlice";
import { ftsSulutionAsync } from "./Solution/ftsSulutionSlice";
import { ftsSolutionTableAsync } from "./Solution/ftsSolutionTableSlice";
import { solutionOrderAsync } from "./Solution/solutionOrderSlice";
import { reportCraneAsync } from "./report/reportCraneSlice";
import { carrierAsync } from "./Carrier/carrierSlice";
import { roleAsync } from "./auth/rolesSlice";
import { orderAsync } from "./Order/orderSlice";
import { craneAsync } from "./Crane/craneSlice";
import { ftsAsync } from "./FTS/ftsSlice";
import { cargoAsync } from "./Cargo/cargoSlice";
import { cargoCraneAsync } from "./CargoCrane/cargoCraneSlice";
import { craneSolutionV2Async } from "./Solution/craneSolutionV2Slice";
import axios from "axios";


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

export const ManagePlans = (fts: any[], order: any[], handleClickOpen: () => void, handleClose: () => void, handleCloseV2: () => void, computetime: any, rolesReducer: any): ThunkAction<void, RootState, unknown, any> => async (dispatch) => {
    try {
        dispatch(setManagePlanstart())
        const values = {
            computetime,
            Group: rolesReducer,
            fts: fts,
            order: order
        };
        handleClickOpen();
        const result = await axios.post(apiManagePlans, values)
        dispatch(setManagePlansuccess(result.data));
        dispatch(craneSolutionV2Async())
        dispatch(craneSolutionAsync())
        dispatch(sulutionScheduelAsync())
        dispatch(ftsSulutionAsync())
        dispatch(ftsSolutionTableAsync())
        dispatch(solutionCarrierOrderAsync())
        dispatch(solutionOrderAsync())
        dispatch(reportCraneAsync())
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

