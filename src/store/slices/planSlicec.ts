import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { httpClient } from "../../utils/httpclient"
import { RootState } from "../store"

export type Plan = {
    id: number
    user_group: number
    plan_name: string
    plan_type: string
    started_at: Date
    ended_at: Date
    created_at: Date
    updated_at: Date
}


interface PlanState {
    planAi: Plan[]
    planUser: Plan[]
    loading: boolean
    error: boolean
    plan: number
}

const initialState: PlanState = {
    planAi: [],
    planUser: [],
    loading: false,
    error: false,
    plan: 0
}

export const planAsync = createAsyncThunk(
    'plan/planAsync',
    async (id: number) => {
        try {
            const result = await httpClient.get(`/plan/${id}`)
            return result.data
        } catch (error) {
            throw error
        }
    }
)

export const removePlant = createAsyncThunk(
    'remove/removeAsync',
    async (id: number, { dispatch }) => {
        try {
            dispatch(setRemove(id))
            await httpClient.post('/plan/remove', { id })
            return id
        } catch (error) {
            throw error
        }
    }
)

export const addPlan = createAsyncThunk(
    'add/addAsync',
    async (id: number, { dispatch }) => {
        try {
            dispatch(setRemove(id))
            await httpClient.post('/plan/remove', { id })
            return id
        } catch (error) {
            throw error
        }
    }
)

const planSlice = createSlice({
    name: 'plan',
    initialState,
    reducers: {
        setPlans: (state, action: PayloadAction<number>) => {
            state.plan = action.payload
            state.loading = false
            state.error = false
        },
        setRemove: (state, action: PayloadAction<number>) => {
            state.planAi = state.planAi.filter(p => p.id !== action.payload)
            state.planUser = state.planUser.filter(p => p.id !== action.payload)
            state.loading = false
            state.error = false
        },
        setAdd: (state, action: PayloadAction<Plan>) => {
            state.planUser.push(action.payload)
            state.loading = false
            state.error = false
        },
    },
    extraReducers: (builder) => {
        builder.addCase(planAsync.fulfilled, (state: PlanState, action: PayloadAction<Plan[]>) => {
            state.planAi = action.payload
                .filter(item => item.plan_type === "ai")
                .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
            state.planUser = action.payload
                .filter(item => item.plan_type === "user")
                .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
            state.loading = false
            state.error = false
        })

        builder.addCase(planAsync.rejected, (state: PlanState) => {
            state.planAi = []
            state.planUser = []
            state.loading = false
            state.error = true
        })

        builder.addCase(planAsync.pending, (state: PlanState) => {
            state.planAi = []
            state.planUser = []
            state.loading = true
            state.error = false
        })
    },
})

export const { setPlans, setRemove, setAdd } = planSlice.actions
export const planSelector = (store: RootState) => store.planReducer
export default planSlice.reducer