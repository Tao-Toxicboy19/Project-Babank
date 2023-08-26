import { ColumnData } from "../../../types/Order.type";

export const columns: ColumnData[] = [
    {
        width: 80,
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
        width: 70,
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
        width: 300, // Adjust the width as needed
        label: "Arrival time",
        dataKey: "arrival_time",
        numeric: true,
    },
    {
        width: 300, // Adjust the width as needed
        label: "Deadline time",
        dataKey: "deadline_time",
        numeric: true,
    },
    {
        width: 130,
        label: "Latitude",
        dataKey: "latitude",
        numeric: true,
    },
    {
        width: 130,
        label: "Longitude",
        dataKey: "longitude",
        numeric: true,
    },
    {
        width: 70,
        label: "Edit",
        dataKey: "editColumn",
        numeric: true,
    },
];

