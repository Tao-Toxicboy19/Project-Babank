import { DialogTitle, DialogContent, DialogContentText, Button, Dialog, TextField, Tooltip, Typography, Alert, Stack } from '@mui/material';
import { useState } from 'react'
import { useForm } from 'react-hook-form';
import { Orders } from '../../../../types/Order.type';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { updateStatus } from '../../../../store/slices/Order/order.slice';
import { RootState } from '../../../../store/store';

type Props = {
    items: Orders
}

export default function UpdateStatus({ items }: Props) {
    const [open, setOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false); // เพิ่ม state สำหรับการกำลัง submit
    const dispatch = useDispatch<any>();
    const rolesReducer = useSelector((state: RootState) => state.rolesReducer);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    return (
        <>
            <Tooltip title={items.status_order !== 'Assign' ? "" : "เปลี่ยนสถานะ"}>
                <Typography
                    className={`w-[110px] h-fit px-[10px] py-[1px] rounded-lg ${items.status_order === 'Newer' ? 'bg-emerald-100 text-emerald-950' : items.status_order === 'Assign' ? 'bg-purple-100 text-indigo-900' : 'bg-slate-200 text-gray-700'} ${items.status_order === 'Approved' ? 'disabled' : ''}`}
                    style={{ cursor: rolesReducer.result?.role === 'Viewer' || items.status_order !== 'Assign' ? 'not-allowed' : 'pointer' }}
                    onClick={rolesReducer.result?.role === 'Viewer' || items.status_order !== 'Assign' ? undefined : handleClickOpen}
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
                    <DialogContentText id="alert-dialog-description">
                        <form
                            onSubmit={handleSubmit((data) => {
                                setIsSubmitting(true);
                                const dataNew = {
                                    ...data,
                                    real_start_time: moment(data.real_start_time).format('YYYY-MM-DD HH:mm:ss'),
                                    real_end_time: moment(data.real_end_time).format('YYYY-MM-DD HH:mm:ss'),
                                };
                                dispatch(updateStatus(items.or_id, dataNew, () => {
                                    handleClose();
                                    setIsSubmitting(false)
                                }));
                            })}
                        >
                            <Stack direction='column' spacing={2} className='w-[500px]'>
                                <Stack direction='column' spacing={1} >
                                    <label htmlFor="deadline_time" className='font-kanit'>เวลาเริ่มการขนถ่ายจริง</label>
                                    <TextField
                                        fullWidth
                                        id="real_start_time"
                                        variant="outlined"
                                        className='font-kanit'
                                        type='datetime-local'
                                        {...register('real_start_time', { required: true })}
                                    />
                                    {errors.real_start_time &&
                                        <Alert variant="outlined" severity="error" className='font-kanit'>
                                            กรุณากรอกข้อมูล
                                        </Alert>
                                    }

                                </Stack>
                                <Stack direction='column' spacing={1}>
                                    <label htmlFor="deadline_time" className='font-kanit'>เวลาสิ้นสุดการขนถ่ายจริง</label>
                                    <TextField
                                        fullWidth
                                        id="outlined-basic"
                                        variant="outlined"
                                        type='datetime-local'
                                        {...register('real_end_time', { required: true })}
                                    />
                                    {errors.real_end_time &&
                                        <Alert variant="outlined" severity="error" className='font-kanit'>
                                            กรุณากรอกข้อมูล
                                        </Alert>
                                    }
                                </Stack>
                                <TextField
                                    fullWidth
                                    id="outlined-basic"
                                    label="	หมายเหตุ"
                                    variant="outlined"
                                    {...register('reason')}
                                />
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
                </DialogContent>
            </Dialog>
        </>
    )
}