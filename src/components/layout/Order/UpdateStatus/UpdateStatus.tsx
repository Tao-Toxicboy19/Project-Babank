import { DialogTitle, DialogContent, DialogContentText, Button, Dialog, TextField, Tooltip, Typography, Alert, Stack, FormControl, InputLabel, MenuItem, Select, Box } from '@mui/material';
import { useState } from 'react'
import { useForm } from 'react-hook-form';
import { Orders } from '../../../../types/Order.type';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { updateStatus } from '../../../../store/slices/Order/order.slice';
import { RootState } from '../../../../store/store';
import { httpClient } from '../../../../utils/httpclient';
import { toast } from 'react-toastify';
import { Failure, SUCCESS } from '../../../../Constants';

type Props = {
    items: Orders
}

export default function UpdateStatus({ items }: Props) {
    const [open, setOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false); // เพิ่ม state สำหรับการกำลัง submit
    const dispatch = useDispatch<any>();
    const [selectedStatus, setSelectedStatus] = useState('Approved');
    const FTSReducer = useSelector((state: RootState) => state.FTS)
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();
    let totalBulk = 0;

    for (const cargoOrder of items.cargo_order) {
        totalBulk += cargoOrder.bulk;
    }

    let totalLoad = 0;

    for (const cargoOrder of items.cargo_order) {
        totalLoad += cargoOrder.load;
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        reset();
        setOpen(false);
    };

    const AssignForm = () => {
        return (
            <DialogContentText id="alert-dialog-description">
                <form
                    onSubmit={handleSubmit((data) => {
                        setIsSubmitting(true);

                        dispatch(updateStatus(items.or_id, setIsSubmitting, data, () => {
                            handleClose();
                            setIsSubmitting(false);
                        }));
                    })}
                >
                    <Stack direction='column' spacing={2} className='w-[1200px] my-5'>
                        <Stack direction='row' spacing={2} className=''>
                            <TextField
                                fullWidth
                                id={`real_start_time`}
                                label='สถานะ'
                                variant="outlined"
                                className='font-kanit'
                                type='text'
                                disabled={true}
                                defaultValue={"Assign"}
                            />
                            <TextField
                                fullWidth
                                id={`real_start_time`}
                                label='ชื่อเรือ'
                                variant="outlined"
                                className='font-kanit'
                                type='text'
                                disabled={true}
                                defaultValue={items.carrier.carrier_name}
                            />
                            <TextField
                                fullWidth
                                id={`real_start_time`}
                                label='วัน-เวลา มาถึง'
                                variant="outlined"
                                className='font-kanit'
                                type='text'
                                disabled={true}
                                defaultValue={items.arrival_time ? moment(items.arrival_time).add(12, 'hours').format('DD/MM/YYYY HH:mm:ss') : ""}
                            />
                            <TextField
                                fullWidth
                                id={`real_start_time`}
                                label='วัน-เวลา สิ้นสุด'
                                variant="outlined"
                                className='font-kanit'
                                type='text'
                                disabled={true}
                                defaultValue={items.deadline_time ? moment(items.deadline_time).add(12, 'hours').format('DD/MM/YYYY HH:mm:ss') : ""}
                            />
                        </Stack>

                        {Array.from({ length: items.maxFTS }, (_, index) => (
                            <Box key={index} className='grid grid-cols-4 gap-5'>
                                <Box>
                                    <label htmlFor="" className='opacity-0'>ฟหก</label>
                                    <FormControl fullWidth>
                                        <InputLabel id={`demo-simple-select-label-${index + 1}`}>เลือกทุ่น</InputLabel>
                                        <Select
                                            labelId={`demo-simple-select-label-${index + 1}`}
                                            id={`FTS_id${index + 1}`}
                                            label="เลือกทุ่น"
                                            {...register(`FTS_id${index + 1}`, { required: true, valueAsNumber: true })}
                                        >
                                            {(FTSReducer.FTS).map((items) => (
                                                <MenuItem key={items.fts_id} value={items.fts_id} className='font-kanit'>
                                                    {items.FTS_name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                    {errors[`FTS_id${index + 1}`] && <Alert severity="error">กรอกข้อมูล</Alert>}
                                </Box>
                                <Box>
                                    <label htmlFor="" className='opacity-0'>ฟหก</label>

                                    <TextField
                                        key={`load${index + 1}`}
                                        fullWidth
                                        id={`load${index + 1}`}
                                        variant="outlined"
                                        className='font-kanit'
                                        type='number'
                                        disabled={true}
                                        defaultValue={totalLoad}
                                    />
                                </Box>
                                <Box>
                                    <label htmlFor="" className='opacity-0'>ฟหก</label>
                                    <TextField
                                        key={`bulk${index + 1}`}
                                        fullWidth
                                        id={`bulk${index + 1}`}
                                        label={`ระวาง ${index + 1}`}
                                        variant="outlined"
                                        className='font-kanit'
                                        type='number'
                                        {...register(`bulk${index + 1}`, { required: true, valueAsNumber: true })}
                                    />
                                    {errors[`bulk${index + 1}`] && <Alert severity="error">กรอกข้อมูล</Alert>}

                                </Box>
                                <Box>
                                    <label htmlFor="">เวลาเริ่ม</label>
                                    <TextField
                                        fullWidth
                                        id={`real_start_time${index + 1}`}
                                        variant="outlined"
                                        className='font-kanit'
                                        type='datetime-local'
                                        {...register(`real_start_time${index + 1}`, { required: true })}
                                    />
                                    {errors[`real_start_time${index + 1}`] && <Alert severity="error">กรอกข้อมูล</Alert>}
                                </Box>
                            </Box>
                        ))}
                        <Stack direction='row' spacing={2}>
                            <Button
                                fullWidth
                                onClick={handleClose}
                                variant="outlined"
                                className='font-kanit text-lg'
                            >
                                cancel
                            </Button>
                            <Button
                                fullWidth
                                variant="contained"
                                className='bg-[#1976D2] hover:bg-[#1563BC] font-kanit text-lg'
                                type="submit"
                                disabled={isSubmitting}
                            >
                                confirm
                            </Button>
                        </Stack>
                    </Stack>
                </form>
            </DialogContentText>
        )
    }

    const ApprovedForm = () => {
        return (
            <DialogContentText id="alert-dialog-description">
                <form
                    onSubmit={handleSubmit((data) => {
                        setIsSubmitting(true);
                        console.log(data);
                        httpClient.patch(`/updatestatus-approved/${items.or_id}`, data)
                            .then(() => {
                                handleClose()
                                toast.success(SUCCESS)
                            })
                            .catch((error) => {
                                if (error.response && error.response.status === 500) {
                                    toast.warn(Failure);
                                    setIsSubmitting(false);
                                }
                                setIsSubmitting(false);
                            });
                    })}
                >
                    <Stack direction='column' spacing={2} className='w-[1200px] my-5'>
                        <Stack direction='row' spacing={2} className=''>
                            <TextField
                                fullWidth
                                id={`real_start_time`}
                                label='สถานะ'
                                variant="outlined"
                                className='font-kanit'
                                type='text'
                                disabled={true}
                                defaultValue={"Approved"}
                            />
                            <TextField
                                fullWidth
                                id={`real_start_time`}
                                label='ชื่อเรือ'
                                variant="outlined"
                                className='font-kanit'
                                type='text'
                                disabled={true}
                                defaultValue={items.carrier.carrier_name}
                            />
                            <TextField
                                fullWidth
                                id={`real_start_time`}
                                label='วัน-เวลา มาถึง'
                                variant="outlined"
                                className='font-kanit'
                                type='text'
                                disabled={true}
                                defaultValue={items.arrival_time ? moment(items.arrival_time).add(12, 'hours').format('DD/MM/YYYY HH:mm:ss') : ""}
                            />
                            <TextField
                                fullWidth
                                id={`real_start_time`}
                                label='วัน-เวลา สิ้นสุด'
                                variant="outlined"
                                className='font-kanit'
                                type='text'
                                disabled={true}
                                defaultValue={items.deadline_time ? moment(items.deadline_time).add(12, 'hours').format('DD/MM/YYYY HH:mm:ss') : ""}
                            />
                        </Stack>

                        {Array.from({ length: items.maxFTS }, (_, index) => (
                            <Box key={index} className='grid grid-cols-5 gap-5'>
                                <Box>
                                    <label htmlFor="" className='opacity-0'>เวลาเริ่ม</label>
                                    <FormControl fullWidth>
                                        <InputLabel id={`demo-simple-select-label-${index + 1}`}>เลือกทุ่น</InputLabel>
                                        <Select
                                            labelId={`demo-simple-select-label-${index + 1}`}
                                            id={`FTS_id${index + 1}`}
                                            label="เลือกทุ่น"
                                            {...register(`FTS_id${index + 1}`, { required: true, valueAsNumber: true })}
                                        >
                                            {(FTSReducer.FTS).map((items) => (
                                                <MenuItem key={items.fts_id} value={items.fts_id} className='font-kanit'>
                                                    {items.FTS_name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                    {errors[`FTS_id${index + 1}`] && <Alert severity="error">กรอกข้อมูล</Alert>}
                                </Box>
                                <Box>
                                    <label htmlFor="" className='opacity-0'>เวลาเริ่ม</label>

                                    <TextField
                                        key={`load${index + 1}`}
                                        fullWidth
                                        id={`load${index + 1}`}
                                        variant="outlined"
                                        className='font-kanit'
                                        type='number'
                                        disabled={true}
                                        defaultValue={totalLoad}
                                    />
                                </Box>
                                <Box>
                                    <label htmlFor="" className='opacity-0'>เวลาเริ่ม</label>
                                    <TextField
                                        key={`bulk${index + 1}`}
                                        fullWidth
                                        id={`bulk${index + 1}`}
                                        label={`ระวาง ${index + 1}`}
                                        variant="outlined"
                                        className='font-kanit'
                                        type='number'
                                        {...register(`bulk${index + 1}`, { required: true, valueAsNumber: true })}
                                    />
                                    {errors[`bulk${index + 1}`] && <Alert severity="error">กรอกข้อมูล</Alert>}

                                </Box>
                                <Box>
                                    <label htmlFor="">เวลาเริ่ม</label>

                                    <TextField
                                        fullWidth
                                        id={`real_start_time${index + 1}`}
                                        variant="outlined"
                                        className='font-kanit'
                                        type='datetime-local'
                                        {...register(`real_start_time${index + 1}`, { required: true })}
                                    />
                                    {errors[`real_start_time${index + 1}`] && <Alert severity="error">กรอกข้อมูล</Alert>}
                                </Box>
                                <Box>
                                    <label htmlFor="">เวลาเสร็จ</label>
                                    <TextField
                                        fullWidth
                                        id={`real_end_time${index + 1}`}
                                        variant="outlined"
                                        className='font-kanit'
                                        type='datetime-local'
                                        {...register(`real_end_time${index + 1}`, { required: true })}
                                    />
                                    {errors[`real_end_time${index + 1}`] && <Alert severity="error">กรอกข้อมูล</Alert>}
                                </Box>
                            </Box>
                        ))}
                        <Stack direction='row' spacing={2}>
                            <Button
                                fullWidth
                                onClick={handleClose}
                                variant="outlined"
                                className='font-kanit text-lg'
                            >
                                cancel
                            </Button>
                            <Button
                                fullWidth
                                variant="contained"
                                className='bg-[#1976D2] hover:bg-[#1563BC] font-kanit text-lg'
                                type="submit"
                            // disabled={isSubmitting}
                            >
                                confirm
                            </Button>
                        </Stack>
                    </Stack>
                </form>
            </DialogContentText>
        )
    }

    return (
        <>
            <Tooltip title={items.status_order === 'In Plan' || items.status_order === 'Newer' ? "" : "เปลี่ยนสถานะ"}>
                {/* <Tooltip title={items.status_order !== 'In Plan' ? "เปลี่ยนสถานะ" : ""}> */}
                <Typography
                    className={`w-[110px] h-fit px-[10px] py-[1px] rounded-lg ${items.status_order === 'Newer' ? 'bg-emerald-100 text-emerald-950 cursor-pointer' : items.status_order === 'Assign' ? 'bg-purple-100 text-indigo-900 cursor-pointer' : 'bg-slate-200 text-gray-700 cursor-pointer'} ${items.status_order === 'Approved' ? 'disabled' : ''} ${items.status_order === 'In Plan' || items.status_order === 'Newer' ? 'cursor-no-drop' : ''}`}
                    onClick={handleClickOpen}
                // onClick={items.status_order === 'In Plan' || items.status_order === 'Newer' ? undefined : handleClickOpen}
                >
                    {items.status_order}
                </Typography>
            </Tooltip>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                maxWidth='xl'
            >
                <DialogTitle id="alert-dialog-title">
                    <Typography
                        variant='h5'
                        component='h1'
                        noWrap
                        sx={{
                            mr: 2,
                            fontSize: 26,
                            display: { xs: "none", md: "flex" },
                            fontFamily: "monospace",
                            fontWeight: 600,
                            letterSpacing: ".1rem",
                            color: "inherit",
                            textDecoration: "none",
                        }}
                        className='text-slate-900 font-kanit'
                    >
                        ยืนยันข้อมูลการขนถ่านสินค้า

                    </Typography>
                    <hr />
                </DialogTitle>
                <DialogContent>
                    <Box className='flex flex-row gap-x-2'>
                        <Button variant="outlined" onClick={() => setSelectedStatus('Approved')}>Approved</Button>
                        <Button variant="outlined" onClick={() => setSelectedStatus('Assign')}>Assign</Button>
                    </Box>

                    {selectedStatus === 'Approved' && ApprovedForm()}
                    {selectedStatus === 'Assign' && AssignForm()}

                </DialogContent>
            </Dialog >
        </>
    )
}