import { ColumnData } from "../../../types/FloatingCrane.type";

export const columns: ColumnData[] = [
    {
        width: 80,
        label: "Name",
        dataKey: "floating_name",
        numeric: true,
        className: "text-[14px]  font-normal",
    },
    {
        width: 120,
        label: "Description",
        dataKey: "description",
        numeric: true,
        className: "text-[14px]  font-normal",
    },
    {
        width: 120,
        label: "Latitude",
        dataKey: "latitude",
        numeric: true,
        className: "text-[14px]  font-normal",
    },
    {
        width: 120,
        label: "Longitude",
        dataKey: "longitude",
        numeric: true,
        className: "text-[14px]  font-normal",
    },
    {
        width: 140,
        label: "Setup time",
        dataKey: "setuptime",
        numeric: true,
        className: "text-[14px]  font-normal",
    },
    {
        width: 140,
        label: "Speed",
        dataKey: "speed",
        numeric: true,
        className: "text-[14px]  font-normal",
    },
    {
        width: 80,
        label: "Edit",
        dataKey: "editColumn",
        numeric: true,
        className: "text-[14px]  font-normal",
    },
];
