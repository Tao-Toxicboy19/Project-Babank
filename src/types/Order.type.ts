export interface OrderEditState {
    result: Order | null
    loading: boolean
    error: null | string
}

export interface OrderState {
    orders: Order[];
    loading: boolean
    error: string | null
}

export interface Order {
    or_id: number;
    cr_id: number;
    category: Category;
    arrival_time: string;
    deadline_time: string;
    latitude: number;
    longitude: number;
    maxFTS: number;
    penalty_rate: number;
    reward_rate: number;
    carrier: CarrierClass;
    cargo_order: CargoOrder[];
}

export interface CargoOrder {
    order_id: number;
    cargo_id: number;
    load: number;
    bulk: number;
    cargo: Cargo;
}

export interface Cargo {
    cargo_id: number;
    cargo_name: string;
}

export interface CarrierClass {
    cr_id: number;
    carrier_name: string;
    holder: string;
    maxcapacity: number;
    burden: number;
}

export enum Category {
    Export = "export",
    Import = "import",
}
