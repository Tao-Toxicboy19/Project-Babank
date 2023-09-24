import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { titles } from '../../../../../Constants';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Typography } from '@mui/material';

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

export default function RoutesLayout({ selectedValue }: any) {
    const [data, setData] = useState<Solution_schedule[]>([]);

    useEffect(() => {
        const fetch = async () => {
            try {
                const result = await axios.get('http://crane.otpzlab.com:7070/api/solution_schedule')
                setData(result.data)
            } catch (error) {
                console.log(error);
            }
        }
        fetch()
    }, []);

    return (
        <>
            <TableContainer component={Paper} className='mt-5'>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead className='bg-blue-200'>
                        <TableRow>
                            {titles.map((title) => (
                                <TableCell key={title} align={title === 'FTS' ? 'left' : 'right'}>
                                    {title}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data
                            .filter((items) => items.FTS_name === selectedValue)
                            .map((items, index) => (
                                <TableRow
                                    key={index}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell align="right">{items.FTS_name}</TableCell>
                                    <TableCell align="right">
                                        {items.carrier_name ? items.carrier_name : 'จุดเริ่มต้น'}
                                    </TableCell>
                                    <TableCell align="right">{items.lat}</TableCell>
                                    <TableCell align="right">{items.lng}</TableCell>
                                    <TableCell align="right">{items.arrivaltime}</TableCell>
                                    <TableCell align="right">{items.exittime}</TableCell>
                                    <TableCell align="right">{items.operation_time}</TableCell>
                                    <TableCell align="right">{items.travel_Distance}</TableCell>
                                </TableRow>
                            ))}
                    </TableBody>

                </Table>
            </TableContainer>
        </>
    );
}
