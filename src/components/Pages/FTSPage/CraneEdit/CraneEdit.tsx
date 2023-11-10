import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { server } from '../../../../Constants';
import { Box, Button, Card, CardContent, FormControl, InputLabel, MenuItem, Select, Stack, TextField, ThemeProvider, createTheme } from '@mui/material';
import { RootState } from '../../../../store/store';
import { useSelector } from 'react-redux';
import { FTS } from '../../../../types/FloatingCrane.type';
import { toast } from 'react-toastify';
import { httpClient } from '../../../../utils/httpclient';
import Loading from '../../../layout/Loading/Loading';
import { useForm } from 'react-hook-form';
import Titles from '../../../layout/Titles/Titles';

type Props = {};

const defaultTheme = createTheme()

export default function CraneEditPage({ }: Props) {
    const [craneData, setCraneData] = useState<any>();
    const { id } = useParams();
    const navigate = useNavigate()
    const FTSSlice = useSelector((state: RootState) => state.FTS);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const {
        register,
        handleSubmit,
    } = useForm();

    const fetchCraneData = async () => {
        try {
            const response = await axios.get(`${server.CRANE}/${id}`);
            setCraneData(response.data);
        } catch (error) {
            console.error('เกิดข้อผิดพลาดในการดึงข้อมูล Crane:', error);
        }
    };

    useEffect(() => {
        fetchCraneData();
    }, [id]);

    const showForm = () => {
        return (
            <form
                onSubmit={handleSubmit(async (data) => {
                    setIsSubmitting(true);
                    try {
                        await httpClient.put(`${server.CRANE}/${id}`, data);
                        setIsSubmitting(false);
                        toast.success('แก้ไขเครนรรีนยร้อย');
                        navigate('/transferstation')
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
                                    {(FTSSlice.FTS).map((item: FTS) => (
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
                        <Box>
                            <TextField
                                variant="outlined"
                                type="number"
                                label='ค่ารางวัล (บาท/ตัน)'
                                id="premium_rate"
                                className='font-kanit'
                                {...register('premium_rate', { required: true, valueAsNumber: true })}
                                defaultValue={craneData.premium_rate}
                                fullWidth
                            />
                        </Box>
                    </Stack>


                    <Stack direction='row' spacing={2} className='col-span-2 flex mt-5'>
                        <Button
                            fullWidth
                            variant="outlined"
                            onClick={() => navigate('/transferstation')}
                            className='font-kanit text-lg py-3'
                        >
                            กลับ
                        </Button>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            className='bg-[#1976D2] hover:bg-[#1563BC] font-kanit text-lg py-3'
                            disabled={isSubmitting}
                        >
                            บันทึก
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
