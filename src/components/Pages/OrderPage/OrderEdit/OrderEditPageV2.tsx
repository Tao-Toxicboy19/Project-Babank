import { Alert, Box, Button, Card, CardContent, FormControl, InputLabel, MenuItem, Select, Stack, TextField, ThemeProvider, createTheme } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch } from '../../../../store/store';
import { CLOSE, EDIT, server } from '../../../../Constants';
import { httpClient } from '../../../../utils/httpclient';
import Loading from '../../../layout/Loading/Loading';
import { carrierSelector } from '../../../../store/slices/Carrier/carrierSlice';
import { cargoSelector } from '../../../../store/slices/Cargo/cargoSlice';
import { orderAsync } from '../../../../store/slices/Order/orderSlice';
import { OrdersEdit, orderEditAsync } from '../../../../store/slices/Order/orderEditSlice';
import moment from 'moment';

type Props = {}

const defaultTheme = createTheme();

function Shwoform({ rows, id }: { rows: OrdersEdit, id: any }) {
    const carrierReducer = useSelector(carrierSelector)
    const cargoReducer = useSelector(cargoSelector)
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [bulk, setBulk] = useState<number>(0)
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    // const filteredCarrier = (carrierReducer.result).filter((group) => group === rolesReducer.result?.group)

    const fetch = () => dispatch(orderAsync())

    return (
        <form onSubmit={handleSubmit(async (data) => {
            setIsSubmitting(true)
            const values = {
                ...data,
                // load: sumBulkArray,
                arrival_time: moment(data.arrival_time, 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD HH:mm:ss'),
                deadline_time: moment(data.deadline_time, 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD HH:mm:ss')
            }
            try {
                await dispatch(orderEditAsync({ id, values, navigate, fetch }))
                setIsSubmitting(false)
            } catch (error) {
                setIsSubmitting(false)
            }
        })}>
            <Stack
                direction='column'
                spacing={2}
                className='w-full'
            >
                <Stack
                    direction='row'
                    spacing={2}
                    className='w-full'
                >
                    <Stack
                        direction='column'
                        spacing={2}
                        className='w-full'
                    >
                        <Box>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">เลือกเรือ</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label="เลือกเรือ"
                                    defaultValue={rows.cr_id}
                                    {...register('cr_id', { required: true })}
                                >
                                    {(carrierReducer.result).map((items) => (
                                        <MenuItem key={items.cr_id} value={items.cr_id} className='font-kanit'>
                                            {items.carrier_name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            {errors.cr_id && (
                                <Alert variant="outlined" severity="error" className='mt-2'>
                                    กรุณากรอกข้อมูล
                                </Alert>
                            )}
                        </Box>
                        <Box>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">สถานะสินค้า (ขาเข้า/ขาออก)</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label="สถานะสินค้า (ขาเข้า/ขาออก)"
                                    defaultValue={rows.category}
                                    {...register('category', { required: true })}
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
                                defaultValue={rows.maxFTS}
                                {...register('maxFTS', {
                                    required: true,
                                    valueAsNumber: true,
                                    min: 1,
                                    max: 5,
                                })}
                            />
                            {errors.maxFTS && (
                                <Alert variant="outlined" severity="error" className='mt-2'>
                                    กรุณากรอกข้อมูล
                                </Alert>
                            )}
                        </Box>
                        <Box>
                            <TextField
                                id='latitude'
                                label='ละติจูด'
                                type='text'
                                fullWidth
                                className='font-kanit'
                                {...register('latitude', {
                                    required: true,
                                    pattern: {
                                        value: /^[0-9]*\.?[0-9]*$/,
                                        message: 'กรุณากรอกตัวเลขที่ถูกต้อง'
                                    },
                                })}
                                defaultValue={rows.latitude}
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
                                type='text'
                                fullWidth
                                className='font-kanit'
                                {...register('longitude', {
                                    required: true,
                                    pattern: {
                                        value: /^[0-9]*\.?[0-9]*$/,
                                        message: 'กรุณากรอกตัวเลขที่ถูกต้อง'
                                    },
                                })}
                                defaultValue={rows.longitude}
                            />
                            {errors.longitude &&
                                <Alert variant="outlined" severity="error" className='mt-2'>
                                    กรุณากรอกข้อมูล
                                </Alert>}
                        </Box>
                    </Stack>
                    <Stack
                        direction='column'
                        spacing={2}
                        className='w-full'
                    >
                        <Box>
                            <label htmlFor="deadline_time" className='font-kanit'>วัน-เวลา มาถึง</label>
                            <TextField
                                id='arrival_time'
                                type='datetime-local'
                                fullWidth
                                className='font-kanit'
                                {...register('arrival_time', { required: true })}
                                defaultValue={rows.arrival_time}
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
                                defaultValue={rows.deadline_time}
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
                                defaultValue={rows.penalty_rate}
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
                                defaultValue={rows.reward_rate}
                            />
                            {errors.reward_rate &&
                                <Alert variant="outlined" severity="error" className='mt-2'>
                                    กรุณากรอกข้อมูล
                                </Alert>}
                        </Box>
                    </Stack>
                </Stack>
                <Box
                    className='grid grid-cols-2 gap-5'
                >

                    <FormControl
                        fullWidth
                    >
                        <InputLabel id="demo-simple-select-label">เลือกสินค้า</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id={`inputs.cargo_names`}
                            label="เลือกสินค้า"
                            defaultValue={rows.cargo_order.cargo_id}
                            {...register(`inputs.cargo_names` as const, {
                                required: true
                            })}
                        >
                            {(cargoReducer.result).map((items) => (
                                <MenuItem key={items.cargo_id} value={items.cargo_id} className='font-kanit'>
                                    {items.cargo_name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <TextField
                        label='จำนวนระวาง'
                        id='burden'
                        type='number'
                        className='font-kanit w-4/5'
                        defaultValue={rows.cargo_order.bulk || bulk}
                        {...register('burden', {
                            min: 0,
                            max: 10,
                            onChange: (e) => {
                                setBulk(+(e.target.value) || 0)
                            }
                        })}
                    />


                    {(rows.cargo_order.Bulks).map((item, index) => (
                        <TextField
                            key={index}
                            label={`ระวางที่ ${index + 1}`}
                            type='number'
                            fullWidth
                            className='font-kanit'
                            {...register(`bulkArray.${index}` as const)}
                            defaultValue={item.load_bulk}
                        />
                    ))}
                    {/* {(rows.cargo_order).map((row: any, index: any) => (
                        <>
                            <FormControl
                                fullWidth
                                key={index}
                            >
                                <InputLabel id="demo-simple-select-label">เลือกสินค้า</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id={`inputs.cargo_names`}
                                    label="เลือกสินค้า"
                                    defaultValue={row.cargo_id}
                                    {...register(`inputs.cargo_names` as const, {
                                        required: true
                                    })}
                                >
                                    {(cargoReducer.result).map((items) => (
                                        <MenuItem key={items.cargo_id} value={items.cargo_id} className='font-kanit'>
                                            {items.cargo_name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <Box className='w-full flex '>
                                <TextField
                                    label='จำนวนระวาง'
                                    id='burden'
                                    type='number'
                                    className='font-kanit w-4/5'
                                    defaultValue={row.bulk || bulk}
                                    {...register('burden', {
                                        min: 0,
                                        max: 10,
                                        onChange: (e) => {
                                            setBulk(+(e.target.value) || 0)
                                        }
                                    })}
                                />
                                <span
                                    className='w-full text-xl my-auto pl-2'
                                >
                                    รวมปริมาณสินค้า (ตัน): {sumBulkArray as number !== 0 ? sumBulkArray as number : row.load}
                                </span>
                            </Box>
                            {row.Bulks.map((items: any, index: number) => (
                                <TextField
                                    key={index}
                                    label={`ระวางที่ ${index + 1}`}
                                    type='number'
                                    fullWidth
                                    className='font-kanit'
                                    {...register(`bulkArray.${index}` as const)}
                                    defaultValue={items.load_bulk}
                                />
                            ))}
                        </>
                    ))} */}
                </Box>
            </Stack>
            <Stack direction='row' spacing={2} className='col-span-2 flex mt-5'>
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
                    onClick={() => navigate('/orders')}
                    className='font-kanit text-lg py-3'
                >
                    {CLOSE}
                </Button>
            </Stack>
        </form>
    )
}

export default function OrderEditPageV2({ }: Props) {
    const { id } = useParams()
    const [data, setData] = useState<any>();

    const fetchFTSData = async () => {
        try {
            const response = await httpClient.get(`${server.ORDER}/${id}`);
            setData(response.data)
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
                    {data === undefined ? (<Loading />) : (
                        <Box>
                            <Shwoform
                                rows={data}
                                id={id}
                            />
                        </Box>
                    )}
                </CardContent>
            </Card>
        </ThemeProvider >
    )
}