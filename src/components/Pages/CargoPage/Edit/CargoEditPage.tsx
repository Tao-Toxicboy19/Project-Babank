import { Button, Box, Dialog, DialogContent, DialogTitle, Slide, IconButton, Tooltip } from '@mui/material'
import { Field, Form, Formik, FormikProps } from 'formik';
import { TextField } from 'formik-material-ui';
import { useState } from 'react';
import { TransitionProps } from '@mui/material/transitions';
import React from 'react';
import { Cargo } from '../../../../type/Cargo.type';
import { RiEditLine } from 'react-icons/ri';
import { useAppDispatch } from '../../../../store/store';
import { cargoEditAsync } from '../../../../store/slices/Cargo/cargoEditSlice';

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function CargoEditPage({ id, result }: { id: any; result: any }) {
    const [open, setOpen] = useState(false);
    const dispatch = useAppDispatch()
    const [isSubmitting, setIsSubmitting] = useState(false);
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    const handleSubmit = (values: any) => {
        try {
            dispatch(cargoEditAsync({id, values, handleClose}))
        } catch (error) {
            setIsSubmitting(false);
        }
    };



    const showForm = ({ }: FormikProps<Cargo>) => {
        return (
            <Form>
                <Box className='flex flex-col gap-4 m-3'>
                    <Field
                        className='font-kanit'
                        component={TextField}
                        name='cargo_name'
                        type='text'
                        label='ชื่อสินค้า'
                        fullWidth
                    />
                </Box>
                <Box className="flex justify-end gap-x-3 mt-3 mx-1">
                    <Button
                        variant="outlined"
                        onClick={() => setOpen(false)}
                        className='font-kanit'
                    >
                        กลับ
                    </Button>
                    <Button
                        variant="contained"
                        type="submit"
                        disabled={isSubmitting}
                        className='font-kanit bg-[#66BB6A] hover:bg-[#1B5E20]'
                    >
                        บันทึก
                    </Button>
                </Box>
            </Form>
        )
    }

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
            >
                <DialogTitle>{"แก้ไขสินค้า"}</DialogTitle>
                <Box className="w-[600px] ">
                    <DialogContent>
                        <Formik initialValues={result} onSubmit={handleSubmit}>
                            {(props: any) => showForm(props)}
                        </Formik>
                    </DialogContent>
                </Box>
            </Dialog>
        </div>
    )
}