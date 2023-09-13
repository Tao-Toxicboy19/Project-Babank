import { ColumnCargoCrane } from "../../../types/CargoCrane.type";

export const columns: ColumnCargoCrane[] = [
    {
        width: 40,
        label: '#',
        dataKey: 'cc_id',
    },
    {
        width: 80,
        label: 'ชื่อสินค้า',
        dataKey: 'cargo_name',
    },
    {
        width: 80,
        label: 'ชื่อทุ่น',
        dataKey: 'floating_name',
        numeric: true,
    },
    {
        width: 80,
        label: 'ลำดับเครนที่',
        dataKey: 'crane',
        numeric: true,
    },
    {
        width: 120,
        label: 'อัตราการใช้น้ำมัน (ลิตร/ตัน)',
        dataKey: 'consumption_rate',
        numeric: true,
    },
    {
        width: 120,
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