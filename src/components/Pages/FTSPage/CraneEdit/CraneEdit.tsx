import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { server } from '../../../../Constants';
import { Box, Button, Card, CardContent, FormControl, InputLabel, MenuItem, Select, Stack, TextField, ThemeProvider, createTheme } from '@mui/material';
import { useAppDispatch } from '../../../../store/store';
import { useSelector } from 'react-redux';
import { FTS } from '../../../../type/FloatingCrane.type';
import Loading from '../../../layout/Loading/Loading';
import { useForm } from 'react-hook-form';
import Titles from '../../../layout/Titles/Titles';
import { craneEditAsync } from '../../../../store/slices/Crane/craneEditSlice';
import { ftsAsync, ftsSelector } from '../../../../store/slices/FTS/ftsSlice';

type Props = {};

const defaultTheme = createTheme()

export default function CraneEditPage({ }: Props) {
    const [craneData, setCraneData] = useState<any>();
    const { id } = useParams();
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const ftsRuducer = useSelector(ftsSelector)
    const [isSubmitting, setIsSubmitting] = useState(false);
    const {
        register,
        handleSubmit,
    } = useForm()

    const fetchCraneData = async () => {
        try {
            const response = await axios.get(`${server.CRANE}/${id}`)
            setCraneData(response.data);
        } catch (error) {
            console.error('เกิดข้อผิดพลาดในการดึงข้อมูล Crane:', error);
        }
    };
    const submitting = () => setIsSubmitting(false);
    const fetch = () => dispatch(ftsAsync())


    useEffect(() => {
        fetchCraneData();
    }, [id]);

    const showForm = () => {
        return (
            <form
                onSubmit={handleSubmit(async (data) => {
                    setIsSubmitting(true);
                    try {
                        await dispatch(craneEditAsync({ id, data, submitting, navigate, fetch }))
                    } catch (error) {
                        setIsSubmitting(false);
                    }
                })}>
                <Box className='mt-5'>
                    <Stack direction='column' spacing={4}>
                        <Box>
                            <TextField
                                variant="outlined"
                                type="text"
                                label='ชื่อเครน'
                                className='font-kanit'
                                id="crane_name"
                                {...register('crane_name', { required: true })}
                                defaultValue={craneData.crane_name}
                                fullWidth
                            />
                        </Box>

                        <Box>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">เลือกเครน</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label="เลือกเครน"
                                    {...register('cr_id', { required: true, valueAsNumber: true })}
                                    defaultValue={craneData.FTS_id}
                                >
                                    {(ftsRuducer.result).map((item: FTS) => (
                                        <MenuItem key={item.fts_id} value={item.fts_id}>
                                            {item.FTS_name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box>

                        <Box>
                            <TextField
                                variant="outlined"
                                type="number"
                                label='เวลาเตรียมการ'
                                id="setuptime_crane"
                                className='font-kanit'
                                {...register('setuptime_crane', { required: true, valueAsNumber: true })}
                                defaultValue={craneData.setuptime_crane}
                                fullWidth
                            />
                        </Box>

                        <Box>
                            <TextField
                                variant="outlined"
                                type="number"
                                label='ค่าแรง (เดือน)'
                                id="wage_month_cost"
                                className='font-kanit'
                                {...register('wage_month_cost', { required: true, valueAsNumber: true })}
                                defaultValue={craneData.wage_month_cost}
                                fullWidth
                            />
                        </Box>
                    </Stack>

                    <Stack direction='row' spacing={2} className='col-span-2 flex mt-5'>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            className='bg-[#66BB6A] hover:bg-[#1B5E20] font-kanit text-lg py-3'
                            disabled={isSubmitting}
                        >
                            ยืนยันเเก้ไข
                        </Button>
                        <Button
                            fullWidth
                            variant="outlined"
                            onClick={() => navigate('/transferstation')}
                            className='font-kanit text-lg py-3'
                        >
                            กลับ
                        </Button>
                    </Stack>
                </Box>
            </form >
        )
    }


    return (
        <ThemeProvider theme={defaultTheme}>
            <Card className='min-h-[90vh]'>
                <CardContent>
                    {craneData === undefined ? (
                        <Loading />
                    ) : (
                        <>
                            <Box className='flex justify-start'>
                                <Titles title='เครน' title2='แก้ไขข้อมูล' />
                            </Box>
                            <Box>
                                {showForm()}
                            </Box>
                        </>
                    )}
                </CardContent>
            </Card>
        </ThemeProvider >
    )
}
