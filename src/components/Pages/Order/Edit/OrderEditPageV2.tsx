import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { httpClient } from '../../../../utlis/httpclient';
import { server } from '../../../../Constants';
import { Box, Button, Card, CardContent, FormControl, InputLabel, MenuItem, Select, Stack, TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../store/store';
import { Carrier } from '../../../../types/Carrier.type';
import { Orders } from '../../../../types/Order.type';
import { updateOrder } from '../../../../store/slices/order.edit.slice';

type Props = {}

export default function OrderEditPageV2({ }: Props) {
    const { id } = useParams()
    const CarrierReducer = useSelector((state: RootState) => state.carrier);
    const [order, setOrder] = useState<Orders | null>(null)
    const [isSubmitting, setIsSubmitting] = useState(false);
    const dispatch = useDispatch<any>();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCraneData = async () => {
            try {
                const response = await httpClient.get(`${server.ORDER}/${id}`);
                console.log(response.data)
                setOrder(response.data)
            } catch (error) {
                console.error('เกิดข้อผิดพลาดในการดึงข้อมูล Crane:', error);
            }
        };
        fetchCraneData();
    }, [id]);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setIsSubmitting(true);
        dispatch(updateOrder(id, order, navigate, setIsSubmitting));
    };


    const handleSelectChangeCarrier = (event: any) => {
        const value = event.target.value as number;
        setOrder((prevCraneData: any) => ({
            ...prevCraneData!,
            cr_id: value,
        }));
    };
    const handleSelectChangeCategory = (event: any) => {
        const value = event.target.value as number;
        setOrder((prevCraneData: any) => ({
            ...prevCraneData!,
            category: value,
        }));
    };

    const handleInputChange = (event: any) => {
        const { name, value } = event.target;

        setOrder((prevCraneData: any) => ({
            ...prevCraneData!,
            [name]: value,
        }));
    };


    const showForm = () => {
        if (order === null) {
            return null;
        }
        const arrivalTime = new Date(order.arrival_time);
        arrivalTime.setHours(arrivalTime.getHours() + 7);
        const formattedArrivalTime = arrivalTime.toISOString().slice(0, 16);


        const deadline_time = new Date(order.deadline_time);
        deadline_time.setHours(deadline_time.getHours() + 7);
        const formattedDeadline_time = deadline_time.toISOString().slice(0, 16);

        return (
            <form onSubmit={handleSubmit}>
                <Stack spacing={2} direction='column'>
                    <Box>
                        <InputLabel id="cr_id">เลือกเรือ</InputLabel>
                        <FormControl fullWidth>
                            <Select
                                labelId="cr_id"
                                id="cr_id"
                                value={order?.cr_id}
                                onChange={handleSelectChangeCarrier}
                            >
                                {(CarrierReducer.carrier).map((item: Carrier) => (
                                    <MenuItem key={item.cr_id} value={item.cr_id}>
                                        {item.carrier_name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>
                    <Stack spacing={2} direction='row'>
                        <Box className='w-full'>
                            <InputLabel id="cr_id">สถานะสินค้า (ขาเข้า/ขาออก)</InputLabel>
                            <FormControl fullWidth>
                                <Select
                                    labelId="category"
                                    id="category"
                                    value={order?.category}
                                    onChange={handleSelectChangeCategory}
                                >
                                    <MenuItem value="Import">import</MenuItem>
                                    <MenuItem value="Export">export</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                        <Box className='w-full'>
                            <InputLabel id="cr_id">จำนวนทุ่นเข้าสูงสุด</InputLabel>
                            <TextField
                                name='maxFTS'
                                id='maxFTS'
                                type='number'
                                value={order?.maxFTS}
                                onChange={handleInputChange}
                                fullWidth
                            />
                        </Box>
                    </Stack>
                    <Stack spacing={2} direction='row'>
                        <Box className='w-full'>
                            <InputLabel id="cr_id">วัน-เวลา มาถึง</InputLabel>
                            <TextField
                                name='arrival_time'
                                id='arrival_time'
                                type='datetime-local'
                                value={formattedArrivalTime}
                                onChange={handleInputChange}
                                fullWidth
                            />
                        </Box>
                        <Box className='w-full'>
                            <InputLabel id="cr_id">วัน-เวลา สิ้นสุด</InputLabel>
                            <TextField
                                name='deadline_time'
                                id='deadline_time'
                                type='datetime-local'
                                value={formattedDeadline_time}
                                onChange={handleInputChange}
                                fullWidth
                            />
                        </Box>
                    </Stack>
                    <Stack spacing={2} direction='row'>
                        <Box className='w-full'>
                            <InputLabel id="cr_id">ละติจูด</InputLabel>
                            <TextField
                                name='latitude'
                                id='latitude'
                                type='number'
                                value={order?.latitude}
                                onChange={handleInputChange}
                                fullWidth
                            />
                        </Box>
                        <Box className='w-full'>
                            <InputLabel id="cr_id">ลองจิจูด</InputLabel>
                            <TextField
                                name='longitude'
                                id='longitude'
                                type='number'
                                value={order?.longitude}
                                onChange={handleInputChange}
                                fullWidth
                            />
                        </Box>
                    </Stack>
                    <Stack spacing={2} direction='row'>
                        <Box className='w-full'>
                            <InputLabel id="cr_id">ค่าปรับ (บาท)</InputLabel>
                            <TextField
                                name='penalty_rate'
                                id='penalty_rate'
                                type='number'
                                value={order?.penalty_rate}
                                onChange={handleInputChange}
                                fullWidth
                            />
                        </Box>
                        <Box className='w-full'>
                            <InputLabel id="cr_id">รางวัล (บาท)</InputLabel>
                            <TextField
                                name='reward_rate'
                                id='reward_rate'
                                type='number'
                                value={order?.reward_rate}
                                onChange={handleInputChange}
                                fullWidth
                            />
                        </Box>
                    </Stack>
                    <Stack spacing={2} direction='row'>
                        <Button
                            fullWidth
                            variant="outlined"
                            sx={{ mt: 3, mb: 2 }}
                            component={Link}
                            to={'/orders'}
                        >
                            กลับ
                        </Button>
                        <Button
                            component={Link}
                            to={`/orders/cargo/edit/${order.or_id}`}
                            // type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            className='bg-[#1976D2] hover:bg-[#1563BC]'
                            disabled={isSubmitting}
                        >
                            เพิ่มสินค้า
                        </Button>
                    </Stack>
                </Stack>
            </form >
        )
    }

    return (
        <>
            <Card sx={{ maxWidth: 750, marginX: 'auto' }}>
                <CardContent>
                    {showForm()}
                </CardContent>
            </Card>
        </>
    )
}