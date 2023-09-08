import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(
    nameCarrier: string,
    iconMap: string,
    inTimer: string,
    outTime: string,
    distance: number,
    operation: number,
) {
    return { nameCarrier, iconMap, inTimer, outTime, distance, operation };
}

const rows = [
    createData('ทุ่น A', 'A', '07-09-2566', '07-09-2566', 4545, 45),
    createData('ทุ่น B', 'B', '07-09-2566', '07-09-2566', 454, 45),
    createData('ทุ่น C', 'C', '07-09-2566', '07-09-2566', 644, 45),
];

export default function SummarizePage() {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead className='bg-blue-200'>
                    <TableRow>
                        <TableCell>ชื่อตำแหน่ง</TableCell>
                        <TableCell align="right">ไอคอนในแผนที่</TableCell>
                        <TableCell align="right">วันเวลาาเข้า</TableCell>
                        <TableCell align="right">วันเวลาออก</TableCell>
                        <TableCell align="right">ระยะทาง (km)</TableCell>
                        <TableCell align="right">เวลาที่ใช้ดำเนินการ (hr:min)</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow
                            key={row.nameCarrier}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">{row.nameCarrier}</TableCell>
                            <TableCell align="right">{row.iconMap}</TableCell>
                            <TableCell align="right">{row.inTimer}</TableCell>
                            <TableCell align="right">{row.outTime}</TableCell>
                            <TableCell align="right">{row.distance}</TableCell>
                            <TableCell align="right">{row.operation}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
