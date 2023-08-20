export interface CargoCrane {
    floating_name: string
    cargo_name: string
    consumption_rate: number
    work_rate: number
    category: string
}

export interface CargoCraneState {
    cargoCrane: CargoCrane[]
}

export interface ColumnData {
    dataKey: keyof CargoCrane | "editColumn";
    label: string;
    numeric?: boolean;
    width: number;
}