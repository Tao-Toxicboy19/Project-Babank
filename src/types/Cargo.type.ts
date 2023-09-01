export interface Cargo {
    cargo_id: string;
    cargo_name: string;
    consumption_rate?: number;
    work_rate: number;
    category: string;
}

export interface CargoState {
    cargo: Cargo[];
    loading: boolean;
    error: string | null;
}

export interface ColumnData {
    dataKey: keyof Cargo | "editColumn";
    label: string;
    numeric?: boolean;
    width: number;
    className?: string;
}

export interface EditCargoProps {
    Id: string;
}