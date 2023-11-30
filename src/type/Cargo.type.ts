export interface Cargo {
    cargo_id?: number;
    cargo_name: string;
}


export interface CargoState {
    cargo: Cargo[];
    loading: boolean;
    error: string | null;
}

export interface CargoEditState {
    cargo: Cargo | null
    loading: boolean
    error: null | string
}

export interface ColumnCargo {
    dataKey: keyof Cargo | "editColumn";
    label: string;
    numeric?: boolean;
    width: number;
    className?: string;
}

export interface EditCargoProps {
    Id: string;
}