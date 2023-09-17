import { ColumnOrder } from "../../../types/Order.type";

export const columns: ColumnOrder[] = [
    {
        width: 80,
        label: 'ชื่อเรือ',
        dataKey: 'carrier_name',
    },
    {
        width: 80,
        label: 'ชื่อสินค้า',
        dataKey: 'category',
        numeric: true,
    },
    {
        width: 80,
        label: 'ปริมาณสินค้า (ตัน)',
        dataKey: 'cargo_name',
        numeric: true,
    },
    {
        width: 120,
        label: 'สถานะสินค้า (ขาเข้า/ขาออก)',
        dataKey: 'load',
        numeric: true,
    },
    {
        width: 120,
        label: 'วัน-เวลา มาถึง',
        dataKey: 'bulk',
        numeric: true,
    },
    {
        width: 120,
        label: 'วัน-เวลา มาถึง',
        dataKey: 'arrival_time',
        numeric: true,
    },
    {
        width: 120,
        label: 'วัน-เวลา สิ้นสุด',
        dataKey: 'deadline_time',
        numeric: true,
    },
    {
        width: 120,
        label: 'ละติจูด',
        dataKey: 'latitude',
        numeric: true,
    },
    {
        width: 120,
        label: 'ลองจิจูด',
        dataKey: 'longitude',
        numeric: true,
    },
    {
        width: 120,
        label: 'ละติจูด',
        dataKey: 'maxFTS',
        numeric: true,
    },
    {
        width: 80,
        label: "แก้ไข",
        dataKey: "editColumn",
        numeric: true,
    },
]
