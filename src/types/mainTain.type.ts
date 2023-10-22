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
