import { ColumnCargo } from "../../../types/Cargo.type";

export const columns: ColumnCargo[] = [
    {
        width: 40,
        label: '#',
        dataKey: 'cargo_id',
    },
    {
        width: 150,
        label: 'ชื่อสินค้า',
        dataKey: 'cargo_name',
    },
    {
        width: 120,
        label: 'อัตราการใช้น้ำมัน (ลิตร/ตัน)',
        dataKey: 'consumption_rate',
        numeric: true,
    },
    {
        width: 150,
        label: 'อัตราการขนถ่ายสินค้า (ตัน/ชม.)',
        dataKey: 'work_rate',
        numeric: true,
    },
    {
        width: 120,
        label: 'สถานะสินค้า (ขาเข้า/ขาออก)',
        dataKey: 'category',
        numeric: true,
    },
    {
        width: 80,
        label: "แก้ไข",
        dataKey: "editColumn",
        numeric: true,
    },
]