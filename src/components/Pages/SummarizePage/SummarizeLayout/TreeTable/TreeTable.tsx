import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useSelector } from 'react-redux';
import { CraneSOlutionV2 } from '../../../../../store/slices/Solution/craneSolutionV2Slice';
import { ftsSelector } from '../../../../../store/slices/FTS/ftsSlice';

type Props = {
    rows: CraneSOlutionV2[]
}

const showThead = () => {
    return (
        <TableRow>
            {["ชื่อทุ่น", "ต้นทุนรวม", "ค่าเชื้อเพลิง", "ค่าเเรง", "ค่าปรับล่าช้า", "รางวัลรวม"].map((title) => (
                <TableCell
                    key={title}
                    align={title === 'ชื่อเรือ' ? 'left' : 'center'}
                    className='font-kanit bg-sky-300'
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


export default function TreeTable({ rows }: Props) {
    const ftsReducer = useSelector(ftsSelector)

    // นำข้อมูลจาก rows ที่ FTS_id เหมือนกันมากัน
    const combinedResults = rows.reduce((acc: any, row: any) => {
        // ในกรณีที่ยังไม่มี key นี้ใน acc
        if (!acc[row.FTS_id]) {
            acc[row.FTS_id] = { ...row }; // ให้ค่าเป็นข้อมูล row ทั้งหมด
        } else {
            // ในกรณีที่มี key นี้ใน acc แล้ว
            // บวกค่าที่ต้องการรวมเข้ากับค่าที่มีอยู่แล้ว
            acc[row.FTS_id].total_cost += row.total_cost;
            acc[row.FTS_id].total_consumption_cost += row.total_consumption_cost;
            acc[row.FTS_id].total_wage_cost += row.total_wage_cost;
            acc[row.FTS_id].penality_cost = Math.max(acc[row.FTS_id].penality_cost, row.penality_cost);
            acc[row.FTS_id].total_reward = Math.min(acc[row.FTS_id].total_reward, row.total_reward);
            acc[row.FTS_id].total_late_time += row.total_late_time;
            acc[row.FTS_id].total_early_time += row.total_early_time;
            acc[row.FTS_id].total_operation_consumption_cost += row.total_operation_consumption_cost;
            acc[row.FTS_id].total_operation_time += row.total_operation_time;
            acc[row.FTS_id].total_preparation_crane_time += row.total_preparation_crane_time;
            // หากคุณต้องการรวมค่าอื่น ๆ ก็เพิ่มเข้าไปตามต้องการ
        }

        return acc;
    }, {});

    const combinedResultsArray = Object.values(combinedResults);

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
                    <TableHead >
                        {showThead()}
                    </TableHead>
                    {(combinedResultsArray).map((items: any, index) => {
                        const ftsResult = (ftsReducer.result).find((item: any) => item.fts_id === items.FTS_id);

                        return (
                            <TableBody key={index}>
                                <TableCell align="center" className='font-kanit text-lg'>
                                    {ftsResult?.FTS_name}
                                </TableCell>
                                <TableCell align="center" className='font-kanit text-lg'>
                                    {(items.total_consumption_cost + items.total_wage_cost + items.penality_cost)
                                        .toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                </TableCell>
                                <TableCell align="center" className='font-kanit text-lg'>
                                    {(items.total_consumption_cost)
                                        .toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                </TableCell>
                                <TableCell align="center" className='font-kanit text-lg'>
                                    {(items.total_wage_cost)
                                        .toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                </TableCell>
                                <TableCell align="center" className='font-kanit text-lg'>
                                    {(items.penality_cost)
                                        .toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                </TableCell>
                                <TableCell align="center" className='font-kanit text-lg'>
                                    {(items.total_reward)
                                        .toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                </TableCell>
                            </TableBody>
                        );
                    })}
                </Table>
            </TableContainer>
        </>
    );
}