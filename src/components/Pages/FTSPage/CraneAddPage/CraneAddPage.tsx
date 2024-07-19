import { Button, Box, Select, MenuItem, FormControl, InputLabel, createTheme, Card, ThemeProvider, CardContent, Stack, Alert, TextField, Typography } from '@mui/material'
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../../../store/store';
import { Link, useNavigate } from 'react-router-dom';
import { FTS } from '../../../../type/FloatingCrane.type';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { craneAddAsync } from '../../../../store/slices/Crane/craneAddSlice';
import { ftsSelector } from '../../../../store/slices/FTS/ftsSlice';
import { CLOSE, SAVE } from '../../../../Constants';

type Props = {}

const defaultTheme = createTheme();

export default function CraneCreatePage({ }: Props) {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const FTSSlice = useSelector(ftsSelector)
    const [isSubmitting, setIsSubmitting] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const submitting = () => setIsSubmitting(false)


    const showForm = () => {
        return (
            <form
                className="w-[750px]"
                onSubmit={handleSubmit(async (data) => {
                    setIsSubmitting(true);
                    try {
                        await dispatch(craneAddAsync({ data, submitting, navigate }))
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
                                {(FTSSlice.result).map((item: FTS) => (
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
                            type='text'
                            fullWidth
                            className='font-kanit'
                            {...register('setuptime_crane', {
                                required: true,
                                pattern: {
                                    value: /^[0-9]*\.?[0-9]*$/,
                                    message: 'กรุณากรอกตัวเลขที่ถูกต้อง'
                                },
                            })}
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
                            type='text'
                            fullWidth
                            className='font-kanit'
                            {...register('wage_month_cost', {
                                required: true,
                                pattern: {
                                    value: /^[0-9]*\.?[0-9]*$/,
                                    message: 'กรุณากรอกตัวเลขที่ถูกต้อง'
                                },
                            })}
                        />
                        {errors.wage_month_cost &&
                            <Alert variant="outlined" severity="error" className='mt-2'>
                                กรุณากรอกข้อมูล
                            </Alert>}
                    </Box>
                    <Stack direction='row' spacing={2} sx={{ marginTop: 2 }}>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            className='bg-blue-600 hover:bg-blue-700 font-kanit'
                            disabled={isSubmitting}
                        >
                            {SAVE}
                        </Button>
                        <Button
                            fullWidth
                            variant="outlined"
                            sx={{ mt: 3, mb: 2 }}
                            onClick={() => navigate('/transferstation')}
                            className='font-kanit'
                        >
                            {CLOSE}
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
                        <Typography variant='h5' className='flex justify-center mt-3'>เพิ่มเครน</Typography>
                        {showForm()}
                    </CardContent>
                </Card>
            </Box>
        </ThemeProvider >
    )
}