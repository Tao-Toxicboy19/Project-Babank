// import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { apiUrlV2 } from "../../../Constants";
// import { httpClient } from "../../../utils/httpclient";
// import { RootState } from "../../store";

// export type TotalTableCrane = {
//     FTS_id: number
//     crane_id: number;
//     total_cost_sum: number;
//     total_consumption_cost_sum: number;
//     penality_cost_sum: number;
//     total_all_costs: number;
//     crane_name: string;
//     total_reward_sum: number;
// }


// interface TotalTableCraneState {
//     loading: boolean
//     error: boolean
//     result: TotalTableCrane[]
// }

// const initialState: TotalTableCraneState = {
//     loading: false,
//     error: false,
//     result: []
// }

// export const totalTableCranesAsync = createAsyncThunk(
//     'craneSolutionTableV2/craneSolutionTableV2Async',
//     async (id:number) => {
//         try {
//             const result = await httpClient.get<TotalTableCrane[]>(`${apiUrlV2}/total/table/crane/${id}`)
//             return result.data
//         } catch (error) {
//             throw error
//         }
//     }
// )

// const totalTableCraneSlice = createSlice({
//     name: 'craneSolutionTableV2',
//     initialState,
//     reducers: {},
//     extraReducers: (builder) => {
//         builder.addCase(totalTableCranesAsync.fulfilled, (state: TotalTableCraneState, action: PayloadAction<TotalTableCrane[]>) => {
//             state.result = action.payload
//             state.loading = false
//             state.error = false
//         });

//         builder.addCase(totalTableCranesAsync.rejected, (state: TotalTableCraneState) => {
//             state.result = []
//             state.loading = false
//             state.error = true
//         });

//         builder.addCase(totalTableCranesAsync.pending, (state: TotalTableCraneState) => {
//             state.result = []
//             state.loading = true
//             state.error = false
//         });
//     },
// })

// export const { } = totalTableCraneSlice.actions
// export const totalTableCraneAsyncSelector = (store: RootState) => store.totalTableCraneReducerV2
// export default totalTableCraneSlice.reducer