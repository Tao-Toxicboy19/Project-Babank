import { ColumnData } from "../../../types/Order.type";

export const columns: ColumnData[] = [
    {
        width: 150,
        label: "Carrier",
        dataKey: "carrier_name",
        numeric: true,
        className: "text-[14px]  font-normal",
    },
    {
        width: 120,
        label: "Cargo",
        dataKey: "cargo_name",
        numeric: true,
        className: "text-[14px]  font-normal",
    },
    {
        width: 100,
        label: "Load",
        dataKey: "load_status",
        numeric: true,
        className: "text-[14px]  font-normal",
    },
    {
        width: 100,
        label: "Category",
        dataKey: "category",
        numeric: true,
        className: "text-[14px]  font-normal",
    },
    {
        width: 180,
        label: "Arrival time",
        dataKey: "arrival_time",
        numeric: true,
        className: "text-[14px]  font-normal",
    },
    {
        width: 180,
        label: "Deadline time",
        dataKey: "deadline_time",
        numeric: true,
        className: "text-[14px]  font-normal",
    },
    {
        width: 130,
        label: "Latitude",
        dataKey: "latitude",
        numeric: true,
        className: "text-[14px]  font-normal",
    },
    {
        width: 130,
        label: "Longitude",
        dataKey: "longitude",
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
];

