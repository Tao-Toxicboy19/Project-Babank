// export interface Order {
//     or_id: string;
//     carrier_name: string;
//     cr_id: string
//     cargo_name: string;
//     ca_id: string
//     load_status: number;
//     category: string;
//     arrival_time: any;
//     deadline_time: any;
//     latitude: number;
//     longitude: number;
//     bulks: number
//     maxFTS: number
// }

export interface Order {
    or_id: number;
    carrier_name: string;
    category: Category;
    cargo_name: string;
    load: number;
    bulk: number;
    arrival_time: Date;
    deadline_time: Date;
    latitude: number;
    longitude: number;
    maxFTS: number;
}

export enum Category {
    Export = "export",
    Import = "import",
}


export interface OrderEditState {
    result: Order | null
    loading: boolean
    error: null | string
}

export interface ColumnOrder {
    dataKey: keyof Order | "editColumn";
    label: string;
    numeric?: boolean;
    width: number;
    className?: string;
}

export interface OrderState {
    orders: Order[];
    loading: boolean
    error: string | null
}