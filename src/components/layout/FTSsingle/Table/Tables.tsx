import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store/store';

type Props = {
    value: any
    Name: any
}

const showThead = () => {
    return (
        <TableRow>
            {["ชื่อเครน", "รายจ่าย", "ค่าเชื้อเพลิง", "ค่าเเรง", "ค่าปรับล่าช้า", "รางวัลรวม"].map((title) => (
                <TableCell
                    key={title}
                    align={title === 'ชื่อเครน' ? 'left' : 'center'}
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


export default function Tables({ Name }: Props) {
    const CraneSolutionV2Reducer = useSelector((state: RootState) => state.carneSolutionV2Reducer.result);

    const filteredData = CraneSolutionV2Reducer.filter(item => item.fts.FTS_name === Name);

    return (
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
                {(filteredData).map((items: any) => (
                    <TableBody>
                        <TableCell
                            align="left"
                            className='font-kanit text-lg'
                        >
                            {items.crane.crane_name}
                        </TableCell>
                        <TableCell
                            align="center"
                            className='font-kanit text-lg'
                        >
                            {items.total_cost}
                        </TableCell>

                        <TableCell
                            align="center"
                            className='font-kanit text-lg'
                        >
                            {items.total_consumption_cost}
                        </TableCell>
                        <TableCell
                            align="center"
                            className='font-kanit text-lg'
                        >
                            {items.total_wage_cost}
                        </TableCell>
                        <TableCell
                            align="center"
                            className='font-kanit text-lg'
                        >
                            {items.penality_cost}
                        </TableCell>
                        <TableCell
                            align="center"
                            className='font-kanit text-lg'
                        >
                            {items.total_reward}
                        </TableCell>

                    </TableBody>
                ))}
            </Table>
        </TableContainer>
    )
}