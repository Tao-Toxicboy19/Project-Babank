import { Button, Box, Dialog, DialogContent, DialogTitle, Slide, IconButton, Tooltip, TextField, Stack } from '@mui/material'
import { useState } from 'react';
import { TransitionProps } from '@mui/material/transitions';
import React from 'react';
import { RiEditLine } from 'react-icons/ri';
import { useAppDispatch } from '../../../../store/store';
import { cargoEditAsync } from '../../../../store/slices/Cargo/cargoEditSlice';
import { useForm } from 'react-hook-form';
import { cargoAsync } from '../../../../store/slices/Cargo/cargoSlice';

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function ShowFrom({ id, result, handleClose }: any) {
    const dispatch = useAppDispatch()
    const [isSubmitting, setIsSubmitting] = useState(false);
    const {
        register,
        handleSubmit,
        reset,
    } = useForm()

    const handleCancel = () => {
        reset()
        handleClose()
    }

    return (
        <form
            className='w-full flex flex-col gap-5'
            onSubmit={handleSubmit(async (data) => {
                setIsSubmitting(true)
                try {
                    const fetch = () => dispatch(cargoAsync())
                    await dispatch(cargoEditAsync({ id, data, handleClose, fetch }))
                    setIsSubmitting(false)
                } catch (error) {
                    setIsSubmitting(false)
                }
            })}
        >
            <Stack
                direction='row'
                spacing={2}
            >
                <TextField
                    id='cargo_name'
                    label='ชื่อสินค้า'
                    type="text"
                    defaultValue={result.cargo_name}
                    fullWidth
                    {...register('cargo_name', { required: true })}
                />
                <TextField
                    id='premium_rate'
                    label='ค่าหัวตัน (บาท/ตัน)'
                    type="text"
                    defaultValue={result.premium_rate}
                    fullWidth
                    {...register('premium_rate', { required: true })}
                />
            </Stack>
            <Stack
                direction='row'
                spacing={2}
            >
                <Button
                    fullWidth
                    variant="contained"
                    type="submit"
                    className='bg-[#1976D2] hover:bg-[#1563BC] font-kanit'
                    disabled={isSubmitting}
                >
                    บันทึก
                </Button>
                <Button
                    type='button'
                    variant='outlined'
                    onClick={handleCancel}
                    fullWidth
                >
                    ยกเลิก
                </Button>
            </Stack>
        </form>
    )
}

export default function CargoEditPage({ id, result }: { id: any; result: any }) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    return (
        <div>
            <Tooltip title="แก้ไข">
                <IconButton
                    onClick={handleOpen}
                >
                    <RiEditLine className="text-[#135812]" />
                </IconButton>
            </Tooltip>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
                fullWidth
                maxWidth='md'
            >
                <DialogTitle>{"แก้ไขสินค้า"}</DialogTitle>
                <Box>
                    <DialogContent>
                        <ShowFrom id={id} result={result} handleClose={handleClose} />
                    </DialogContent>
                </Box>
            </Dialog>
        </div>
    )
}