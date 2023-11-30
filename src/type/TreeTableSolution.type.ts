export interface TreeTableSolution {
    solution_id: number;
    FTS_name: string;
    total_cost: number;
    total_consumption_cost: number;
    total_wage_cost: number;
    penality_cost: number;
    total_reward: number;
    result: {
        crane_name: string;
    }[];
}


