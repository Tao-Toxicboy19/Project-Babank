export interface Order {
    order_id: string;
    carrier_name: string;
    carrier_id: string
    cargo_name: string;
    cargo_id: string
    load_status: number;
    category: string;
    arrival_time: number;
    deadline_time: number;
    latitude: number;
    longitude: number;
}

export interface ColumnData {
    dataKey: keyof Order | "editColumn";
    label: string;
    numeric?: boolean;
    width: number;
}

export interface OrderState {
    orders: Order[];
}