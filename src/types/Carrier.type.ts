export interface carrier {
    cr_id: string
    carrier_name: string
    maxcapacity: number
    ower: string
    burden: number
}

export interface carrierState {
    carrier: carrier[]
    loading: boolean
    error: string | null
}

export interface ColumnData {
    dataKey: keyof carrier | "editColumn";
    label: string;
    numeric?: boolean;
    width: number;
    className?: string;
}