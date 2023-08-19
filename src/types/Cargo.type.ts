export interface Cargo {
    cargo_id: string;
    cargo_name: string;
    consumption_rete: number;
    work_rate: number;
    category: string;
}

export interface CargoState {
    cargo: Cargo[];
}

export interface ColumnData {
    dataKey: keyof Cargo | "editColumn";
    label: string;
    numeric?: boolean;
    width: number;
  }