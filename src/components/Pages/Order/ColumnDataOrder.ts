import { ColumnOrder } from "../../../types/Order.type";

export const columns: ColumnOrder[] = [
    {
        width: 120,
        label: 'ชื่อเรือ',
        dataKey: 'carrier_name',
    },
    {
        width: 120,
        label: 'สถานะสินค้า(ขาเข้า/ ขาออก)',
        dataKey: 'category',
        numeric: true,
    },
    {
        width: 120,
        label: 'สถานะสินค้า (ขาเข้า/ขาออก)',
        dataKey: 'cargo_name',
        numeric: true,
    },
    {
        width: 100,
        label: 'ปริมาณสินค้า (ตัน)',
        dataKey: 'load',
        numeric: true,
    },
    {
        width: 100,
        label: 'จำนวนระวาง',
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
        label: 'จำนวนทุ่นเข้าสูงสุด',
        dataKey: 'maxFTS',
        numeric: true,
    },
    {
        width: 120,
        label: 'ค่าปรับ (บาท)',
        dataKey: 'penalty_rate',
        numeric: true,
    },
    {   
        width: 120,
        label: 'รางวัล (บาท)',
        dataKey: 'reward_rate',
        numeric: true,
    },
    // {
    //     width: 80,
    //     label: "แก้ไข",
    //     dataKey: "editColumn",
    //     numeric: true,
    // },
]
