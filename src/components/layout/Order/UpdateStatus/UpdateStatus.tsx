import { DialogTitle, DialogContent, Button, Dialog, TextField, Tooltip, Typography, Alert, Stack, FormControl, InputLabel, MenuItem, Select, Box } from '@mui/material';
import { useState } from 'react'
import { useForm } from 'react-hook-form';
import { Orders } from '../../../../types/Order.type';
import { useDispatch, useSelector } from 'react-redux';
import { loadOrder } from '../../../../store/slices/Order/order.slice';
import { RootState } from '../../../../store/store';
import { httpClient } from '../../../../utils/httpclient';
import { toast } from 'react-toastify';
import { SUCCESS } from '../../../../Constants';

import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Loading from '../../Loading/Loading';
import moment from 'moment';

type Props = {
    items: Orders
}

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

function AssignForm({ items, handleClose }: any) {

    const [isSubmitting, setIsSubmitting] = useState(false); // เพิ่ม state สำหรับการกำลัง submit
    const FTSReducer = useSelector((state: RootState) => state.FTS)
    const dispatch = useDispatch<any>();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();
    let totalBulk = 0;
    let totalLoad = 0;

    for (const cargoOrder of items.cargo_order) {
        totalLoad += cargoOrder.load;
    }
    for (const cargoOrder of items.cargo_order) {
        totalBulk += cargoOrder.bulk;
    }
    return (
        <form
            onSubmit={handleSubmit((data) => {
                setIsSubmitting(true);
                console.log(data)
                setIsSubmitting(true);

                httpClient.patch(`/updatestatus/${items.or_id}`, data)
                    .then(() => {
                        dispatch(loadOrder())
                        handleClose()
                        reset()
                        toast.success(SUCCESS)
                    })
                    .catch(() => {
                        setIsSubmitting(false);
                    });
            })}
        >
            <Stack direction='column' spacing={2} className='w-[1200px] my-5'>
                {Array.from({ length: totalBulk }, (_, index) => (
                    <Box key={index} className='grid grid-cols-4 gap-5'>
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
                                defaultValue={index + 1}
                                value={index + 1}
                                {...register(`bulk${index + 1}`, { valueAsNumber: true })}
                            />
                        </Box>
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
                            <label htmlFor="">เวลาเริ่ม</label>

                            <TextField
                                fullWidth
                                id={`real_start_time${index + 1}`}
                                variant="outlined"
                                className='font-kanit'
                                type='datetime-local'
                                defaultValue={moment(items.arrival_time).format("YYYY-MM-DDTHH:mm")}
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
    )
}

function ApprovedForm({ items, handleClose }: any) {
    const [isSubmitting, setIsSubmitting] = useState(false); // เพิ่ม state สำหรับการกำลัง submit
    const FTSReducer = useSelector((state: RootState) => state.FTS)
    const dispatch = useDispatch<any>();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();
    let totalBulk = 0;
    let totalLoad = 0;

    for (const cargoOrder of items.cargo_order) {
        totalLoad += cargoOrder.load;
    }
    for (const cargoOrder of items.cargo_order) {
        totalBulk += cargoOrder.bulk;
    }

    return (
        <form
            onSubmit={handleSubmit((data) => {
                setIsSubmitting(true);

                httpClient.patch(`/updatestatus-approved/${items.or_id}`, data)
                    .then(() => {
                        handleClose()
                        dispatch(loadOrder())
                        reset()
                        toast.success(SUCCESS)
                    })
                    .catch(() => {
                        setIsSubmitting(false);
                    });
            })}
        >
            <Stack direction='column' spacing={2} className='w-[1200px] my-5'>
                {Array.from({ length: totalBulk }, (_, index) => (
                    <Box key={index} className='grid grid-cols-5 gap-5'>
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
                                defaultValue={index + 1}
                                value={index + 1}
                                {...register(`bulk${index + 1}`, { valueAsNumber: true })}
                            />
                        </Box>
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
                            <label htmlFor="">เวลาเริ่ม</label>

                            <TextField
                                fullWidth
                                id={`real_start_time${index + 1}`}
                                variant="outlined"
                                className='font-kanit'
                                type='datetime-local'
                                // moment(items.arrival_time).format("YYYY-MM-DDTHH:mm")
                                defaultValue={moment(items.arrival_time).format("YYYY-MM-DDTHH:mm")}
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
                                defaultValue={moment(items.deadline_time).format("YYYY-MM-DDTHH:mm")}
                                // defaultValue={items.deadline_time}
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
                        disabled={isSubmitting}
                    >
                        confirm
                    </Button>
                </Stack>
            </Stack>
        </form>
    )
}

export default function UpdateStatus({ items }: Props) {
    const [open, setOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false); // เพิ่ม state สำหรับการกำลัง submit
    const dispatch = useDispatch<any>();
    let totalBulk = 0;

    for (const cargoOrder of items.cargo_order) {
        totalBulk += cargoOrder.bulk;
    }

    const [value, setValue] = React.useState(0);

    const handleChange = (_: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    if (items === null) {
        return (
            <Loading />
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
                        {items.carrier.carrier_name}
                    </Typography>
                    <hr />
                    <Box sx={{ width: '100%' }} className='mt-2'>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                                <Tab label="Approved" {...a11yProps(0)} />
                                <Tab label="Assign" {...a11yProps(1)} />
                                <Tab label="Newer" {...a11yProps(2)} />
                            </Tabs>
                        </Box>
                        <CustomTabPanel value={value} index={0}>
                            <ApprovedForm items={items} handleClickOpen={handleClickOpen} handleClose={handleClose} />
                        </CustomTabPanel>
                        <CustomTabPanel value={value} index={1}>
                            <AssignForm items={items} handleClickOpen={handleClickOpen} handleClose={handleClose} />
                        </CustomTabPanel>
                        <CustomTabPanel value={value} index={2}>
                            <Box className='min-w-[1200px] min-h-[20vh] '>
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
                                    className='text-slate-900 font-kanit flex justify-center mb-5'
                                >
                                    เปลี่ยนสถานะเป็น Newer
                                </Typography>
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
                                        onClick={() => {
                                            setIsSubmitting(true);
                                            httpClient.patch(`/update-status-order/${items.or_id}`, {})
                                                .then(() => {
                                                    dispatch(loadOrder())
                                                    setIsSubmitting(false);
                                                })
                                                .catch(() => setIsSubmitting(false))
                                        }}
                                        disabled={isSubmitting}
                                    >
                                        confirm
                                    </Button>
                                </Stack>
                            </Box>
                        </CustomTabPanel>
                    </Box>
                </DialogContent>
            </Dialog >
        </>
    )
}