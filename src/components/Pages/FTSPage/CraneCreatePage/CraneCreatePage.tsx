import { Button, Box, Select, MenuItem, FormControl, InputLabel, createTheme, Card, ThemeProvider, CardContent, Stack, Alert, TextField } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../store/store';
import { Link, useNavigate } from 'react-router-dom';
import { FTS } from '../../../../type/FloatingCrane.type';
import { addCrane } from '../../../../store/slices/Cargo/crane.edit.slice';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

type Props = {}

const defaultTheme = createTheme();

export default function CraneCreatePage({ }: Props) {
    const navigate = useNavigate()
    const dispatch = useDispatch<any>();
    const FTSSlice = useSelector((state: RootState) => state.FTS);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const showForm = () => {
        return (
            <form
                className="w-[750px]"
                onSubmit={handleSubmit(async (data) => {
                    console.log(data)
                    setIsSubmitting(true);
                    try {
                        await dispatch(addCrane(data, navigate))
                        setIsSubmitting(false);
                    } catch (error) {
                        setIsSubmitting(false);
                    }
                })}
            >
                <Stack direction='column' spacing={2} className='mt-5'>
                    <Box>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">เลือกทุ่น</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="เลือกทุ่น"
                                {...register('FTS_id', { required: true })}
                            >
                                {(FTSSlice.FTS).map((item: FTS) => (
                                    <MenuItem key={item.fts_id} value={item.fts_id} className='font-kanit'>
                                        {item.FTS_name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        {errors.cargo_id &&
                            <Alert variant="outlined" severity="error" className='mt-2'>
                                กรุณากรอกข้อมูล
                            </Alert>}
                    </Box>
                    <Box>
                        <TextField
                            label='ชื่อเครน'
                            id='crane_name'
                            type='text'
                            fullWidth
                            className='font-kanit'
                            {...register('crane_name', { required: true, })}
                        />
                        {errors.crane_name &&
                            <Alert variant="outlined" severity="error" className='mt-2'>
                                กรุณากรอกข้อมูล
                            </Alert>}
                    </Box>
                    <Box>
                        <TextField
                            label='เวลาเตรียมความพร้อม (นาที)'
                            id='setuptime_crane'
                            type='number'
                            fullWidth
                            className='font-kanit'
                            {...register('setuptime_crane', { required: true, valueAsNumber: true })}
                        />
                        {errors.setuptime_crane &&
                            <Alert variant="outlined" severity="error" className='mt-2'>
                                กรุณากรอกข้อมูล
                            </Alert>}
                    </Box>
                    <Box>
                        <TextField
                            label='ค่าแรง (เดือน)'
                            id='wage_month_cost'
                            type='number'
                            fullWidth
                            className='font-kanit'
                            {...register('wage_month_cost', { required: true, valueAsNumber: true })}
                        />
                        {errors.wage_month_cost &&
                            <Alert variant="outlined" severity="error" className='mt-2'>
                                กรุณากรอกข้อมูล
                            </Alert>}
                    </Box>
                    <Box>
                        <TextField
                            label='ค่ารางวัล (บาท/ตัน)'
                            id='premium_rate'
                            type='number'
                            fullWidth
                            className='font-kanit'
                            {...register('premium_rate', { required: true, valueAsNumber: true })}
                        />
                        {errors.premium_rate &&
                            <Alert variant="outlined" severity="error" className='mt-2'>
                                กรุณากรอกข้อมูล
                            </Alert>}
                    </Box>
                    <Stack direction='row' spacing={2} sx={{ marginTop: 2 }}>
                        <Button
                            fullWidth
                            variant="outlined"
                            sx={{ mt: 3, mb: 2 }}
                            onClick={() => navigate('/transferstation')}
                            className='font-kanit'
                        >
                            กลับ
                        </Button>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            className='bg-[#1976D2] hover:bg-[#1563BC] font-kanit'
                            disabled={isSubmitting}
                        >
                            เพิ่มเครน
                        </Button>
                    </Stack>
                </Stack>
            </form>
        )
    }


    return (
        <ThemeProvider theme={defaultTheme}>
            <Box className="flex justify-center items-center">
                <Card>
                    <CardContent>
                        <Box className=" w-full flex justify-between gap-x-2">
                            <Button fullWidth variant="contained" component={Link} to="/transferstation/create" >เพิ่มทุ่น</Button>

                            <Button fullWidth variant="contained" disabled>เพิ่มเครน</Button>

                        </Box>
                        {showForm()}
                    </CardContent>
                </Card>
            </Box>
        </ThemeProvider >
    )
}