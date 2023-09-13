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