import { useSelector } from 'react-redux';
import { RootState } from '../../../../store/store';
import { TableContainer, TableHead, TableCell, Table, Paper, TableRow, TableBody } from '@mui/material';

type Props = {}

export default function FTS({ }: Props) {
    const MainTainFTSReducer = useSelector((state: RootState) => state.mainTainFTSReducer);

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
                    {(MainTainFTSReducer.data).map((items) => (
                        <TableRow
                            key={items.maintain_FTS_id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {items.fts.FTS_name}
                            </TableCell>
                            <TableCell align="right">{items.desc_FTS}</TableCell>
                            <TableCell align="right">{items.downtime_FTS}</TableCell>
                            <TableCell align="right">{items.start_time_FTS}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}