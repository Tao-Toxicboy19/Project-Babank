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
    FTS_id: number | undefined | any
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
    count?: number
    status?: boolean
}

interface Solution_scheduleState {
    result: Solution_schedule[]
    plan_name: string[]
    loading: boolean
    error: boolean
    chars: Solution_schedule[]
    edit: Solution_schedule[]
    count: Solution_schedule[]
    charsFTS: Solution_schedule[]
}

const initialState: Solution_scheduleState = {
    result: [],
    plan_name: [],
    loading: false,
    error: false,
    chars: [],
    edit: [],
    count: [],
    charsFTS: []
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
            return values
        } catch (error) {
            throw error
        }
    }
)


const sulutionScheduelSlice = createSlice({
    name: "sulutionScheduel",
    initialState,
    reducers: {
        setCount(state: Solution_scheduleState, action: PayloadAction<any>) {
            state.count = state.edit.filter((s) => s.carrier_id === action.payload)
        },

        setRemoveSubmit(state: Solution_scheduleState, action: PayloadAction<any>) {
            console.log(action.payload)
            state.edit = state.edit.filter((order) => order.uuid !== action.payload)
        },

        setRemove(state: Solution_scheduleState, action: PayloadAction<any>) {
            state.count = state.count.filter((order) => order.uuid !== action.payload)
        },
        setAdd(state: Solution_scheduleState, action: PayloadAction<any>) {
            state.count.push(action.payload)
        },
        setNameCarrier(state: Solution_scheduleState, action: PayloadAction<any>) {
            const index = state.edit.findIndex((o) => o.uuid === action.payload.uuid)
            if (index !== -1) {
                state.edit[index] = {
                    ...state.edit[index],
                    FTS_name: action.payload.fts_name,
                    FTS_id: action.payload.fts_id,
                }
            }
            const index2 = state.count.findIndex((o) => o.uuid === action.payload.uuid)
            if (index2 !== -1) {
                state.count[index2] = {
                    ...state.count[index2],
                    FTS_name: action.payload.fts_name,
                    FTS_id: action.payload.fts_id,
                }
            }
        },
        setAddEdit(state: Solution_scheduleState, action: PayloadAction<any>) {
            // state.count.find(c => c.uuid === action.payload)
            // state.count.push(action.payload)
            state.count = []
            state.edit.push(action.payload)
        },
    },
    extraReducers: (builder) => {
        builder.addCase(sulutionScheduelAsync.fulfilled, (state: Solution_scheduleState, action: PayloadAction<Solution_schedule[]>) => {
            state.result = action.payload
            state.loading = false
            state.error = false
            state.chars = action.payload.filter((item) => item.carrier_name !== null).sort((a, b) => {
                return dayjs(a.arrivaltime).isBefore(dayjs(b.arrivaltime)) ? -1 : 1;
            })
            state.edit = action.payload.filter((item) => item.carrier_name !== null).sort((a, b) => {
                return dayjs(a.arrivaltime).isBefore(dayjs(b.arrivaltime)) ? -1 : 1;
            })
            state.charsFTS = action.payload.filter((item) => item.FTS_name !== null).sort((a, b) => {
                return dayjs(a.arrivaltime).isBefore(dayjs(b.arrivaltime)) ? -1 : 1;
            })
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

export const { setRemove, setAdd, setCount, setAddEdit, setNameCarrier, setRemoveSubmit } = sulutionScheduelSlice.actions
export const sulutionScheduelSelector = (store: RootState) => store.sulutionScheduelReducer
export default sulutionScheduelSlice.reducer