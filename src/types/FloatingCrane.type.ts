export interface FTS {
  fts_id?: number
  FTS_name: string;
  lat: number;
  lng: number;
  setuptime_FTS: number;
  speed: number;
}

export interface FTSCrane {
  fts_id: number;
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
  setuptime_crane: number;
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