import { ColumnsCarrier } from "../../../types/Carrier.type";


export const columns: ColumnsCarrier[] = [
    {
        width: 150,
        label: 'ชื่อ',
        dataKey: 'carrier_name',
    },
    {
        width: 120,
        label: 'ชื่อบริษัท',
        dataKey: 'holder',
        numeric: true,
    },
    {
        width: 150,
        label: 'ความจุสูงสุด (ตัน)	',
        dataKey: 'maxcapacity',
        numeric: true,
    },
    {
        width: 120,
        label: 'จำนวนระวาง',
        dataKey: 'burden',
        numeric: true,
    },
    {
        width: 80,
        label: "แก้ไข",
        dataKey: "editColumn",
        numeric: true,
    },
]