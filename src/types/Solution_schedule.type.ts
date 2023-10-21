export interface Solution_schedule {
    solution_id: number;
    FTS_id: number;
    carrier_id: number;
    lat: number;
    lng: number;
    arrivaltime: Date | any;
    exittime: Date | any;
    operation_time: number | null;
    Setup_time: number | null;
    travel_Distance: number | null;
    travel_time: number | null;
    operation_rate: number | null;
    consumption_rate: number | null;
    id: number;
    FTS_name: string;
    setuptime_FTS: number;
    speed: number;
    cr_id: number | null;
    carrier_name: null | string;
    holder: null | string;
    maxcapacity: number | null;
    burden: number | null;
}

export interface Solution_scheduleState {
    solution_schedule: Solution_schedule[];
    loading: boolean;
    error: string | null;
}


export interface SolutionCrane {
    fts: Fts;
    crane: Crane[];
    solutions: Solution[];
}

export interface Crane {
    id: number;
    crane_name: string;
    setuptime_crane: number;
}

export interface Fts {
    id: number;
    FTS_name: string;
    lat: number;
    lng: number;
    setuptime_FTS: number;
    speed: number;
}

export interface Solution {
    fts_id: number;
    solution_id: number;
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
    date: Date;
}

export interface report_solutionState {
    result: report_solutions[]
    loading: boolean
    error: string | null
}

export interface report_solutions {
    solution_id: number;
    FTS_id: number;
    carrier_id: number;
    lat: number;
    lng: number;
    arrivaltime: any;
    exittime: any;
    operation_time: number;
    Setup_time: number;
    travel_Distance: number;
    travel_time: number;
    operation_rate: number;
    consumption_rate: number;
    or_id: number;
    cr_id: number;
    category: Category;
    arrival_time: any;
    deadline_time: any;
    latitude: number;
    longitude: number;
    maxFTS: number;
    penalty_rate: number;
    reward_rate: number;
    order_id: number;
    cargo_id: number;
    load: number;
    bulk: number;
    id: number;
    FTS_name: string;
    setuptime_FTS: number;
    speed: number;
    cargo_name: string;
    carrier_name: string;
    holder: string;
    maxcapacity: number;
    burden: number;
}

export enum Category {
    Export = "export",
    Import = "import",
}

