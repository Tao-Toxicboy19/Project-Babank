export interface Crane {
    crane_id: any
    crane_name: string;
    FTS_id: number;
    setuptime_crane: number;
}

export interface CraneEditState {
    result: Crane | null
    loading: boolean
    error: string | null
}

export interface CraneState {
    result: Crane[]
    loading: boolean
    error: string | null
}