export interface Floating {
  floating_id: number;
  floating_name: string;
  description: string;
  latitude: number;
  longitude: number;
  setuptime: number;
  speed: number;
}

export interface FloatingState {
  data: Floating[]
}

export interface ColumnData {
  dataKey: keyof Floating | "editColumn";
  label: string;
  numeric?: boolean;
  width: number;
}