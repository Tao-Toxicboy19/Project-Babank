import { ColumnData } from "../../../types/Carrier.type";

export const columns: ColumnData[] = [
    {
        width: 150,
        label: "ชื่อ",
        dataKey: "carrier_name",
        numeric: true,
        className: "text-[14px]  font-normal",
    },
    {
        width: 150,
        label: "ชื่อบริษัท",
        dataKey: "ower",
        numeric: true,
        className: "text-[14px]  font-normal",
    },
    {
        width: 150,
        label: "ความจุสูงสุด (ตัน)",
        dataKey: "maxcapacity",
        numeric: true,
        className: "text-[14px]  font-normal",
    },
    {
        width: 150,
        label: "จำนวนระวาง",
        dataKey: "burden",
        numeric: true,
        className: "text-[14px]  font-normal",
    },
    {
        width: 150,
        label: "แก้ไข",
        dataKey: "editColumn",
        numeric: true,
        className: "text-[14px]  font-normal",
    },
]