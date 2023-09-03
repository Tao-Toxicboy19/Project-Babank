import { ColumnData } from "../../../types/CargoCrane.type";

export const columns: ColumnData[] = [
    {
        width: 80,
        label: "ชื่อสินค้า",
        dataKey: "cargo_name",
        numeric: true,
        className: "text-[14px]  font-normal",
    },
    {
        width: 80,
        label: "ชื่อทุ่น",
        dataKey: "floating_name",
        numeric: true,
        className: "text-[14px]  font-normal",
    },
    {
        width: 100,
        label: "ลำดับเครนที่",
        dataKey: "crane",
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
        width: 50,
        label: "Edit",
        dataKey: "editColumn",
        numeric: true,
        className: "text-[14px]  font-normal",
    },
]