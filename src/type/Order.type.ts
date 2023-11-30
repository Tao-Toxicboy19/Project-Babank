export interface OrderEditState {
    result: Orders | null
    loading: boolean
    error: null | string
}

export interface OrderState {
    orders: Orders[];
    loading: boolean
    error: boolean
}

// export interface Orders {
//     or_id: number;
//     cr_id: number;
//     category: string;
//     arrival_time: string;
//     deadline_time: string;
//     latitude: number;
//     longitude: number;
//     maxFTS: number;
//     penalty_rate: number;
//     reward_rate: number;
//     status_order: string;
//     rel_start_time: null | string;
//     rel_finish_time: null | string;
//     reason: string;
//     carrier: Carrier;
//     cargo_order: CargoOrder[];
// }

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




///////////////////////////////



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
    status_order: StatusOrder;
    rel_start_time: null | string;
    rel_finish_time: null | string;
    reason: null | string;
    group: number;
    carrier: Carrier;
    cargo_order: CargoOrder[];
}

export interface CargoOrder {
    order_id: number;
    cargo_id: number;
    load: number;
    bulk: number;
    b1: number | null;
    b2: number | null;
    b3: number | null;
    b4: number | null;
    b5: number | null;
    b6: number | null;
    b7: null;
    b8: null;
    b9: null;
    b10: null;
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
    Width: number;
    carrier_max_FTS: number;
    carrier_max_crane: number;
    length: number;
    has_crane: HasCrane | null;
}

export enum HasCrane {
    Has = "has",
    No = "no",
}

export enum StatusOrder {
    Approved = "Approved",
    Assign = "Assign",
    InPlan = "In Plan",
    Newer = "Newer",
}