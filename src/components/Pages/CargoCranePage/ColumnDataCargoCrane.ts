import { ColumnData } from "../../../types/CargoCrane.type";

export const columns: ColumnData[] = [
    {
        width: 60,
        label: "Cargo Crane ID",
        dataKey: "cargo_crane_id",
        numeric: true,
    },
    {
        width: 120,
        label: "Cargo",
        dataKey: "cargo_name",
        numeric: true,
    },
    {
        width: 120,
        label: "Floating Crane",
        dataKey: "floating_name",
        numeric: true,
    },
    {
        width: 120,
        label: "Consumption rate",
        dataKey: "consumption_rate",
        numeric: true,
    },
    {
        width: 120,
        label: "Work rate",
        dataKey: "work_rate",
        numeric: true,
    },
    {
        width: 120,
        label: "Category",
        dataKey: "category",
        numeric: true,
    },
    {
        width: 50,
        label: "Edit",
        dataKey: "editColumn",
        numeric: true,
    },
]