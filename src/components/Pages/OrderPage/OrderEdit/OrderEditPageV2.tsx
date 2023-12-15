import { Alert, Box, Button, Card, CardContent, FormControl, InputLabel, MenuItem, Select, Stack, TextField, ThemeProvider, createTheme } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { RootState } from '../../../../store/store';
import { server } from '../../../../Constants';
import { httpClient } from '../../../../utils/httpclient';
import { updateOrder } from '../../../../store/slices/Order/orderEditSlice';
import Loading from '../../../layout/Loading/Loading';
import Titles from '../../../layout/Titles/Titles';

type Props = {}

const defaultTheme = createTheme();

export default function OrderEditPageV2({ }: Props) {
    const { id } = useParams()
    const navigate = useNavigate()
    const CarrierReducer = useSelector((state: RootState) => state.carrier);
    const dispatch = useDispatch<any>();
    const [data, setData] = useState<any>();
    const rolesReducer = useSelector((state: RootState) => state.rolesReducer);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const fetchFTSData = async () => {
        try {
            const response = await httpClient.get(`${server.ORDER}/${id}`);
            setData(response.data);
        } catch (error) {
            throw error;
        }
    };
    useEffect(() => {
        fetchFTSData();
    }, []);

    const showForm = () => {

        const arrivalTime = new Date(data.arrival_time);
        arrivalTime.setHours(arrivalTime.getHours() + 7);
        const formattedArrivalTime = arrivalTime.toISOString().slice(0, 16);


        const deadline_time = new Date(data.deadline_time);
        deadline_time.setHours(deadline_time.getHours() + 7);
        const formattedDeadline_time = deadline_time.toISOString().slice(0, 16);

        return (
            <form
                onSubmit={handleSubmit(async (data) => {
                    const formattedValues = {
                        ...data,
                        latitude: parseFloat(data.latitude),
                        longitude: parseFloat(data.longitude),
                        group: rolesReducer.result?.group
                    };
                    setIsSubmitting(true);
                    dispatch(updateOrder(id, formattedValues, navigate, setIsSubmitting));
                })}>
                <Box className='grid grid-cols-2 gap-x-5 mt-5'>
                    <Stack direction='column' spacing={4}>
                        <Box>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">เลือกเครน</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label="เลือกเครน"
                                    {...register('cr_id', { required: true })}
                                    defaultValue={data.cr_id}
                                >
                                    {(CarrierReducer.carrier).map((items) => (
                                        <MenuItem key={items.cr_id} value={items.cr_id} className='font-kanit'>
                                            {items.carrier_name}
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
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">สถานะสินค้า (ขาเข้า/ขาออก)</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label="สถานะสินค้า (ขาเข้า/ขาออก)"
                                    {...register('category', { required: true })}
                                    defaultValue={data.category}
                                >
                                    <MenuItem value='import' className='font-kanit'>import</MenuItem>
                                    <MenuItem value='export' className='font-kanit'>export</MenuItem>
                                </Select>
                            </FormControl>
                            {errors.category &&
                                <Alert variant="outlined" severity="error" className='mt-2'>
                                    กรุณากรอกข้อมูล
                                </Alert>}
                        </Box>

                        <Box>
                            <TextField
                                label='จำนวนทุ่นเข้าสูงสุด'
                                id='maxFTS'
                                type='number'
                                fullWidth
                                className='font-kanit'
                                {...register('maxFTS', { required: true, valueAsNumber: true })}
                                defaultValue={data.maxFTS}
                            />
                            {errors.maxFTS &&
                                <Alert variant="outlined" severity="error" className='mt-2'>
                                    กรุณากรอกข้อมูล
                                </Alert>}
                        </Box>

                        <Box>
                            <TextField
                                id='latitude'
                                label='ละติจูด'
                                type='text' // Change type to text
                                fullWidth
                                className='font-kanit'
                                {...register('latitude', {
                                    required: true,
                                    pattern: {
                                        value: /^[0-9]*\.?[0-9]*$/, // Regular expression for numeric input with optional decimal
                                        message: 'กรุณากรอกตัวเลขที่ถูกต้อง'
                                    },
                                })}
                                defaultValue={data.latitude}
                            />
                            {errors.latitude &&
                                <Alert variant="outlined" severity="error" className='mt-2'>
                                    กรุณากรอกข้อมูล
                                </Alert>}
                        </Box>

                        <Box>
                            <TextField
                                id='longitude'
                                label='ลองจิจูด'
                                type='text' // Change type to text
                                fullWidth
                                className='font-kanit'
                                {...register('longitude', {
                                    required: true,
                                    pattern: {
                                        value: /^[0-9]*\.?[0-9]*$/, // Regular expression for numeric input with optional decimal
                                        message: 'กรุณากรอกตัวเลขที่ถูกต้อง'
                                    },
                                })}
                                defaultValue={data.longitude}
                            />
                            {errors.longitude &&
                                <Alert variant="outlined" severity="error" className='mt-2'>
                                    กรุณากรอกข้อมูล
                                </Alert>}
                        </Box>
                    </Stack>

                    <Stack direction='column' spacing={4}>
                        <Box>
                            <label htmlFor="deadline_time" className='font-kanit'>วัน-เวลา มาถึง</label>
                            <TextField
                                id='arrival_time'
                                type='datetime-local'
                                fullWidth
                                className='font-kanit'
                                {...register('arrival_time', { required: true })}
                                defaultValue={formattedArrivalTime}
                            />
                            {errors.arrival_time &&
                                <Alert variant="outlined" severity="error" className='mt-2'>
                                    กรุณากรอกข้อมูล
                                </Alert>}
                        </Box>

                        <Box>
                            <label htmlFor="deadline_time" className='font-kanit'>วัน-เวลา สิ้นสุด</label>
                            <TextField
                                id='deadline_time'
                                type='datetime-local'
                                fullWidth
                                className='font-kanit'
                                {...register('deadline_time', { required: true })}
                                defaultValue={formattedDeadline_time}
                            />
                            {errors.deadline_time &&
                                <Alert variant="outlined" severity="error" className='mt-2'>
                                    กรุณากรอกข้อมูล
                                </Alert>}
                        </Box>

                        <Box>
                            <TextField
                                id='penalty_rate'
                                label='ค่าปรับ (บาท/ชม)'
                                type='number'
                                fullWidth
                                className='font-kanit'
                                {...register('penalty_rate', { required: true, valueAsNumber: true })}
                                defaultValue={data.penalty_rate}
                            />
                            {errors.penalty_rate &&
                                <Alert variant="outlined" severity="error" className='mt-2'>
                                    กรุณากรอกข้อมูล
                                </Alert>}
                        </Box>

                        <Box>
                            <TextField
                                id='reward_rate'
                                label='รางวัล (บาท/ชม)'
                                type='number'
                                fullWidth
                                className='font-kanit'
                                {...register('reward_rate', { required: true, valueAsNumber: true })}
                                defaultValue={data.reward_rate}
                            />
                            {errors.reward_rate &&
                                <Alert variant="outlined" severity="error" className='mt-2'>
                                    กรุณากรอกข้อมูล
                                </Alert>}
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
                            onClick={() => navigate('/orders')}
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
                    {data === undefined ? (<Loading />) : (
                        <>
                            <Box className='flex justify-between'>
                                <Titles title='รายการขนถ่ายสินค้า' title2='แก้ไขข้อมูล' />
                                <Button
                                    variant="contained"
                                    className='bg-[#1976D2] hover:bg-[#1563BC] font-kanit text-lg py-3 px-10'
                                    onClick={() => navigate(`/orders/cargo/edit/${id}`)}
                                >
                                    แก้ไขสินค้า
                                </Button>
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