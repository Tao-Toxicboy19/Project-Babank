export interface Order {
    or_id: number;
    carrier_name: string;
    category: Category;
    cargo_name: string;
    load: number;
    bulk: number;
    arrival_time: string;
    deadline_time: string;
    latitude: number;
    longitude: number;
    maxFTS: number;
    penalty_rate: number;
    reward_rate: number;
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