export interface Crane {
    crane_name: string;
    FTS_id: number;
    setuptime_crane: number;
}

export interface CraneEditState {
    result: Crane | null
    loading: boolean
    error: string | null
}