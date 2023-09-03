export interface Order {
    or_id: string;
    carrier_name: string;
    cr_id: string
    cargo_name: string;
    ca_id: string
    load_status: number;
    category: string;
    arrival_time: any;
    deadline_time: any;
    latitude: number;
    longitude: number;
}

export interface ColumnData {
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