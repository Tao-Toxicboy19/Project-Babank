import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { titles } from '../../../Constants';

function createData(
    nameCarrier: string,
    floating: number,
    revenue: number,
    goodsOperation: number,
    awardRevenue: number,
    costs: number,
    fuelCost: number,
    wageCost: number,
    penaltyCost: number
) {
    return { nameCarrier, floating, revenue, goodsOperation, awardRevenue, costs, fuelCost, wageCost, penaltyCost };
}

const rows = [
    createData('ทุ่น A', 1, 999999, 999999, 999999, 99999, 99999, 9999, 9999),
    createData('ทุ่น B', 2, 999999, 999999, 999999, 99999, 99999, 9999, 9999),
    createData('ทุ่น C', 3, 999999, 999999, 999999, 99999, 99999, 9999, 9999),
];

export default function RoutesPage() {
    return (
        <>
            <TableContainer component={Paper}>
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
                        {rows.map((row) => (
                            <TableRow
                                key={row.nameCarrier}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align="right">{row.nameCarrier}</TableCell>
                                <TableCell align="right">{row.floating}</TableCell>
                                <TableCell align="right">{row.revenue}</TableCell>
                                <TableCell align="right">{row.goodsOperation}</TableCell>
                                <TableCell align="right">{row.awardRevenue}</TableCell>
                                <TableCell align="right">{row.costs}</TableCell>
                                <TableCell align="right">{row.fuelCost}</TableCell>
                                <TableCell align="right">{row.wageCost}</TableCell>
                                <TableCell align="right">{row.penaltyCost}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}
