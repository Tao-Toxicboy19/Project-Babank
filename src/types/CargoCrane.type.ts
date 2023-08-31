export interface CargoCrane {
    cargo_crane_id: string
    floating_id: string
    cargo_id: string
    cargo_name: string
    floating_name: string
    consumption_rate: number
    work_rate: number
    category: string
}

export interface CargoCraneState {
    cargoCrane: CargoCrane[];
}

export interface ColumnData {
    dataKey: keyof CargoCrane | "editColumn";
    label: string;
    numeric?: boolean;
    width: number;
    className?: string;
}