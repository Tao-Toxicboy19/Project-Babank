export interface OrderEditState {
    result: Orders | null
    loading: boolean
    error: null | string
}

export interface OrderState {
    orders: Orders[];
    loading: boolean
    error: string | null
}

export interface Orders {
    or_id: number;
    cr_id: number;
    category: string;
    arrival_time: string;
    deadline_time: string;
    latitude: number;
    longitude: number;
    maxFTS: number;
    penalty_rate: number;
    reward_rate: number;
    status_order: string
    carrier: Carrier;
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

export interface Carrier {
    cr_id: number;
    carrier_name: string;
    holder: string;
    maxcapacity: number;
    burden: number;
}


export interface CargoItem {
    cargo_id: number;
    load: number;
    bulk: number;
}

export interface CargoItem {
    cargo_id: number;
    load: number;
    bulk: number;
}