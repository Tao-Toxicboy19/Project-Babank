import SummarizePage from './SummarizePage'
import RoutesPage from './RoutesPage'
import { Box, Card, CardContent, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Stack, Typography } from '@mui/material'
import { useState } from 'react'

type Props = {}

const revenueData = [
    'รายรับรวม:',
    'รายรับจากการขนถ่ายสินค้า:',
    'รายรับจากรางวัล:',
];

const costData = [
    'ต้นทุนรวม:',
    'ค่าเชื้อเพลิงพรวม:',
    'ค่าแรง:',
    'ค่าทำโทษ:',
];
const test = [
    'น้ำหนักสินค้ารวม(ตัน) :',
    'เวลารวมเสร็จก่อนกำหนด:',
    'เวลารวมเสร็จหลังกำหนด:',
    'ค่าเชื้อเพลิงรวมขนถ่าย:',
    'ค่าเชื้อเพลิงรวมเคลื่อยย้าย:',
    'ระยะรวมทางเคลื่อนย้าย:',
    'เวลารวมดำเนินการขนถ่าย:',
    'เวลารวมเตรียมความพร้อม:',
]

export default function MovingTable({ }: Props) {
    const [age, setAge] = useState('');

    const handleChange = (event: SelectChangeEvent) => {
        setAge(event.target.value as string);
    };
    return (
        <>
            <Box className='max-w-full '>
                <Card className='max-w-7xl mx-auto my-3'>
                    <CardContent>
                        <Typography className='flex justify-center text-2xl text-[#F1FDFF] font-bold bg-blue-500 rounded-md py-1 my-3'>
                            สรุปรายรับเเละต้นทุน:
                        </Typography>
                        <Box>
                            <Typography className='text-lg font-normal'>
                                กำไร: xxxx บาท
                            </Typography>
                            <Box className='grid grid-cols-4'>
                                <Box className='col-span-4 grid grid-cols-4 gap-x-3 border-b-2'>
                                    {revenueData.map((item) => (
                                        <Box key={item} className='flex justify-between'>
                                            <Typography>
                                                {item}
                                            </Typography>
                                            <Typography>
                                                xxxx บาท
                                            </Typography>
                                        </Box>
                                    ))}
                                </Box>
                                <Box className='col-span-4 grid grid-cols-4 gap-x-3 border-b-2'>
                                    {costData.map((item) => (
                                        <Box key={item} className='flex justify-between'>
                                            <Typography >
                                                {item}
                                            </Typography>
                                            <Typography>
                                                xxxx บาท
                                            </Typography>
                                        </Box>
                                    ))}
                                </Box>
                                <Box className='flex flex-col gap-1'>
                                    {test.map((item) => (
                                        <Box className='border-b-2 flex flex-row justify-between px-2'>
                                            <Typography key={item}>
                                                {item}
                                            </Typography>
                                            <Typography key={item}>
                                                xxxx บาท
                                            </Typography>
                                        </Box>
                                    ))}
                                </Box>
                            </Box>
                        </Box>
                    </CardContent>
                </Card>
            </Box>
            <Stack direction='column' spacing={1}>
                <RoutesPage />
                <Box className='w-full bg-white rounded-md px-5 py-3'>
                    <Box className='max-w-xl'>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">ชื่อทุ่น</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={age}
                                label="Age"
                                onChange={handleChange}
                            >
                                <MenuItem value={10}>แก่นตะวัน</MenuItem>
                                <MenuItem value={20}>ศุภราช</MenuItem>
                                <MenuItem value={30}>บุหงา</MenuItem>
                                <MenuItem value={40}>บุหงากรรณิการ์</MenuItem>
                                <MenuItem value={50}>กรรณิการ์</MenuItem>
                                <MenuItem value={60}>การะเกด</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </Box>
                <SummarizePage />
                <img src={`http://crane.otpzlab.com/images/map.png`} alt="map" className='w-auto h-96 object-contain ' />
            </Stack>
        </>
    )
}