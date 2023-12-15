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
    result: Cargo | null
    loading: boolean
    error: boolean
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