export interface Carrier {
    cr_id: number;
    carrier_name: string;
    holder: string;
    maxcapacity: number;
    burden: number;
    carrier_max_FTS: number;
    carrier_max_crane: number;
    Width: number;
    length: number;
    has_crane: string;
}

export interface CarrierEditState {
    carrier: Carrier | null
    loading: boolean
    error: null | string
}

export interface carrierState {
    carrier: Carrier[]
    loading: boolean
    error: string | null
}

export interface ColumnsCarrier {
    dataKey: keyof Carrier | "editColumn";
    label: string;
    numeric?: boolean;
    width: number;
    className?: string;
}