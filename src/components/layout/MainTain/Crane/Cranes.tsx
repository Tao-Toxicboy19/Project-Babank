import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store/store';

export default function Cranes() {
    const MainTainReducer = useSelector((state: RootState) => state.mainTainReducer);

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell
                            className='font-kanit text-lg'
                        >
                            ชื่อเครน
                        </TableCell>
                        <TableCell
                            align="right"
                            className='font-kanit text-lg'
                        >
                            รายละเอียด
                        </TableCell>
                        <TableCell
                            align="right"
                            className='font-kanit text-lg'
                        >
                            เวลาหยุดทำงาน
                        </TableCell>
                        <TableCell
                            align="right"
                            className='font-kanit text-lg'
                        >
                            เวลาเริ่มทำงาน
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {(MainTainReducer.data).map((items) => (
                        <TableRow
                            key={items.maintain_crane_id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {items.crane.crane_name}
                            </TableCell>
                            <TableCell align="right">{items.desc}</TableCell>
                            <TableCell align="right">{items.downtime}</TableCell>
                            <TableCell align="right">{items.start_time}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}