export interface Carrier {
    cr_id?: number
    carrier_name: string
    maxcapacity: number
    holder: string
    burden: number
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