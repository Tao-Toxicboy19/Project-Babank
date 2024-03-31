import * as React from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useForm } from 'react-hook-form';
import { Box, Button, Stack, TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { ManagePlans } from '../../../../store/slices/managePlansSlice';
import LoadingTest from './loading/LoadinTest';
import { Typography } from '@mui/material';
import { roleSelector } from '../../../../store/slices/auth/rolesSlice';
import { ftsSelector } from '../../../../store/slices/FTS/ftsSlice';
import { orderSelector } from '../../../../store/slices/Order/orderSlice';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';
import { toast } from "react-toastify";

dayjs.locale('th')

type Props = {
    handleCloseV2: any
}

export default function Checkboxs({ handleCloseV2 }: Props) {
    const {
        register,
        handleSubmit,
        formState: { },
        setValue, // เพิ่ม setValue
    } = useForm();
    const [selectAll, setSelectAll] = React.useState(true);
    const rolesReducer = useSelector(roleSelector)
    const [open, setOpen] = React.useState(false);
    const [started, setStarted] = React.useState<Dayjs | null>()
    const [ended, setEnded] = React.useState<Dayjs | null>()
    const [count, setCount] = React.useState<number | null>(0)

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const dispatch = useDispatch<any>();
    const ftsReducer = useSelector(ftsSelector)
    const orderRucer = useSelector(orderSelector)
    const filteredOrders = (orderRucer.result).filter((group) => group.group === rolesReducer.result?.group)
    const orderRucerV2 = (filteredOrders).filter((order) => order.status_order !== "Approved")
    const handleSelectAll = () => {
        setSelectAll(!selectAll);
        (ftsReducer.result).forEach((item) => {
            setValue(`FTS-${item.fts_id}`, !selectAll);
        });

        orderRucerV2.forEach((item) => {
            setValue(`Carrier-${item.carrier.cr_id}`, !selectAll);
        });
    };

    const onSubmit = (formData: any) => {
        const fts = (ftsReducer.result)
            .filter((item) => formData[`FTS-${item.fts_id}`])
            .map((item) => ({
                fts_id: item.fts_id,
                // เพิ่มข้อมูลอื่น ๆ ที่คุณต้องการในออบเจ็กต์นี้
            }));

        const order = orderRucerV2
            .filter((item) => formData[`Carrier-${item.carrier.cr_id}`])
            .map((item) => ({
                cr_id: item.carrier.cr_id,
                // เพิ่มข้อมูลอื่น ๆ ที่คุณต้องการในออบเจ็กต์นี้
            }))
        if (started === undefined || ended === undefined) {
            toast.warn('กรอกข้อมูลให้ครบ')
        } else {
            dispatch(ManagePlans(fts, order, handleClickOpen, handleClose, handleCloseV2, formData, rolesReducer.result?.group, started, ended))
        }
    }

    const updateCount = () => {
        const values = filteredOrders.filter((order) => {
            const arrivalTime = dayjs(order.arrival_time);
            const deadlineTime = dayjs(order.deadline_time);
            return (arrivalTime.isAfter(started) || arrivalTime.isSame(started)) && (deadlineTime.isBefore(ended) || deadlineTime.isSame(ended));
        });
        setCount(values.length);
    };

    // เรียกใช้ฟังก์ชัน updateCount เมื่อมีการเปลี่ยนแปลงข้อมูลหรือเหตุการณ์อื่น ๆ ที่ไม่ใช่การเรนเดอร์ของคอมโพเนนต์
    React.useEffect(() => {
        updateCount();
    }, [filteredOrders, started, ended]);


    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className='flex flex-col'
        >

            <Box className='flex justify-between'>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={selectAll}
                            onChange={handleSelectAll}
                        />
                    }
                    label="เลือกทั้งหมด"
                />

                <Button
                    variant='outlined'
                    type="submit"
                // disabled={}
                >
                    จัดการแผน
                </Button>
            </Box>

            <Box className='grid grid-cols-3'>

                <Box className='border-1'>
                    <Typography>เลือกเรือ</Typography>
                    {orderRucerV2.map((item) => (
                        <Box key={item.cr_id}>
                            {(!selectAll) ? (
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            defaultChecked={selectAll}
                                            {...register(`Carrier-${item.carrier.cr_id}`)}
                                        />
                                    }
                                    label={item.carrier.carrier_name}
                                />
                            ) : (
                                <>
                                    <Box></Box>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                disabled checked
                                                // defaultChecked={selectAll}
                                                {...register(`Carrier-${item.carrier.cr_id}`)}
                                                onChange={(e) => {
                                                    if (selectAll) {
                                                        setValue(`Carrier-${item.carrier.cr_id}`, e.target.checked);
                                                    }
                                                }}
                                            />
                                        }
                                        label={item.carrier.carrier_name}
                                    />
                                </>
                            )}
                        </Box>
                    ))}
                </Box>
                <Box>
                    <Typography>เลือกทุ่น</Typography>

                    {(ftsReducer.result).map((item) => (
                        <Box key={item.fts_id}>
                            {(!selectAll) ? (
                                <>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                defaultChecked={selectAll}
                                                {...register(`FTS-${item.fts_id}`)}
                                            />
                                        }
                                        label={item.FTS_name}
                                    />
                                </>
                            ) : (
                                <>
                                    <Box></Box>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                disabled checked
                                                // defaultChecked={selectAll}
                                                {...register(`example-${item.fts_id}`)}
                                                onChange={(e) => {
                                                    if (selectAll) {
                                                        setValue(`FTS-${item.fts_id}`, e.target.checked);
                                                    }
                                                }}
                                            />
                                        }
                                        label={item.FTS_name}
                                    />
                                </>
                            )}
                        </Box>
                    ))}

                </Box>
                <Stack direction='column' spacing={2} className='my-6'>
                    <TextField
                        type='text'
                        label='ชื่อแผน'
                        fullWidth
                        {...register('plan_name')}
                    />
                    <TextField
                        type='number'
                        label='เวลาประมวณผล (นาที)'
                        fullWidth
                        {...register('computetime')}
                        defaultValue={1}
                    />
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DatePicker']}>
                            <DatePicker
                                label="เลือกวันที่เริ่มแผน"
                                value={started}
                                onChange={(newValue) => setStarted(newValue)}
                            />
                        </DemoContainer>
                    </LocalizationProvider>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DatePicker']}>
                            <DatePicker
                                label="เลือกวันที่จบแผน"
                                value={ended}
                                onChange={(newValue) => setEnded(newValue)}
                            />
                        </DemoContainer>
                    </LocalizationProvider>
                    <Typography>จำนวนรายการสินค้า {count}</Typography>
                </Stack>

            </Box>
            <LoadingTest open={open} handleClickOpen={handleClickOpen} handleClose={handleClose} />
        </form>
    );
}
