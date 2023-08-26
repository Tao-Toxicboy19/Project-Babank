import { ColumnData } from "../../../types/FloatingCrane.type";

export const columns: ColumnData[] = [
    {
        width: 80,
        label: "Name",
        dataKey: "floating_name",
        numeric: true,
    },
    {
        width: 120,
        label: "Description",
        dataKey: "description",
        numeric: true,
    },
    {
        width: 120,
        label: "Latitude",
        dataKey: "latitude",
        numeric: true,
    },
    {
        width: 120,
        label: "Longitude",
        dataKey: "longitude",
        numeric: true,
    },
    {
        width: 150,
        label: "Setup time",
        dataKey: "setuptime",
        numeric: true,
    },
    {
        width: 140,
        label: "Speed",
        dataKey: "speed",
        numeric: true,
    },
    {
        width: 80,
        label: "Edit",
        dataKey: "editColumn",
        numeric: true,
    },
];