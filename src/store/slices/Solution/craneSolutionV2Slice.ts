import { createSlice, PayloadAction, ThunkAction } from "@reduxjs/toolkit";
import { CarneSolutionV2 } from "../../../type/mainTain.type";
import { server } from "../../../Constants";
import { httpClient } from "../../../utils/httpclient";
import { RootState } from "../../store";


interface CarneSolutionV2State {
    loading: boolean
    error: boolean
    result: CarneSolutionV2[]
}

const initialState: CarneSolutionV2State = {
    loading: false,
    error: false,
    result: []
}

const CarneSolutionV2Slice = createSlice({
    name: 'CarneSolutionV2',
    initialState,
    reducers: {
        setCarneSolutionV2Start(state: CarneSolutionV2State) {
            state.result = []
            state.loading = true
            state.error = false
        },
        setCarneSolutionV2Success(state: CarneSolutionV2State, action: PayloadAction<CarneSolutionV2[]>) {
            state.result = action.payload
            state.loading = false
            state.error = false
        },
        setCarneSolutionV2Failed(state: CarneSolutionV2State) {
            state.result = []
            state.error = true
            state.loading = false
        },
    }
})

export const { setCarneSolutionV2Start, setCarneSolutionV2Success, setCarneSolutionV2Failed } = CarneSolutionV2Slice.actions
export default CarneSolutionV2Slice.reducer;

export const loadCarneSolutionV2 = (): ThunkAction<void, RootState, unknown, any> => async (dispatch) => {
    try {
        dispatch(setCarneSolutionV2Start())
        const result = await httpClient.get<CarneSolutionV2[]>(server.CRANESOLUTIONTABLEV2_URL)
        dispatch(setCarneSolutionV2Success(result.data))
    }
    catch (error) {
        dispatch(setCarneSolutionV2Failed())
    }
}