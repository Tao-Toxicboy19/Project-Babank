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
    cargoCrane: FTSCraneCargo[];
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

export interface FTSCraneCargo {
    FTS_name: string;
    work_rate: number;
    consumption_rate: number;
    result: {
        crane_name: string;
        category: string;
        cargo: {
            cargo_name: string
            work_rate: number,
            consumption_rate: number
        }[];
    }[];
}

export interface TreeTableProps {
    data: FTSCraneCargo[];
}

export interface TreeNodeProps {
    crane_name: string;
    category: string;
    cargo: {
        cargo_name: string
        work_rate: number,
        consumption_rate: number
    }[]; // เพิ่มฟิลด์ cargo
}

export interface CargoListProps {
    cargo: {
        cargo_name: string
        work_rate: number,
        consumption_rate: number
    }[];
}

// export interface CargoListProps {
//     cargo_name: string
// }