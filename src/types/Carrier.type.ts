export interface carrier {
    carrier_id: string
    carrier_name: string
    maxcapacity: number
    ower: string
    burden: number
}

export interface carrierState {
    carrier: carrier[]
}

export interface ColumnData {
    dataKey: keyof carrier | "editColumn";
    label: string;
    numeric?: boolean;
    width: number;
    className?: string;
}