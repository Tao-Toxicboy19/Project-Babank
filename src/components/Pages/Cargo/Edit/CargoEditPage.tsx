import { Button, Box, Select, MenuItem, FormControl, InputLabel, Dialog, DialogContent, DialogTitle, Slide, IconButton, Tooltip } from '@mui/material'
import { btnColor } from '../../../../style/Styles'
import { Field, Form, Formik, FormikProps } from 'formik';
import { TextField } from 'formik-material-ui';
import { useDispatch } from 'react-redux';
import Edit from '@mui/icons-material/Edit';
import { useState } from 'react';
import { TransitionProps } from '@mui/material/transitions';
import React from 'react';
import { Cargo } from '../../../../types/Cargo.type';
import { setUpdateCargo } from '../../../../store/slices/cargo.slice';
import { updateCargo } from '../../../../store/slices/cargo.edit.slice';

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
    const handleSubmit = (values: any, { setSubmitting }: any) => {
        dispatch(updateCargo(id, values, setOpen))
        dispatch(setUpdateCargo(values))
        setSubmitting(false);
    };

    const showForm = ({ values, handleChange, isSubmitting }: FormikProps<Cargo>) => {
        return (
            <Form>
                <Box className='flex flex-col gap-4 m-3'>
                    <Field
                        component={TextField}
                        name='cargo_name'
                        type='text'
                        label='ชื่อ'
                        fullWidth
                    />
                    <Field
                        component={TextField}
                        name='consumption_rate'
                        type='number'
                        label='ชื่อบริษัท'
                        fullWidth
                    />
                    <Field
                        component={TextField}
                        name='work_rate'
                        type='number'
                        label='ความจุสูงสุด (ตัน)'
                        fullWidth
                    />
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">จำนวนเครน</InputLabel>
                        <Field
                            as={Select}
                            name='category'
                            label='จำนวนเครน'
                            value={values.category}
                            onChange={handleChange}
                            fullWidth
                        >
                            <MenuItem value='Import'>Import</MenuItem>
                            <MenuItem value='Export'>Export</MenuItem>
                        </Field>
                    </FormControl>
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