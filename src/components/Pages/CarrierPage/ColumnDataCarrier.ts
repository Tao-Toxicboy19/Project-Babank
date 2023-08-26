import { ColumnData } from "../../../types/Carrier.type";

export const columns: ColumnData[] = [
    {
        width: 80,
        label: "Carrier Name",
        dataKey: "carrier_name",
        numeric: true,
    },
    {
        width: 100,
        label: "Ower",
        dataKey: "ower",
        numeric: true,
    },
    {
        width: 100,
        label: "Maxcapacity",
        dataKey: "maxcapacity",
        numeric: true,
    },
    {
        width: 100,
        label: "Burden",
        dataKey: "burden",
        numeric: true,
    },
    {
        width: 80,
        label: "Edit",
        dataKey: "editColumn",
        numeric: true,
    },
]