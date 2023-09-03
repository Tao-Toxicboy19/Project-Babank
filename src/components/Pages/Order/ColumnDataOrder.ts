import { ColumnData } from "../../../types/Order.type";

export const columns: ColumnData[] = [
    {
        width: 80,
        label: "ชื่อเรือ",
        dataKey: "carrier_name",
        numeric: true,
        className: "text-[14px]  font-normal",
    },
    {
        width: 120,
        label: "ประเภทสินค้า",
        dataKey: "cargo_name",
        numeric: true,
        className: "text-[14px]  font-normal",
    },
    {
        width: 120,
        label: "ปริมาณสินค้า (ตัน)",
        dataKey: "load_status",
        numeric: true,
        className: "text-[14px]  font-normal",
    },
    {
        width: 120,
        label: "สถานะสินค้า (ขาเข้า/ขาออก)",
        dataKey: "category",
        numeric: true,
        className: "text-[14px]  font-normal",
    },
    {
        width: 140,
        label: "วัน-เวลา มาถึง",
        dataKey: "arrival_time",
        numeric: true,
        className: "text-[14px]  font-normal",
    },
    {
        width: 140,
        label: "วัน-เวลา สิ้นสุด",
        dataKey: "deadline_time",
        numeric: true,
        className: "text-[14px]  font-normal",
    },
    {
        width: 140,
        label: "ละติจูด",
        dataKey: "latitude",
        numeric: true,
        className: "text-[14px]  font-normal",
    },
    {
        width: 140,
        label: "ลองจิจูด",
        dataKey: "longitude",
        numeric: true,
        className: "text-[14px]  font-normal",
    },
    {
        width: 80,
        label: "Edit",
        dataKey: "editColumn",
        numeric: true,
        className: "text-[14px]  font-normal",
    },
];

