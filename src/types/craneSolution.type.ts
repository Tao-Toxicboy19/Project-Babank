export interface Crane_Solution {
    solution_id: number;
    FTS_id: number;
    total_cost: number;
    total_consumption_cost: number;
    total_wage_cost: number;
    penality_cost: number;
    total_reward: number;
    total_late_time: number;
    total_early_time: number;
    total_operation_consumption_cost: number;
    total_operation_time: number;
    total_preparation_crane_time: number;
}

export interface Crane_SolutionState {
    result: Crane_Solution
    loading: boolean
    error: string | null
}