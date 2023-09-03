import { ColumnData } from "../../../types/Cargo.type";

export const columns: ColumnData[] = [
    {
        width: 80,
        label: "ชื่อสินค้า",
        dataKey: "cargo_name",
        numeric: true,
        className: "text-[14px]  font-normal",
    },
    {
        width: 150,
        label: "อัตราการใช้น้ำมัน (ลิตร/ตัน)",
        dataKey: "consumption_rate",
        numeric: true,
        className: "text-[14px]  font-normal",
    },
    {
        width: 150,
        label: "อัตราการขนถ่ายสินค้า (ตัน/ชม.)",
        dataKey: "work_rate",
        numeric: true,
        className: "text-[14px]  font-normal",
    },
    {
        width: 150,
        label: "สถานะสินค้า (ขาเข้า/ขาออก)",
        dataKey: "category",
        numeric: true,
        className: "text-[14px]  font-normal",
    },
    {
        width: 70,
        label: "แก้ไข",
        dataKey: "editColumn",
        numeric: true,
        className: "text-[14px]  font-normal",
    },
]