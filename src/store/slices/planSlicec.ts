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
            console.log(result.data)
            return result.data
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
        }
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

export const { setPlans } = planSlice.actions
export const planSelector = (store: RootState) => store.planReducer
export default planSlice.reducer