export interface Floating {
  fl_id?: string;
  floating_name: string;
  NumberOfCranes: number;
  latitude: number;
  longitude: number;
  setuptime: number;
  speed: number;
}
export interface floatingEditState {
  result: Floating | null
  loading: boolean
  error: null | string
}

export interface FloatingState {
  floating: Floating[]
  loading: boolean
  error: string | null
}

export interface ColumnFloating {
  dataKey: keyof Floating | "editColumn" | "map";
  label?: string;
  numeric?: boolean;
  width: number;
  className?: string;
}

export interface TreeTableNodeProps {
  FTS_name: string;
  setuptime_FTS: number;
  speed: number;
  lat: number; // เพิ่ม lat และ lng ให้เหมาะสม
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