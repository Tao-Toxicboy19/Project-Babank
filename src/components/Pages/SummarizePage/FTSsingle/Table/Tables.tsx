import { Box } from '@mui/material';
import { useSelector } from 'react-redux';
import { Typography } from '@mui/material';
import { craneSolutionTableV2Selector } from '../../../../../store/slices/Solution/craneSolutionTableSlice';

type Props = {
    value: any
    Name: any
}


export default function Tables({ Name }: Props) {
    const CraneSolutionV2Reducer = useSelector(craneSolutionTableV2Selector)


    const filteredData = (CraneSolutionV2Reducer.result).filter(item => item.fts.FTS_name === Name);

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
                    ต้นรวมทุน
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
                {(filteredData).map((items: any) => (
                    <>
                        <Typography
                            align="left"
                            className='font-kanit text-lg'
                        >
                            {items.crane.crane_name}
                        </Typography>
                        <Typography
                            align="center"
                            className='font-kanit text-lg'
                        >
                            {items.total_cost.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        </Typography>

                        <Typography
                            align="center"
                            className='font-kanit text-lg'
                        >
                            {items.total_consumption_cost.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        </Typography>
                        <Typography
                            align="center"
                            className='font-kanit text-lg'
                        >
                            {items.total_wage_cost.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        </Typography>
                        <Typography
                            align="center"
                            className='font-kanit text-lg'
                        >
                            {items.penality_cost.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        </Typography>
                        <Typography
                            align="center"
                            className='font-kanit text-lg'
                        >
                            {items.total_reward.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        </Typography>
                        <hr className='col-span-6' />
                    </>
                ))}
                <hr className='col-span-6' />
            </Box>
        </>
    )
}