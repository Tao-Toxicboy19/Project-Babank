import { ColumnData } from "../../../types/Order.type";

export const columns: ColumnData[] = [
    {
        width: 100,
        label: "ชื่อเรือ",
        dataKey: "carrier_name",
        numeric: true,
        className: "text-[14px]  font-normal",
    },
    {
        width: 100,
        label: "ประเภทสินค้า",
        dataKey: "cargo_name",
        numeric: true,
        className: "text-[14px]  font-normal",
    },
    {
        width: 100,
        label: "ปริมาณสินค้า (ตัน)",
        dataKey: "load_status",
        numeric: true,
        className: "text-[14px]  font-normal",
    },
    {
        width: 100,
        label: "สถานะสินค้า (ขาเข้า/ขาออก)",
        dataKey: "category",
        numeric: true,
        className: "text-[14px]  font-normal",
    },
    {
        width: 100,
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
        width: 100,
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
        width: 100,
        label: "จำนวนระวาง",
        dataKey: "bulks",
        numeric: true,
        className: "text-[14px]  font-normal",
    },
    {
        width: 100,
        label: "จำนวนทุ่นเข้าสูงสุด",
        dataKey: "maxFTS",
        numeric: true,
        className: "text-[14px]  font-normal",
    },
    {
        width: 100,
        label: "แก้ไข",
        dataKey: "editColumn",
        numeric: true,
        className: "text-[14px]  font-normal",
    },
];

