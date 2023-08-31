import { ColumnData } from "../../../types/Carrier.type";

export const columns: ColumnData[] = [
    {
        width: 80,
        label: "Carrier Name",
        dataKey: "carrier_name",
        numeric: true,
        className: "text-[14px]  font-normal",
    },
    {
        width: 100,
        label: "Ower",
        dataKey: "ower",
        numeric: true,
        className: "text-[14px]  font-normal",
    },
    {
        width: 100,
        label: "Maxcapacity",
        dataKey: "maxcapacity",
        numeric: true,
        className: "text-[14px]  font-normal",
    },
    {
        width: 100,
        label: "Burden",
        dataKey: "burden",
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
]