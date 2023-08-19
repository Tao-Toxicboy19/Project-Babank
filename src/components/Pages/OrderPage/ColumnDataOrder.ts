import { ColumnData } from "../../../types/Order.type";

export const columns: ColumnData[] = [
    {
        width: 80,
        label: "Order ID",
        dataKey: "order_id",
        numeric: true,
    },
    {
        width: 120,
        label: "Carrier",
        dataKey: "carrier_name",
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
        label: "Load",
        dataKey: "load_status",
        numeric: true,
    },
    {
        width: 120,
        label: "Category",
        dataKey: "category",
        numeric: true,
    },
    {
        width: 150,
        label: "Arrival time",
        dataKey: "arrival_time",
        numeric: true,
    },
    {
        width: 150,
        label: "Deadline time",
        dataKey: "deadline_time",
        numeric: true,
    },
    {
        width: 140,
        label: "Latitude",
        dataKey: "latitude",
        numeric: true,
    },
    {
        width: 140,
        label: "Longitude",
        dataKey: "longitude",
        numeric: true,
    },
    {
        width: 50,
        label: "Edit",
        dataKey: "editColumn",
        numeric: true,
    },
];