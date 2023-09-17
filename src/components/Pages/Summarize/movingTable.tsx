import SummarizePage from './SummarizePage'
import { Box, Card, CardContent, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import axios from 'axios'
import RoutesPage from './RoutesPage'

type Props = {}

export interface CraneSolution {
    solution_id: number;
    total_cost: number;
    total_consumption_cost: number;
    total_wage_cost: number;
    penality_cost: number;
    total_reward: number;
    total_late_time: number;
    total_early_time: number;
    total_operation_consumption_cost: number;
    total_operation_time: number;
    total_preparation_crane_time: number;
}

export interface FtsSolution {
    solution_id: number;
    FTS_id: number;
    FTS_name: number;
    total_preparation_FTS_time: number;
    total_travel_consumption_cost: number;
    total_travel_distance: number;
}


export default function MovingTablePage({ }: Props) {
    const [totalData, setTotalData] = useState<CraneSolution>();
    const [ftssolotion, setFtssolotion] = useState<FtsSolution>();

    useEffect(() => {
        axios.get('http://crane.otpzlab.com:7070/api/cranesolution')
            .then((res) => {
                setTotalData(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
        axios.get('http://crane.otpzlab.com:7070/api/ftssolution')
            .then((res) => {
                setFtssolotion(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }, []);

    return (
        <>
            <Card sx={{ maxWidth: 505 }}>
                <CardContent>
                    <Typography className='text-lg font-bold mb-3'>สรุปรายละเอียดต้นทุนรวม</Typography>
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
            </Card >
            <SummarizePage />
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">ชื่อทุ่น</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    // value={age}
                    label="Age"
                // onChange={handleChange}
                >
                    <MenuItem value={10}>แก่นตะวัน</MenuItem>
                    <MenuItem value={20}>ศุภราช</MenuItem>
                    <MenuItem value={30}>บุหงา</MenuItem>
                    <MenuItem value={40}>บุหงากรรณิการ์</MenuItem>
                    <MenuItem value={50}>กรรณิการ์</MenuItem>
                    <MenuItem value={60}>การะเกด</MenuItem>
                </Select>
            </FormControl>
            <Card sx={{ maxWidth: 505 }}>
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
            </Card >
            <RoutesPage />
        </>
    )
}