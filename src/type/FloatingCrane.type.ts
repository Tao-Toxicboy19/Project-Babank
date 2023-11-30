export interface FTS {
  fts_id?: number
  FTS_name: string;
  lat: number;
  lng: number;
  setuptime_FTS: number;
  speed: number;
}

export interface FTSCrane {
  fts_id: any;
  FTS_name: string;
  lat: number;
  lng: number;
  setuptime_FTS: number;
  speed: number;
  result: Result[];
}

export interface Result {
  crane_id: number;
  crane_name: string;
  FTS_id: number;
  setuptime_crane: number;
  wage_month_cost: number;
  premium_rate: number;
}


export interface FTSEditState {
  result: FTSCrane | null
  loading: boolean
  error: null | string
}

export interface FTSCraneState {
  FTS: FTSCrane[]
  loading: boolean
  error: string | null
}