import { ColumnData } from "../../../types/FloatingCrane.type";

export const columns: ColumnData[] = [
    {
        width: 80,
        label: "ชื่อ",
        dataKey: "floating_name",
        numeric: true,
        className: "text-[14px]  font-normal",
    },
    {
        width: 120,
        label: "จำนวนเครน",
        dataKey: "NumberOfCranes",
        numeric: true,
        className: "text-[14px]  font-normal",
    },
    {
        width: 120,
        label: "ละติจูด",
        dataKey: "latitude",
        numeric: true,
        className: "text-[14px]  font-normal",
    },
    {
        width: 120,
        label: "ลองจิจูด",
        dataKey: "longitude",
        numeric: true,
        className: "text-[14px]  font-normal",
    },
    {
        width: 140,
        label: "เวลาเตรียมความพร้อม (นาที)",
        dataKey: "setuptime",
        numeric: true,
        className: "text-[14px]  font-normal",
    },
    {
        width: 140,
        label: "ความเร็วการเคลื่อนย้าย (กม./ชม.)",
        dataKey: "speed",
        numeric: true,
        className: "text-[14px]  font-normal",
    },
    {
        width: 80,
        label: "แก้ไข",
        dataKey: "editColumn",
        numeric: true,
        className: "text-[14px]  font-normal",
    },
];
