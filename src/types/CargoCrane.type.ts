export interface CargoCrane {
    crane_id: number;
    cargo_id: number;
    FTS_id: number;
    consumption_rate: number;
    work_rate: number;
    category: string;
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
    result: {
        crane_name: string;
        category: string;
        category_v1: {
            category: string;
            cargo: {
                cargo_name: string;
                work_rate: number;
                consumption_rate: number;
            }[];
        }[];
    }[];
}

export interface FTScraneCargoState {
    result: FTSCraneCargo[]
    loading: boolean
    error: string | null
}

////////////////////////////////////////////////////////////////////////////

export interface TreeTableNodeProps {
    FTS_name: string;
    result: TreeNodeProps[];
}

export interface TreeNodeProps {
    crane_name: string;
    category_v1: {
        category: string;
        cargo: {
            cargo_name: string;
            work_rate: number;
            consumption_rate: number;
        }[];
    }[];
}

export interface TreeTableProps {
    data: TreeTableNodeProps[];
}



export interface TreeNodeProps {
    crane_name: string;
    category_v1: {
        category: string;
        cargo: {
            cargo_name: string;
            work_rate: number;
            consumption_rate: number;
        }[];
    }[];
}

export interface TreeTableNodeProps {
    FTS_name: string;
    result: TreeNodeProps[];
}

export interface TreeNodeProps {
    crane_name: string;
    category_v1: {
        category: string;
        cargo: {
            cargo_name: string;
            work_rate: number;
            consumption_rate: number;
        }[];
    }[];
}

export interface CargoItem {
    cargo_name: string;
    work_rate: number;
    consumption_rate: number;
}
export interface ListCargoProps {
    category: string;
    cargo: CargoItem[];
}