import { ColumnData } from "../../../types/CargoCrane.type";

export const columns: ColumnData[] = [
    {
        width: 100,
        label: "Cargo Name",
        dataKey: "cargo_name",
        numeric: true,
        className: "text-[14px]  font-normal",
    },
    {
        width: 120,
        label: "Floating Transfer Station",
        dataKey: "floating_name",
        numeric: true,
        className: "text-[14px]  font-normal",
    },
    {
        width: 120,
        label: "Consumption Rate",
        dataKey: "consumption_rate",
        numeric: true,
        className: "text-[14px]  font-normal",
    },
    {
        width: 120,
        label: "Work rate",
        dataKey: "work_rate",
        numeric: true,
        className: "text-[14px]  font-normal",
    },
    {
        width: 120,
        label: "Category",
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