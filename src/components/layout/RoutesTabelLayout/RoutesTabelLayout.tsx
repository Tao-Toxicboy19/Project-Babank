import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { titles } from '../../../Constants';

export default function RoutesTabelLayout({ FTSsolutionSlice, value }: any) {
    const SolutionscheduleReducer = useSelector((state: RootState) => state.Solutionschedule.solution_schedule);


    return (
        <>
            <TableContainer component={Paper} className='mt-5 max-h-[65vh]'>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead className='bg-[#68d8d6]/75'>
                        <TableRow>
                            {titles.map((title) => (
                                <TableCell
                                    key={title}
                                    align={title === 'ชื่อทุ่น' ? 'left' : 'right'}
                                    className='font-kanit'
                                >
                                    {title}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(SolutionscheduleReducer)
                            .filter((items) => items.FTS_name === FTSsolutionSlice[value]?.fts.FTS_name)
                            .map((items, index) => (
                                <TableRow
                                    key={index}
                                >
                                    <TableCell
                                        align="left"
                                        className='w-[100px] font-kanit'
                                    >
                                        {items.FTS_name}
                                    </TableCell>
                                    <TableCell
                                        className='font-kanit'
                                        align="right"
                                    >
                                        {items.carrier_name ? items.carrier_name : 'จุดเริ่มต้น'}
                                    </TableCell>
                                    <TableCell
                                        className='font-kanit'
                                        align="right"
                                    >
                                        {items.lat}
                                    </TableCell>
                                    <TableCell
                                        className='font-kanit'
                                        align="right"
                                    >
                                        {items.lng}
                                    </TableCell>
                                    <TableCell
                                        className='font-kanit'
                                        align="right"
                                    >
                                        {items.arrivaltime}
                                    </TableCell>
                                    <TableCell
                                        align="right"
                                    >
                                        {items.exittime}
                                    </TableCell>
                                    <TableCell
                                        align="right"
                                    >
                                        {items.operation_time}
                                    </TableCell>
                                    <TableCell
                                        className='font-kanit'
                                        align="right"
                                    >
                                        {items.travel_Distance}
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}
