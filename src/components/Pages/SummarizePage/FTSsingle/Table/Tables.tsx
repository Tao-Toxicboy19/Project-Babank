import { Box } from '@mui/material';
import { useSelector } from 'react-redux';
import { Typography } from '@mui/material';
import { craneSelector } from '../../../../../store/slices/Crane/craneSlice';

type Props = {
    value: number
    rows: any[]
    ftsName: number
}


export default function Tables({ rows, ftsName }: Props) {
    const craneReducer = useSelector(craneSelector)
    const results = rows.filter(r => r.FTS_id === ftsName)

    return (
        <>
            <Box className='grid grid-cols-6 gap-3 mt-3'>
                <Typography
                    className='font-kanit'
                    sx={{
                        backgroundColor: 'background.paper',
                        fontWeight: 'Bold',
                        fontSize: 18
                    }}
                >
                    ชื่อเครน
                </Typography>
                <Typography
                    className='font-kanit flex justify-center'
                    sx={{
                        backgroundColor: 'background.paper',
                        fontWeight: 'Bold',
                        fontSize: 18
                    }}
                >
                    รายจ่าย
                </Typography>
                <Typography
                    className='font-kanit flex justify-center'
                    sx={{
                        backgroundColor: 'background.paper',
                        fontWeight: 'Bold',
                        fontSize: 18
                    }}
                >
                    ค่าเชื้อเพลิงรวม
                </Typography>

                <Typography
                    className='font-kanit flex justify-center '
                    sx={{
                        backgroundColor: 'background.paper',
                        fontWeight: 'Bold',
                        fontSize: 18
                    }}
                >
                    ค่าแรง
                </Typography>

                <Typography
                    className='font-kanit flex justify-center'
                    sx={{
                        backgroundColor: 'background.paper',
                        fontWeight: 'Bold',
                        fontSize: 18
                    }}
                >
                    ค่าปรับล่าช้า
                </Typography>
                <Typography
                    className='font-kanit flex justify-center'
                    sx={{
                        backgroundColor: 'background.paper',
                        fontWeight: 'Bold',
                        fontSize: 18
                    }}
                >
                    รางวัล
                </Typography>
                <hr className='col-span-6' />
                {results.map((row, index: number) => {
                    const allCraneNames: any[] = [];

                    results.forEach((row) => {
                        const craneNames = (craneReducer.result).filter((item) => item.id === row.crane_id);
                        allCraneNames.push(...craneNames);
                    })

                    return (
                        <Box
                            key={index}
                            className='col-span-6 grid grid-cols-6'
                        >
                            <Typography
                                align="left"
                                className='font-kanit text-lg'
                            >
                                {allCraneNames[index].crane_name}
                            </Typography>
                            <Typography
                                align="center"
                                className='font-kanit text-lg'
                            >
                                {(row.total_consumption_cost
                                    + row.total_wage_cost
                                    + row.penality_cost
                                ).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            </Typography>

                            <Typography
                                align="center"
                                className='font-kanit text-lg'
                            >
                                {row.total_consumption_cost.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            </Typography>
                            <Typography
                                align="center"
                                className='font-kanit text-lg'
                            >
                                {row.total_wage_cost.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            </Typography>
                            <Typography
                                align="center"
                                className='font-kanit text-lg'
                            >
                                {row.penality_cost.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            </Typography>
                            <Typography
                                align="center"
                                className='font-kanit text-lg'
                            >
                                {row.total_reward.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            </Typography>
                        </Box>
                    )
                })}
                <hr className='col-span-6' />
                <hr className='col-span-6' />
            </Box>
        </>
    )
}