import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { httpClient } from '../../../../../utils/httpclient';
import { apiUrlV2 } from '../../../../../Constants';
import { roleSelector } from '../../../../../store/slices/auth/rolesSlice';

type CraneTable = {
    crane_id: number;
    total_cost: number;
    total_consumption_cost: number;
    penality_cost: number;
    total_all_costs: number;
    crane_name: string;
    total_reward_costs: number;
    id: number;
}


export default function Tables({ ftsName }: {  ftsName: any }) {
    // const craneReducer = useSelector(craneSelector)
    // const results = rows.filter(r => r.FTS_id === ftsName)
    const [data, setData] = useState<CraneTable[]>([])
    const roleReducer = useSelector(roleSelector)
    const id = roleReducer.result?.group
    if (!id) return
    const fetch = async () => {
        const res = await httpClient.get(`${apiUrlV2}/table/crane/${id}`)
        setData(res.data)
    }

    useEffect(() => {
        fetch()
    }, []);
    const values = data.filter(r => r.id === ftsName)

    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell
                                className='font-kanit bg-sky-300'
                                sx={{
                                    backgroundColor: 'background.paper',
                                    fontWeight: 'Bold',
                                    fontSize: 18
                                }}
                            >
                                ชื่อเครน
                            </TableCell>
                            <TableCell align="center"
                                className='font-kanit bg-sky-300'
                                sx={{
                                    backgroundColor: 'background.paper',
                                    fontWeight: 'Bold',
                                    fontSize: 18
                                }}
                            >
                                ต้นทุนรวม (บาท)
                            </TableCell>
                            <TableCell align="center"
                                className='font-kanit bg-sky-300'
                                sx={{
                                    backgroundColor: 'background.paper',
                                    fontWeight: 'Bold',
                                    fontSize: 18
                                }}
                            >
                                ค่าเชื้อเพลิงรวม (ลิตร)
                            </TableCell>
                            <TableCell align="center"
                                className='font-kanit bg-sky-300'
                                sx={{
                                    backgroundColor: 'background.paper',
                                    fontWeight: 'Bold',
                                    fontSize: 18
                                }}
                            >
                                ค่าแรง (บาท)
                            </TableCell>
                            <TableCell align="center"
                                className='font-kanit bg-sky-300'
                                sx={{
                                    backgroundColor: 'background.paper',
                                    fontWeight: 'Bold',
                                    fontSize: 18
                                }}
                            >
                                ค่าปรับล่าช้า (บาท)
                            </TableCell>
                            <TableCell align="center"
                                className='font-kanit bg-sky-300'
                                sx={{
                                    backgroundColor: 'background.paper',
                                    fontWeight: 'Bold',
                                    fontSize: 18
                                }}
                            >
                                รางวัล (บาท)
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {values.map((row, index: number) => (
                            <TableRow
                                key={index}
                                // className='col-span-6 grid grid-cols-6'
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell
                                    align="left"
                                    className='font-kanit text-lg'
                                >
                                    {row.crane_name}
                                </TableCell>
                                <TableCell
                                    align="center"
                                    className='font-kanit text-lg'
                                >
                                    {/* {(row.total_consumption_cost
                                        + row.total_wage_cost
                                        + row.penality_cost
                                    ).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')} */}
                                </TableCell>

                                <TableCell
                                    align="center"
                                    className='font-kanit text-lg'
                                >
                                    {(row.total_consumption_cost).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                </TableCell>
                                <TableCell
                                    align="center"
                                    className='font-kanit text-lg'
                                >
                                    {row.total_cost.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                </TableCell>
                                <TableCell
                                    align="center"
                                    className='font-kanit text-lg'
                                >
                                    {row.penality_cost.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                </TableCell>
                                <TableCell
                                    align="center"
                                    className='font-kanit text-lg'
                                >
                                    {row.total_reward_costs.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}