import { Button, Box, Select, MenuItem, FormControl, InputLabel, Dialog, DialogContent, DialogTitle, Slide, IconButton, Tooltip } from '@mui/material'
import { btnColor } from '../../../../style/Styles'
import { Field, Form, Formik, FormikProps } from 'formik';
import { TextField } from 'formik-material-ui';
import { Floating } from '../../../../types/FloatingCrane.type';
import { useDispatch, useSelector } from 'react-redux';
import Edit from '@mui/icons-material/Edit';
import { useState } from 'react';
import { TransitionProps } from '@mui/material/transitions';
import React from 'react';
import { Cargo } from '../../../../types/Cargo.type';
import { RootState } from '../../../../store/store';
import { CargoCrane } from '../../../../types/CargoCrane.type';
import { updateCargoCrane } from '../../../../store/slices/cargocrane.edit.slice';
import { setUpdateCargoCrane } from '../../../../store/slices/cargocrane.slice';

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function CargoCraneEditPage({ id, result }: { id: any; result: any }) {
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch<any>();
    const FloatingReducer = useSelector((state: RootState) => state.floating.floating);
    const cargoReducer = useSelector((state: RootState) => state.cargo.cargo);
    const handleClose = () => setOpen(false);
    const handleSubmit = (values: any, { setSubmitting }: any) => {
        dispatch(updateCargoCrane(id, values, setOpen))
        dispatch(setUpdateCargoCrane(values))
        alert(JSON.stringify(values))
        setSubmitting(false);
    };

    const showForm = ({ values, handleChange, isSubmitting }: FormikProps<CargoCrane>) => {
        return (
            <Form>
                <Box className='flex flex-col gap-4 m-3'>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">ชื่อ</InputLabel>
                        <Field
                            as={Select}
                            name='ca_id'
                            label='ชื่อ'
                            value={values.ca_id}
                            onChange={(e: any) => {
                                handleChange(e);
                                const selectedCargo = cargoReducer.find(
                                    (item) => item.cargo_id === e.target.value
                                );
                                if (selectedCargo) {
                                    handleChange({
                                        target: {
                                            name: 'cargo_name',
                                            value: selectedCargo.cargo_name,
                                        },
                                    });
                                }
                            }}
                            fullWidth
                        >
                            {cargoReducer.map((item: Cargo) => (
                                <MenuItem key={item.cargo_id} value={item.cargo_id}>
                                    {item.cargo_name}
                                </MenuItem>
                            ))}
                        </Field>
                    </FormControl>

                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">ชื่อ</InputLabel>
                        <Field
                            as={Select}
                            name='fl_id'
                            label='ชื่อ'
                            value={values.fl_id}
                            onChange={(e: any) => {
                                handleChange(e);
                                const selectedFloating = FloatingReducer.find(
                                    (item) => item.fl_id === e.target.value
                                );
                                if (selectedFloating) {
                                    handleChange({
                                        target: {
                                            name: 'floating_name',
                                            value: selectedFloating.floating_name,
                                        },
                                    });
                                }
                            }}
                            fullWidth
                        >
                            {FloatingReducer.map((item: Floating) => (
                                <MenuItem key={item.fl_id} value={item.fl_id}>
                                    {item.floating_name}
                                </MenuItem>
                            ))}
                        </Field>
                    </FormControl>
                    <Field
                        component={TextField}
                        name='crane'
                        type='number'
                        label='ความจุสูงสุด (ตัน)'
                        fullWidth
                    />
                    <Field
                        component={TextField}
                        name='consumption_rate'
                        type='number'
                        label='ความจุสูงสุด (ตัน)'
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