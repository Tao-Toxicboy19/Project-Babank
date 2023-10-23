export interface MainTain {
    maintain_crane_id: number;
    desc?: string;
    downtime?: string;
    start_time?: string;
    mt_crane_id?: number;
    crane: Crane;
}

export interface Crane {
    id: number;
    crane_name: string;
    FTS_id: number;
    setuptime_crane: number;
}


export interface MainTainFTS {
    maintain_FTS_id: number;
    desc_FTS?: string;
    downtime_FTS?: any;
    start_time_FTS?: any;
    mt_FTS_id: number;
    fts: Fts;
}

export interface Fts {
    id: number;
    FTS_name: string;
    lat: number;
    lng: number;
    setuptime_FTS: number;
    speed: number;
}
////////////////////////////////////////////////////

export interface CarneSolutionV2 {
    solution_id: number;
    FTS_id: number;
    crane_id: number;
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
    crane: CraneV2;
    fts: FtsV2;
}

export interface CraneV2 {
    id: number;
    crane_name: string;
    FTS_id: number;
    setuptime_crane: number;
}

export interface FtsV2 {
    id: number;
    FTS_name: string;
    lat: number;
    lng: number;
    setuptime_FTS: number;
    speed: number;
}
