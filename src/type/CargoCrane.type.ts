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

////////////////////////////////////////////////////////////////////////////

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
    FTS_id: number
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

///////////////////////////////////////////////////////////////


export interface CargoCrane {
    cargo_crane_id: number
    crane_id: number;
    cargo_id: number;
    FTS_id: number;
    consumption_rate: number;
    work_rate: number;
    category: string;
    crane?: Crane;
    fts?: Fts;
    cargo?: Cargo;
}

export interface craneCargoState {
    result: CargoCrane[]
    loading: boolean
    error: string | null
}

export interface Cargo {
    cargo_id: number;
    cargo_name: string;
}

export interface Crane {
    id: number;
    crane_name: string;
    FTS_id: number;
    setuptime_crane: number;
}

export interface Fts {
    id: number;
    FTS_name: string;
    lat: number;
    lng: number;
    setuptime_FTS: number;
    speed: number;
}

//////////////////////////////////////////////
export interface Carrier {
    cargo_crane_id: number;
    crane_id: number;
    cargo_id: number;
    FTS_id: number;
    consumption_rate: number;
    work_rate: number;
    category: Category;
    crane: Crane;
    fts: Fts;
    cargo: Cargo;
}

export interface Cargo {
    cargo_id: number;
    cargo_name: string;
}

export enum Category {
    Export = "export",
    Import = "import",
}

export interface Crane {
    id: number;
    crane_name: string;
    FTS_id: number;
    setuptime_crane: number;
}

export interface Fts {
    id: number;
    FTS_name: string;
    lat: number;
    lng: number;
    setuptime_FTS: number;
    speed: number;
}