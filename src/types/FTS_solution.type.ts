export interface FTS_Solution {
    solution_id: number;
    FTS_id: number;
    total_preparation_FTS_time: number;
    total_travel_consumption_cost: number;
    total_travel_distance: number;
}


export interface FTS_SolutionState {
    result: FTS_Solution
    loading: boolean
    error: string | null
}