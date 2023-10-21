import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store/store';

type Props = {

}

const showThead = () => {
    return (
        <TableRow>
            {["ชื่อเครน", "รายจ่าย", "ค่าเชื้อเพลิง", "ค่าเเรง", "ค่าปรับล่าช้า", "รางวัลรวม"].map((title) => (
                <TableCell
                    key={title}
                    align={title === 'ชื่อเรือ' ? 'left' : 'center'}
                    className='font-kanit'
                    sx={{
                        backgroundColor: 'background.paper',
                        fontWeight: 'Bold',
                        fontSize: 18
                    }}
                >
                    {title}
                </TableCell>
            ))}
        </TableRow>
    )
}


export default function TreeTable({ }: Props) {
    const FTSsolutionReducer = useSelector((state: RootState) => state.FTSsolution);


    return (
        <>
            <TableContainer component={Paper}>
                <Table
                    aria-label="simple table"
                    sx={{
                        borderCollapse: "collapse",
                        "& td, & th": {
                            padding: "14px",
                            borderBottom: "1px solid #ddd",
                        },
                    }}
                >
                    <TableHead>
                        {showThead()}
                    </TableHead>
                    {(FTSsolutionReducer.result).map((items) => (
                        <TableBody
                            key={items.fts.id}
                        >
                            <TableCell
                                align="center"
                                className='font-kanit text-lg'
                            >
                                {items.fts.FTS_name}
                            </TableCell>
                            <TableCell
                                align="center"
                                className='font-kanit text-lg'
                            >
                                {items.solutions.reduce((total, solution) => total + solution.total_cost, 0)}
                            </TableCell>
                            <TableCell
                                align="center"
                                className='font-kanit text-lg'
                            >
                                {items.solutions.reduce((total, solution) => total + solution.total_consumption_cost, 0)}
                            </TableCell>
                            <TableCell
                                align="center"
                                className='font-kanit text-lg'
                            >
                                {items.solutions.reduce((total, solution) => total + solution.total_wage_cost, 0)}
                            </TableCell>
                            <TableCell
                                align="center"
                                className='font-kanit text-lg'
                            >
                                {items.solutions.reduce((total, solution) => total + solution.penality_cost, 0)}
                            </TableCell>
                            <TableCell
                                align="center"
                                className='font-kanit text-lg'
                            >
                                {items.solutions.reduce((total, solution) => total + solution.total_reward, 0)}
                            </TableCell>
                        </TableBody>
                    ))}
                </Table>
            </TableContainer>
        </>
    );
}