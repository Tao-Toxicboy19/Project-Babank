import { Alert, Box, Button, Card, CardContent, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Stack, TextField, ThemeProvider, createTheme } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CLOSE, EDIT, server } from '../../../../Constants';
import { httpClient } from '../../../../utils/httpclient';
import Loading from '../../../layout/Loading/Loading';
import Titles from '../../../layout/Titles/Titles';
import { useAppDispatch } from '../../../../store/store';
import { carrierEditAsync } from '../../../../store/slices/Carrier/carrierEditSlice';
import { carrierAsync } from '../../../../store/slices/Carrier/carrierSlice';

type Props = {}

const defaultTheme = createTheme();

function ShowFrom({ data }: any) {
    const dispatch = useAppDispatch()
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { id } = useParams()
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const fetch = () => dispatch(carrierAsync())
    return (
        <form
            onSubmit={handleSubmit(async (data) => {
                setIsSubmitting(true);
                try {
                    await dispatch(carrierEditAsync({ id, data, navigate, fetch }));
                    setIsSubmitting(false);
                } catch (error) {
                    setIsSubmitting(false);
                }
            })}>
            <Box className='grid grid-cols-2 gap-x-5 mt-5'>
                <Stack direction='column' spacing={4}>
                    <Box>
                        <TextField
                            id='carrier_name'
                            type='text'
                            label='ชื่อเรือ'
                            fullWidth
                            className='font-kanit'
                            {...register('carrier_name', { required: true })}
                            defaultValue={data.carrier_name}
                        />
                        {errors.carrier_name &&
                            <Alert variant="outlined" severity="error" className='mt-2'>
                                กรุณากรอกข้อมูล
                            </Alert>
                        }
                    </Box>

                    <Box>
                        <TextField
                            label='ชื่อบริษัท'
                            id='holder'
                            type='text'
                            fullWidth
                            className='font-kanit'
                            {...register('holder', { required: true })}
                            defaultValue={data.holder}
                        />
                        {errors.holder &&
                            <Alert variant="outlined" severity="error" className='mt-2'>
                                กรุณากรอกข้อมูล
                            </Alert>}
                    </Box>

                    <Box>
                        <TextField
                            label='ความจุสูงสุด (ตัน)'
                            id='maxcapacity'
                            type='number'
                            fullWidth
                            className='font-kanit'
                            {...register('maxcapacity', { required: true, valueAsNumber: true },)}
                            defaultValue={data.maxcapacity}
                        />
                        {errors.maxcapacity &&
                            <Alert variant="outlined" severity="error" className='mt-2'>
                                กรุณากรอกข้อมูล
                            </Alert>}
                    </Box>

                    <Box>
                        <TextField
                            id='burden'
                            label='จำนวนระวาง'
                            type='number'
                            fullWidth
                            className='font-kanit'
                            {...register('burden', { required: true, valueAsNumber: true })}
                            defaultValue={data.burden}
                        />
                        {errors.burden &&
                            <Alert variant="outlined" severity="error" className='mt-2'>
                                กรุณากรอกข้อมูล
                            </Alert>}
                    </Box>
                </Stack>

                <Stack direction='column' spacing={4}>
                    <Box>
                        <TextField
                            id='carrier_max_FTS'
                            label='จำนวนทุ่นเข้าได้สูงสุด'
                            type='number'
                            fullWidth
                            className='font-kanit'
                            {...register('carrier_max_FTS', { required: true, valueAsNumber: true })}
                            defaultValue={data.carrier_max_FTS}
                        />
                        {errors.carrier_max_FTS &&
                            <Alert variant="outlined" severity="error" className='mt-2'>
                                กรุณากรอกข้อมูล
                            </Alert>}
                    </Box>

                    <Box>
                        <TextField
                            id='carrier_max_crane'
                            label='จำนวนเครนเข้าได้สูงสุด'
                            type='number'
                            fullWidth
                            className='font-kanit'
                            {...register('carrier_max_crane', { required: true, valueAsNumber: true })}
                            defaultValue={data.carrier_max_crane}
                        />
                        {errors.carrier_max_crane &&
                            <Alert variant="outlined" severity="error" className='mt-2'>
                                กรุณากรอกข้อมูล
                            </Alert>}
                    </Box>

                    <Box>
                        <TextField
                            id='Width'
                            label='กว้าง (เมตร)'
                            type='number'
                            fullWidth
                            className='font-kanit'
                            {...register('Width', { required: true, valueAsNumber: true })}
                            defaultValue={data.Width}
                        />
                        {errors.Width &&
                            <Alert variant="outlined" severity="error" className='mt-2'>
                                กรุณากรอกข้อมูล
                            </Alert>}
                    </Box>

                    <Box>
                        <TextField
                            id='length'
                            label='ยาว (เมตร)'
                            type='number'
                            fullWidth
                            className='font-kanit'
                            {...register('length', { required: true, valueAsNumber: true })}
                            defaultValue={data.length}
                        />
                        {errors.length &&
                            <Alert variant="outlined" severity="error" className='mt-2'>
                                กรุณากรอกข้อมูล
                            </Alert>}
                    </Box>

                </Stack>

                <Box className='col-span-2 flex justify-start my-3'>
                    <FormControl>
                        <FormLabel id="demo-form-control-label-placement" className='text-md'>เครนบนเรือ</FormLabel>
                        <RadioGroup
                            row
                            aria-labelledby="demo-form-control-label-placement"
                            defaultValue={data.has_crane !== null ? data.has_crane : 'no'}
                            {...register('has_crane')}
                        >
                            <FormControlLabel value="has" control={<Radio />} label="มี" />
                            <FormControlLabel value="no" control={<Radio />} label="ไม่มี" />
                        </RadioGroup>
                    </FormControl>
                </Box>
                <Stack direction='row' spacing={2} className='col-span-2 flex'>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        className='bg-blue-600 hover:bg-blue-700 font-kanit text-lg py-3'
                        disabled={isSubmitting}
                    >
                        {EDIT}
                    </Button>
                    <Button
                        fullWidth
                        variant="outlined"
                        onClick={() => navigate('/carrier')}
                        className='font-kanit text-lg py-3'
                    >
                        {CLOSE}
                    </Button>
                </Stack>
            </Box>
        </form >
    )
}

export default function CarrierEditPage({ }: Props) {
    const [data, setData] = useState<any>();
    const { id } = useParams()

    const fetchFTSData = async () => {
        try {
            const response = await httpClient.get(`${server.CARRIER}/${id}`);
            setData(response.data);
        } catch (error) {
            throw error;
        }
    };

    useEffect(() => {
        fetchFTSData();
    }, []);

    return (
        <ThemeProvider theme={defaultTheme}>
            <Card className='min-h-[90vh]'>
                <CardContent>
                    {data === undefined ? (
                        <Loading />
                    ) : (
                        <>
                            <Box className='flex justify-start'>
                                <Titles title='เรือสินค้า' title2='แก้ไขข้อมูล' />
                            </Box>
                            <Box>
                                <ShowFrom data={data} />
                            </Box>
                        </>
                    )}
                </CardContent>
            </Card>
        </ThemeProvider >
    )
}