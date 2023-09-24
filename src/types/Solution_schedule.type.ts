export interface Solution_schedule {
    solution_id: number;
    FTS_id: number;
    carrier_id: number;
    lat: number;
    lng: number;
    arrivaltime: Date | any;
    exittime: Date | any;
    operation_time: number | null;
    Setup_time: number | null;
    travel_Distance: number | null;
    travel_time: number | null;
    operation_rate: number | null;
    consumption_rate: number | null;
    id: number;
    FTS_name: string;
    setuptime_FTS: number;
    speed: number;
    cr_id: number | null;
    carrier_name: null | string;
    holder: null | string;
    maxcapacity: number | null;
    burden: number | null;
}