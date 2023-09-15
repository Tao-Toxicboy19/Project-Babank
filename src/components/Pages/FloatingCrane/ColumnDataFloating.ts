import { ColumnFloating } from "../../../types/FloatingCrane.type";

export const columns: ColumnFloating[] = [
    {
        width: 100,
        label: 'ตำแหน่งทุ่น',
        dataKey: 'map',
    },
    {
        width: 150,
        label: 'ชื่อ',
        dataKey: 'floating_name',
    },
    {
        width: 120,
        label: 'จำนวนเครน',
        dataKey: 'NumberOfCranes',
        numeric: true,
    },
    {
        width: 120,
        label: 'ละติจูด',
        dataKey: 'latitude',
        numeric: true,
    },
    {
        width: 120,
        label: 'ลองจิจูด',
        dataKey: 'longitude',
        numeric: true,
    },
    {
        width: 120,
        label: 'เวลาเตรียมความพร้อม',
        dataKey: 'setuptime',
        numeric: true,
    },
    {
        width: 120,
        label: 'ความเร็วการเคลื่อนย้าย',
        dataKey: 'speed',
        numeric: true,
    },
    {
        width: 80,
        label: "แก้ไข",
        dataKey: "editColumn",
        numeric: true,
    },
]