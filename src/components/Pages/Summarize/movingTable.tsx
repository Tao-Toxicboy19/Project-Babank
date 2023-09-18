import SummarizePage from './SummarizePage'
import { Box, Card, CardContent, Typography } from '@mui/material'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadCraneSolution } from '../../../store/slices/craneSolution.slice'
import { RootState } from '../../../store/store'
import { loadFtsSolutionV2 } from '../../../store/slices/FTSsolutionV2.slice'
import FTSsingle from './FTSsingle/FTSsingle'

type Props = {}

export default function MovingTablePage({ }: Props) {
    const dispatch = useDispatch<any>();
    const CraneSolutionSlice = useSelector((state: RootState) => state.craneSolution);
    const FtsSolutionV2Slice = useSelector((state: RootState) => state.FTSSolutionV2);

    useEffect(() => {
        dispatch(loadCraneSolution())
        dispatch(loadFtsSolutionV2())
    }, []);

    return (
        <>
        <Box className="flex">
            <Card className="mt-5 flex" sx={{ maxWidth: 870 }}>
                <CardContent>
                    <Typography className='text-lg font-bold mb-3'>สรุปรายละเอียดต้นทุนรวม</Typography>
                    <Box className="flex justify-between">
                        <Typography className="mb-2 mr-4">ต้นนทุนรวม:: {(CraneSolutionSlice.result)?.total_cost} บาท</Typography>
                        <Typography className="mb-2 mr-4">ค่าแรงงาน:: {(CraneSolutionSlice.result)?.total_wage_cost} บาท</Typography>
                        <Typography className="mb-2">ค่าปรับ:: {(CraneSolutionSlice.result)?.penality_cost} บาท</Typography>
                    </Box>
                    <Box className='grid grid-cols-2'>
                        <Box>
                            <Typography className="mb-2">รายรับจากรางวัล:</Typography>
                            <Typography className="mb-2">เวลารวมเสร็จหลังกำหนด:</Typography>
                            <Typography className="mb-2">เวลารวมเสร็จก่อนกำหนด:</Typography>
                            <Typography className="mb-2">ค่าเชื้อเพลิงรวมขนถ่าย:</Typography>
                            <Typography className="mb-2">ค่าเชื้อเพลิงรวมเคลื่อยย้าย:</Typography>
                            <Typography className="mb-2">ระยะรวมทางเคลื่อนย้าย:</Typography>
                            <Typography className="mb-2">เวลารวมดำเนินการขนถ่าย:</Typography>
                            <Typography className="mb-2">เวลารวมเตรียมความพร้อม:</Typography>
                        </Box>
                        <Box className='flex flex-col'>
                            <Typography className='flex justify-end mb-2'>{(CraneSolutionSlice.result)?.total_reward} บาท</Typography>
                            <Typography className='flex justify-end mb-2'>{(CraneSolutionSlice.result)?.total_late_time} บาท</Typography>
                            <Typography className='flex justify-end mb-2'>{(CraneSolutionSlice.result)?.total_early_time} บาท</Typography>
                            <Typography className='flex justify-end mb-2'>{(CraneSolutionSlice.result)?.total_operation_consumption_cost} บาท</Typography>
                            <Typography className='flex justify-end mb-2'>{(CraneSolutionSlice.result)?.total_consumption_cost} บาท</Typography>
                            <Typography className='flex justify-end mb-2'>{(CraneSolutionSlice.result)?.total_preparation_crane_time} บาท</Typography>
                            <Typography className='flex justify-end mb-2'>{(CraneSolutionSlice.result)?.total_operation_time} บาท</Typography>
                            <Typography className='flex justify-end mb-2'>
                                {((CraneSolutionSlice.result)?.total_preparation_crane_time || 0) + ((FtsSolutionV2Slice.result)?.total_preparation_FTS_time || 0)} บาท
                            </Typography>
                        </Box>
                    </Box> 
                    
                </CardContent>
            </Card >
            <Box className="w-[450px] ml-5">
            <FTSsingle/>
            </Box>
            </Box>
            <SummarizePage />
            

            {/* <RoutesPage /> */}
            {/* <Card sx={{ maxWidth: 505 }}>
                <CardContent>
                    <Typography className='text-lg font-bold mb-3'>สรุปรายละเอียดของทุ่น ศุภราช</Typography>
                    <Box className="flex justify-between">
                        <Typography>ค้นทุนรวม:: {totalData?.total_cost} บาท</Typography>
                        <Typography>ค่าแรง:: {totalData?.total_wage_cost} บาท</Typography>
                        <Typography>ค่าทำโทษ:: {totalData?.penality_cost} บาท</Typography>
                    </Box>
                    <Box className='flex justify-between'>
                        <Box>
                            <Typography>รายรับจากรางวัล:</Typography>
                            <Typography>เวลารวมเสร็จหลังกำหนด:</Typography>
                            <Typography>เวลารวมเสร็จก่อนกำหนด:</Typography>
                            <Typography>ค่าเชื้อเพลิงรวมขนถ่าย:</Typography>
                            <Typography>ค่าเชื้อเพลิงรวมเคลื่อยย้าย:</Typography>
                            <Typography>ระยะรวมทางเคลื่อนย้าย:</Typography>
                            <Typography>เวลารวมดำเนินการขนถ่าย:</Typography>
                            <Typography>เวลารวมเตรียมความพร้อม:</Typography>
                        </Box>
                        <Box>
                            <Typography>{totalData?.total_reward} บาท</Typography>
                            <Typography>{totalData?.total_late_time} บาท</Typography>
                            <Typography>{totalData?.total_early_time} บาท</Typography>
                            <Typography>{totalData?.total_operation_consumption_cost} บาท</Typography>
                            <Typography>{totalData?.total_consumption_cost} บาท</Typography>
                            <Typography>{totalData?.total_preparation_crane_time} บาท</Typography>
                            <Typography>{totalData?.total_operation_time} บาท</Typography>
                            <Typography>
                                {(totalData?.total_preparation_crane_time || 0) + (ftssolotion?.total_preparation_FTS_time || 0)} บาท
                            </Typography>
                        </Box>
                    </Box>
                </CardContent>
            </Card > */}
        </>
    )
}