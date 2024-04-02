import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { httpClient } from "../../../utils/httpclient"
import { server } from "../../../Constants"
import { RootState } from "../../store"
import { v4 as uuidv4 } from 'uuid'
import dayjs from "dayjs"
import isBetween from "dayjs/plugin/isBetween";
dayjs.extend(isBetween)

export interface Solution_schedule {
    uuid?: string
    solution_id: number
    FTS_id: number
    order_id: number
    carrier_id: number
    lat: number
    lng: number
    arrivaltime: string
    exittime: string
    operation_time: number | null
    Setup_time: number | null
    travel_Distance: number | null
    travel_time: number | null
    operation_rate: number | null
    consumption_rate: number | null
    cargo_id: number
    solutionsId: number
    plan: string | null
    FTS_name: string
    cr_id: number | null
    carrier_name: null | string
    holder: null | string
    maxcapacity: number | null
    burden: number | null
    Width: number | null
    carrier_max_FTS: number | null
    carrier_max_crane: number | null
    length: number | null
    has_crane: string | null
    plan_name: string
    created_at: Date
}

interface Solution_scheduleState {
    result: Solution_schedule[]
    plan_name: string[]
    loading: boolean
    error: boolean
    chars: Solution_schedule[]
    edit: Solution_schedule[]
}

const initialState: Solution_scheduleState = {
    result: [],
    plan_name: [],
    loading: false,
    error: false,
    chars: [],
    edit: [],
}

export const sulutionScheduelAsync = createAsyncThunk(
    'sulutionScheduel/sulutionScheduelAsync',
    async (id: number) => {
        try {
            const result = await httpClient.get(`${server.SOLUTIONSCHEDULE}/${id}`)
            const values = result.data.map((item: Solution_schedule) => ({
                ...item,
                uuid: uuidv4()
            }))
            console.log(values)
            return result.data
        } catch (error) {
            throw error
        }
    }
)


const sulutionScheduelSlice = createSlice({
    name: "sulutionScheduel",
    initialState,
    reducers: {
        setEdit(state: Solution_scheduleState, action: PayloadAction<any>) {
            const index = state.edit.findIndex((o) => o.order_id === action.payload.order_id)
            const existingState = state.edit.find((item) => item.order_id === action.payload.orderId)

            if (index !== -1) {
                const stateStartDate = state.edit[index].arrivaltime;
                const existingEndDate = existingState?.exittime;
                const existingStartDate = existingState?.arrivaltime;

                if (stateStartDate === existingEndDate || stateStartDate === existingStartDate) {
                    state.edit[index] = {
                        ...state.edit[index],
                        FTS_name: "",
                        arrivaltime: existingState!.exittime,
                    }
                } else if (existingStartDate && existingEndDate && dayjs(stateStartDate).isBetween(existingStartDate, existingEndDate, null, '[]')) {
                    state.edit[index] = {
                        ...state.edit[index],
                        FTS_name: "",
                        arrivaltime: existingState!.exittime,
                    }
                } 
                // else {
                //     console.log('zzzz')
                //     // กรณีอื่นๆ
                //     // ใส่โค้ดที่คุณต้องการทำเมื่อเป็นเงื่อนไขอื่นๆ
                // }
            }


            if (existingState) {
                state.edit.push({
                    ...existingState,
                    FTS_name: action.payload.fts_name,
                    arrivaltime: action.payload.start_date !== undefined ? action.payload.start_date : existingState.arrivaltime
                })
            }
            state.loading = false
            state.error = false
        },
    },
    extraReducers: (builder) => {
        builder.addCase(sulutionScheduelAsync.fulfilled, (state: Solution_scheduleState, action: PayloadAction<Solution_schedule[]>) => {
            state.result = action.payload
            state.loading = false
            state.error = false
            state.chars = action.payload.filter((item) => item.carrier_name !== null)
            state.edit = action.payload.filter((item) => item.carrier_name !== null)
        })
        builder.addCase(sulutionScheduelAsync.rejected, (state: Solution_scheduleState) => {
            state.result = []
            state.loading = false
            state.error = true
        })

        builder.addCase(sulutionScheduelAsync.pending, (state: Solution_scheduleState) => {
            state.result = []
            state.loading = true
            state.error = false
        })
    },
})

export const { setEdit } = sulutionScheduelSlice.actions
export const sulutionScheduelSelector = (store: RootState) => store.sulutionScheduelReducer
export default sulutionScheduelSlice.reducer