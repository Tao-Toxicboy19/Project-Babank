import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { titles } from '../../../../../Constants';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadSolution } from '../../../../../store/slices/sollution_schedule.slice';
import { RootState } from '../../../../../store/store';

export default function RoutesLayout({ selectedValue }: any) {
    const dispatch = useDispatch<any>();
    const SolutionscheduleReducer = useSelector((state: RootState) => state.Solutionschedule);

    useEffect(() => {
        dispatch(loadSolution())
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
                        {(SolutionscheduleReducer.solution_schedule)
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
