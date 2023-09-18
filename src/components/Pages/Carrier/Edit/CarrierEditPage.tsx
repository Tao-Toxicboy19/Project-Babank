import { Button, Box, Dialog, DialogContent, DialogTitle, Slide, IconButton, Tooltip } from '@mui/material'
import { btnColor } from '../../../../style/Styles'
import { Field, Form, Formik, FormikProps } from 'formik';
import { TextField } from 'formik-material-ui';
import { useDispatch } from 'react-redux';
import Edit from '@mui/icons-material/Edit';
import { useState } from 'react';
import { TransitionProps } from '@mui/material/transitions';
import React from 'react';
import { setUpdateCarrier } from '../../../../store/slices/carrier.slice';
import { updateCarrier } from '../../../../store/slices/carrier.edit.slice';
import { Carrier } from '../../../../types/Carrier.type';

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function CarrierEditPage({ id, result }: { id: any; result: any }) {
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch<any>();
    const handleClose = () => setOpen(false);
    const handleSubmit = (values: any, { setSubmitting }: any) => {
        dispatch(updateCarrier(id, values, setOpen))
        dispatch(setUpdateCarrier(values))
        alert(JSON.stringify(values))
        setSubmitting(false);
    };

    const showForm = ({ isSubmitting }: FormikProps<Carrier>) => {
        return (
            <Form>
                <Box className='flex flex-col gap-4 m-3'>
                    <Field
                        component={TextField}
                        name='carrier_name'
                        type='text'
                        label='ชื่อ'
                        fullWidth
                    />
                    <Field
                        component={TextField}
                        name='ower'
                        type='text'
                        label='ชื่อบริษัท'
                        fullWidth
                    />
                    <Field
                        component={TextField}
                        name='maxcapacity'
                        type='number'
                        label='ความจุสูงสุด (ตัน)'
                        fullWidth
                    />
                    <Field
                        component={TextField}
                        name='burden'
                        type='number'
                        label='จำนวนระวาง'
                        fullWidth
                    />
                </Box>
                <Box className="flex justify-end gap-x-3 mt-3 mx-1">
                    <Button
                        variant="outlined"
                        onClick={() => setOpen(false)}
                    >
                        Exit
                    </Button>
                    <Button
                        variant="contained"
                        type="submit"
                        style={btnColor}
                        disabled={isSubmitting}
                    >
                        Save
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
                    <Edit className='text-emerald-700' />
                </IconButton>
            </Tooltip>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
                maxWidth="lg"
                fullWidth
            >
                <DialogTitle>{"เพิ่มทุ่น"}</DialogTitle>
                <DialogContent>
                    <Formik initialValues={result} onSubmit={handleSubmit}>
                        {(props: any) => showForm(props)}
                    </Formik>
                </DialogContent>
            </Dialog>
        </div>
    )
}