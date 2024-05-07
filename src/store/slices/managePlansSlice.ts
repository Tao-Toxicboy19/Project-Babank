import { createSlice, PayloadAction, ThunkAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { RootState } from "../store";
import { apiManagePlans, SUCCESS } from "../../Constants";
import { ftsAsync } from "./FTS/ftsSlice";
import { cargoAsync } from "./Cargo/cargoSlice";
import { cargoCraneAsync } from "./CargoCrane/cargoCraneSlice";
import { httpClient } from "../../utils/httpclient";
import { craneAsync } from "./Crane/craneSlice";
import { craneSolutionAsync } from "./Solution/craneSolutionSlice";
import { craneSolutionV2Async } from "./Solution/craneSolutionV2Slice";
import { ftsSolutionTableAsync } from "./Solution/ftsSolutionTableSlice";
import { sulutionScheduelAsync } from "./Solution/sollutionScheduleSlice";
import { solutionOrderAsync } from "./Solution/solutionOrderSlice";
import { totalTableAsync } from "./Solution/totalTableFTSSlice";
import { planAsync } from "./planSlicec";


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
export const managePlansSelector = (store: RootState) => store.managePlansReducer
export default ManagePlansSlice.reducer;

export const ManagePlans = (group: any, planName: string | undefined, values: any, handleClickOpen: () => void, handleClose: () => void, handleCloseV2: () => void): ThunkAction<void, RootState, unknown, any> => async (dispatch) => {
    try {
        handleClickOpen()
        const res = await httpClient.post('plan', values)
        values = {
            ...values,
            solution_id: res.data.message
        }
        const id = res.data.message

        const result = await httpClient.post(`${apiManagePlans}/route`, values)
        if (planName) {
            console.log(`hello old plan ${planName}`)
            await httpClient.post('plan/remove', { plan_id: planName })
        }
        dispatch(setManagePlansuccess(result.data))
        dispatch(planAsync(group))
        dispatch(ftsAsync())
        dispatch(cargoAsync())
        dispatch(cargoCraneAsync())
        handleClose()
        handleCloseV2()
        dispatch(craneSolutionAsync(id))
        dispatch(craneSolutionV2Async(id))
        dispatch(totalTableAsync(id))
        dispatch(sulutionScheduelAsync(id))
        dispatch(ftsSolutionTableAsync(id))
        dispatch(solutionOrderAsync(id))
        dispatch(craneAsync())
        toast.success(SUCCESS)
    } catch (error) {
        dispatch(setManagePlanFailed())
        handleClose()
        handleCloseV2()
    }
}

