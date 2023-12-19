import React, { Dispatch, SetStateAction } from 'react';
import { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogTitle,
    Slide,
    Card,
    CardContent,
    TextField,
    Button,
    Stack,
    Alert,
    Box
} from '@mui/material'
import { TransitionProps } from '@mui/material/transitions';
import { Typography } from '@mui/material';
import { cargoAddAsync } from '../../../../store/slices/Cargo/cargoAddSlice';
import { useAppDispatch } from '../../../../store/store';
import { useForm, SubmitHandler, useFieldArray } from 'react-hook-form';
import { cargoAsync } from '../../../../store/slices/Cargo/cargoSlice';
import { CLOSE, SAVE } from '../../../../Constants';

type Props = {
    open: boolean
    setOpen: Dispatch<SetStateAction<boolean>>
}

interface FormData {
    inputs: {
        cargo_names: string
        premium_rate: number | null
    }[];
}

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function ShowFrom({ handleClose }: { handleClose: () => void }) {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const dispatch = useAppDispatch()
    const {
        register,
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FormData>({
        defaultValues: {
            inputs: [{ cargo_names: '', premium_rate: null }],
        },
    });
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'inputs',
    });
    const fetch = () => dispatch(cargoAsync())
    const onSubmit: SubmitHandler<FormData> = async (data) => {
        setIsSubmitting(true)
        try {
            await dispatch(cargoAddAsync({ data, handleClose, fetch }))
            setIsSubmitting(false)
        } catch (error) {
            setIsSubmitting(false)
        }
    }

    const handleReset = () => {
        reset({
            inputs: [{ cargo_names: '', premium_rate: null }],
        })
    }
    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className='flex flex-col gap-y-5'
        >
            {fields.map((field, index) => (
                <Stack
                    direction='row'
                    spacing={2}
                    key={index}
                >
                    <Box className='w-full'>
                        <TextField
                            key={index}
                            id={`inputs.${index}.cargo_names`}
                            label='ชื่อสินค้า'
                            type="text"
                            defaultValue={field.cargo_names}
                            fullWidth
                            {...register(`inputs.${index}.cargo_names` as const, {
                                required: true
                            })}
                        />
                        {errors?.inputs?.[index]?.cargo_names && (
                            <Alert variant="outlined" severity="error" className='mt-2'>
                                กรุณากรอกชื่อสินค้า
                            </Alert>
                        )}
                    </Box>
                    <Box className='w-full'>
                        <TextField
                            key={index}
                            id={`inputs.${index}.premium_rate`}
                            label='ค่าหัวตัน (บาท/ตัน)'
                            type="text"
                            defaultValue={field.premium_rate}
                            fullWidth
                            {...register(`inputs.${index}.premium_rate` as const, {
                                required: true
                            })}
                        />
                        {errors?.inputs?.[index]?.premium_rate && (
                            <Alert variant="outlined" severity="error" className='mt-2'>
                                กรุณากรอกชื่อสินค้า
                            </Alert>
                        )}
                    </Box>
                    <Button
                        variant='outlined'
                        type="button"
                        onClick={() => remove(index)}
                        className='w-1/4'
                    >
                        ลบสินค้า
                    </Button>
                </Stack>
            ))
            }
            <Stack
                direction='column'
                spacing={2}
            >
                <Stack
                    direction='row'
                    spacing={2}
                >
                    <Button
                        fullWidth
                        variant="contained"
                        type="submit"
                        className='bg-blue-600 hover:bg-blue-700 font-kanit py-2.5'
                        disabled={isSubmitting}
                    >
                        {SAVE}
                    </Button>
                    <Button
                        type="button"
                        variant='outlined'
                        onClick={() => { handleClose(); handleReset(); }}
                        fullWidth
                    >
                        {CLOSE}
                    </Button>
                </Stack>
                <Stack
                    direction='row'
                    spacing={2}
                >
                    <Button
                        type="button"
                        variant='outlined'
                        onClick={() => append({ cargo_names: '', premium_rate: null })}
                    >
                        เพิ่มสินค้า
                    </Button>
                    <Button
                        variant='outlined'
                        type="button"
                        onClick={handleReset}
                    >
                        Reset
                    </Button>
                </Stack>
            </Stack>
        </form >
    )
}

export default function CargoCreatePage({ open, setOpen }: Props) {
    const handleClose = () => setOpen(false)

    return (
        <>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
                fullWidth
                maxWidth='md'
            >
                <DialogTitle className='flex justify-center font-kanit'>
                    <Typography
                        variant="h6"
                        noWrap
                        sx={{
                            mr: 2,
                            fontSize: 33,
                            display: { xs: "none", md: "flex" },
                            fontFamily: "monospace",
                            fontWeight: 700,
                            letterSpacing: ".1rem",
                            color: "inherit",
                            textDecoration: "none",
                        }}
                        className='text-blue-900'
                    >
                        เพิ่มสินค้า
                    </Typography>
                </DialogTitle>
                <Card>
                    <CardContent>
                        <DialogContent>
                            <ShowFrom handleClose={handleClose} />
                        </DialogContent>
                    </CardContent>
                </Card>
            </Dialog>
        </>
    );
};
