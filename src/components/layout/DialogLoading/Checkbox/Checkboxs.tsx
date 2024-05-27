import * as React from 'react'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import { useForm } from 'react-hook-form'
import { Box, Button, Stack, TextField } from '@mui/material'
import { useSelector } from 'react-redux'
import LoadingTest from './loading/LoadinTest'
import { Typography } from '@mui/material'
import { roleSelector } from '../../../../store/slices/auth/rolesSlice'
import { ftsSelector } from '../../../../store/slices/FTS/ftsSlice'
import { orderSelector } from '../../../../store/slices/Order/orderSlice'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import dayjs, { Dayjs } from 'dayjs'
import { toast } from "react-toastify"
import { planSelector } from '../../../../store/slices/planSlicec'
import 'dayjs/locale/th';
import { apiManagePlans, SUCCESS } from '../../../../Constants'
import { httpClient } from '../../../../utils/httpclient'

dayjs.locale('th')

type Props = {
    handleCloseV2: any
}

export default function Checkboxs({ handleCloseV2 }: Props) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()
    const rolesReducer = useSelector(roleSelector)
    const [open, setOpen] = React.useState(false)
    const ftsReducer = useSelector(ftsSelector)
    const orderRucer = useSelector(orderSelector)
    const filteredOrders = (orderRucer.result).filter((group) => group.group === rolesReducer.result?.group)
    const arrivalTimes = filteredOrders.map(order => {
        // แปลง arrival_time เป็นวัตถุ Date
        const arrivalDate = new Date(order.arrival_time)
        // รับ timestamp ของ arrival_time
        return arrivalDate.getTime()
    })

    // หาวันที่น้อยที่สุด
    const minArrivalTime = new Date(Math.min(...arrivalTimes))
    const convertTimestampToDayjs = (timestamp: any) => {
        return dayjs(timestamp)
    }

    // สร้างอาร์เรย์เพื่อเก็บ timestamp ของทุก deadline_time
    const deadlineTimes = filteredOrders.map(order => {
        // แปลง deadline_time เป็นวัตถุ Date
        const deadlineDate = new Date(order.deadline_time);
        // รับ timestamp ของ deadline_time
        return deadlineDate.getTime()
    });

    // หาวันที่มากที่สุด
    const maxDeadlineTime = new Date(Math.max(...deadlineTimes));

    // แปลง maxDeadlineTime เป็น Dayjs object
    const minArrivalTimeDayjs = convertTimestampToDayjs(minArrivalTime)
    const maxDeadlineTimeDayjs = convertTimestampToDayjs(maxDeadlineTime);

    const orderRucerV2 = (filteredOrders).filter((order) => order.status_order !== "Approved")
    const [started, setStarted] = React.useState<Dayjs | null>(minArrivalTimeDayjs)
    const [ended, setEnded] = React.useState<Dayjs | null>(maxDeadlineTimeDayjs)
    const [count, setCount] = React.useState<number | null>(0)
    const planReducer = useSelector(planSelector)
    const handleClickOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const onSubmit = async (formData: any) => {
        const fts: number[] = [];
        for (let key in formData) {
            if (!isNaN(parseInt(key))) {
                if (formData[key]) {
                    fts.push(+key)
                }
            }
        }

        const result = { fts: fts };
        const order = orderRucerV2
            .filter((item) => formData[`Carrier-${item.carrier.cr_id}`])
            .map((item) => ({
                cr_id: item.carrier.cr_id,
                // เพิ่มข้อมูลอื่น ๆ ที่คุณต้องการในออบเจ็กต์นี้
            }))
        if (started === undefined || ended === undefined) {
            toast.warn('กรอกข้อมูลให้ครบ')
        } else {
            handleClickOpen()
            const planId = planReducer.planAi.find(p => p.plan_name === formData.plan_name)?.id

            let values: any = {
                computetime: formData.computetime,
                Group: rolesReducer.result?.group,
                order,
                started,
                ended,
                plan_type: "ai",
                plan_name: formData.plan_name,
                fts: result.fts,
                plan_id: planId
            }
            const res = await httpClient.post('plan', values)
            values = {
                ...values,
                solution_id: res.data.message
            }
            console.log(res.data)
            await httpClient.post(`${apiManagePlans}/route`, values)
            if (planId) {
                await httpClient.post('plan/remove', { plan_id: planId })
            }
            handleClose()
            handleCloseV2()
            toast.success(SUCCESS)
            window.location.reload()
        }
    }

    const updateCount = () => {
        const values = filteredOrders.filter((order) => {
            const arrivalTime = dayjs(order.arrival_time);
            const deadlineTime = dayjs(order.deadline_time);
            return (arrivalTime.isAfter(started) || arrivalTime.isSame(started)) &&
                (deadlineTime.isBefore(ended) || deadlineTime.isSame(ended));
        })
        setCount(values.length)
    };



    React.useEffect(() => {
        updateCount()
    }, [filteredOrders, started, ended]);


    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className='flex flex-col'
        >

            <Box className='flex justify-end'>
                <Button
                    variant='outlined'
                    type="submit"
                    disabled={count === 0}
                >
                    จัดการแผน
                </Button>
            </Box>

            <Box className='grid grid-cols-3'>
                <Box>
                    <Typography>เลือกทุ่น</Typography>

                    {(ftsReducer.result).map((item) => (
                        <Box key={item.fts_id}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        defaultChecked
                                        {...register(`${item.fts_id}`)}
                                    />
                                }
                                label={item.FTS_name}
                            />
                        </Box>
                    ))}

                </Box>
                <Stack direction='column' spacing={2} className='my-6'>
                    <TextField
                        type='text'
                        label='ชื่อแผน'
                        fullWidth
                        error={errors.plan_name && true}
                        helperText={
                            errors.plan_name
                                ? errors.plan_name.type === "required"
                                    ? "กรอกชื่อแผน"
                                    : "กรอกชื่อแผน"
                                : ""
                        }
                        {...register('plan_name', { required: true })}
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
                                defaultValue={minArrivalTimeDayjs}
                                label="เลือกวันที่เริ่มแผน"
                                value={started}
                                onChange={(newValue) => setStarted(newValue)}
                                format="DD/MM/YYYY hh:mm:ss"
                            />
                        </DemoContainer>
                    </LocalizationProvider>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DatePicker']}>
                            <DatePicker
                                defaultValue={maxDeadlineTimeDayjs}
                                label="เลือกวันที่จบแผน"
                                value={ended}
                                onChange={(newValue) => setEnded(newValue)}
                                format="DD/MM/YYYY hh:mm:ss"
                            />
                        </DemoContainer>
                    </LocalizationProvider>
                    <Typography>จำนวนรายการสินค้า {count}</Typography>
                </Stack>

            </Box>
            <LoadingTest open={open} handleClickOpen={handleClickOpen} handleClose={handleClose} />
        </form>
    )
}
