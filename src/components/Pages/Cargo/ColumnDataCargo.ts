import { ColumnData } from "../../../types/Cargo.type";

export const columns: ColumnData[] = [
    {
        width: 80,
        label: "Cargo name",
        dataKey: "cargo_name",
        numeric: true,
        className: "text-[14px]  font-normal",
    },
    {
        width: 150,
        label: "Consumption rate",
        dataKey: "consumption_rate",
        numeric: true,
        className: "text-[14px]  font-normal",
    },
    {
        width: 150,
        label: "Work rate",
        dataKey: "work_rate",
        numeric: true,
        className: "text-[14px]  font-normal",
    },
    {
        width: 150,
        label: "Category",
        dataKey: "category",
        numeric: true,
        className: "text-[14px]  font-normal",
    },
    {
        width: 70,
        label: "Edit",
        dataKey: "editColumn",
        numeric: true,
        className: "text-[14px]  font-normal",
    },
]