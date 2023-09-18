export interface FTS {
  id?: number
  FTS_name: string;
  lat: number;
  lng: number;
  setuptime_FTS: number;
  speed: number;
}
export interface TreeTableNodeProps {
  FTS_name: string;
  setuptime_FTS: number;
  speed: number;
  lat: number;
  lng: number;
  result: {
    crane_name: string
    setuptime_crane: number
  }[];
}

export interface TreeNodeProps {
  crane_name: string;
  setuptime_crane: number
}

export interface TreeTableProps {
  data: TreeTableNodeProps[];
}