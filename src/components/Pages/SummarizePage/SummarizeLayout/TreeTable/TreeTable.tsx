import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../../../../store/store';
import { useEffect } from 'react';
import { totalTableAsync, totalTableAsyncSelector } from '../../../../../store/slices/Solution/totalTableFTSSlice';
import { roleSelector } from '../../../../../store/slices/auth/rolesSlice';


const showThead = () => {
    return (
        <TableRow>
            {["ชื่อทุ่น", "ต้นทุนรวม (บาท)", "ค่าเชื้อเพลิง (บาท)", "ค่าเเรง (บาท)", "ค่าปรับล่าช้า (บาท)", "รางวัลรวม (บาท)"].map((title) => (
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


export default function TreeTable() {
    const totalTableReducer = useSelector(totalTableAsyncSelector)
    const dispatch = useAppDispatch()
    const roleReducer = useSelector(roleSelector)
    const id = roleReducer.result?.group
    if(!id) return
    useEffect(() => {
        dispatch(totalTableAsync(id))
    }, [])

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
                    {(totalTableReducer.result).map((items, index) => {
                        // const ftsResult = (ftsReducer.result).find((item: any) => item.fts_id === items.FTS_id);



                        return (
                            <TableBody key={index}>
                                <TableCell align="center" className='font-kanit text-lg'>
                                    {items.FTS_name}
                                </TableCell>
                                <TableCell align="center" className='font-kanit text-lg'>
                                    {(items.total_consumption_cost_sum + items.penality_cost_sum + items.total_cost_sum).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                </TableCell>
                                <TableCell align="center" className='font-kanit text-lg'>
                                    {items.total_consumption_cost_sum.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                </TableCell>
                                <TableCell align="center" className='font-kanit text-lg'>
                                    {(items.total_cost_sum)
                                        .toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                </TableCell>
                                <TableCell align="center" className='font-kanit text-lg'>
                                    {(items.penality_cost_sum)
                                        .toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                </TableCell>
                                <TableCell align="center" className='font-kanit text-lg'>
                                    {(items.total_reward_sum)
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