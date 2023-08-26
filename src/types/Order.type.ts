export interface Order {
    order_id: string;
    carrier_name: string;
    carrier_id: string
    cargo_name: string;
    cargo_id: string
    load_status: number;
    category: string;
    arrival_date: any
    arrival_time: any;
    deadline_date: any;
    deadline_time: any;
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