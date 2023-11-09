import { Button, Box, Dialog, DialogContent, DialogTitle, Slide, IconButton, Tooltip } from '@mui/material'
import { btnColor } from '../../../../style/Styles'
import { Field, Form, Formik, FormikProps } from 'formik';
import { TextField } from 'formik-material-ui';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { TransitionProps } from '@mui/material/transitions';
import React from 'react';
import { Cargo } from '../../../../types/Cargo.type';
import SaveIcon from '@mui/icons-material/Save';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { RiEditLine } from 'react-icons/ri';
import { updateCargo } from '../../../../store/slices/Cargo/cargo.edit.slice';
import { setUpdateCargo } from '../../../../store/slices/Cargo/cargo.slice';

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
    const dispatch = useDispatch<any>();
    const handleClose = () => setOpen(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = (values: any) => {
        try {
            dispatch(updateCargo(id, values, setOpen))
            dispatch(setUpdateCargo(values))
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
                        startIcon={<ArrowBackIosIcon />}
                        className='font-kanit'
                    >
                        กลับ
                    </Button>
                    <Button
                        variant="contained"
                        type="submit"
                        style={btnColor}
                        disabled={isSubmitting}
                        startIcon={<SaveIcon />}
                        className='font-kanit'
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
                    onClick={() => setOpen(true)}
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