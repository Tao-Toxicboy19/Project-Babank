export interface CargoCrane {
    cc_id: string
    fl_id: string
    ca_id: string
    cargo_name: string
    floating_name: string
    crane: number;
    consumption_rate: number
    work_rate: number
    category: string
}

export interface CargoCraneEditState {
    result: CargoCrane | null
    loading: boolean
    error: null | string
}

export interface CargoCraneState {
    cargoCrane: CargoCrane[];
    loading: boolean
    error: string | null
}

export interface ColumnCargoCrane {
    dataKey: keyof CargoCrane | "editColumn";
    label: string;
    numeric?: boolean;
    width: number;
    className?: string;
}