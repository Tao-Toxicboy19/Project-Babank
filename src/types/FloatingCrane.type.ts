export interface Floating {
  fl_id: string;
  floating_name: string;
  NumberOfCranes: number;
  latitude: number;
  longitude: number;
  setuptime: number;
  speed: number;
}

export interface FloatingState {
  floating: Floating[]
  loading: boolean
  error: string | null
}

export interface ColumnData {
  dataKey: keyof Floating | "editColumn";
  label?: string;
  numeric?: boolean;
  width: number;
  className?: string;
}