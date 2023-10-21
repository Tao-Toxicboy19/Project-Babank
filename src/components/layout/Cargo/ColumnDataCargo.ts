import { ColumnCargo } from "../../../types/Cargo.type";

export const columns: ColumnCargo[] = [
    {
        width: 150,
        label: 'ชื่อสินค้า',
        dataKey: 'cargo_name',
    },
    {
        width: 80,
        label: "แก้ไข",
        dataKey: "editColumn",
        numeric: true,
    },
]