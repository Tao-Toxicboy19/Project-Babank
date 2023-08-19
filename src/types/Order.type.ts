export interface Data {
    order_id: number;
    carrier_name: string;
    cargo_name: string;
    load_status: number;
    category: string;
    arrival_time: Date;
    deadline_time: Date;
    latitude: number;
    longitude: number;
}

export interface Order {
    order_id: number;
    carrier_name: string;
    cargo_name: string;
    load_status: number;
    category: string;
    arrival_time: Date;
    deadline_time: Date;
    latitude: number;
    longitude: number;
}

export interface ColumnData {
    dataKey: keyof Data | "editColumn";
    label: string;
    numeric?: boolean;
    width: number;
}