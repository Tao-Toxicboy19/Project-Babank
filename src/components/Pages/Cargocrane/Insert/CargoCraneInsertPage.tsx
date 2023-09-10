import React from 'react'
import AddIcon from '@mui/icons-material/Add';
import { btnColor } from '../../../../style/Styles'
import { Carrier } from '../../../../types/Carrier.type';
import { Cargo } from '../../../../types/Cargo.type';
import { Button, Box, Select, MenuItem, FormControl, InputLabel, Fab, Dialog, DialogContent, DialogTitle, Slide } from '@mui/material'
import { Field, Form, Formik, FormikProps } from 'formik';
import { TextField } from 'formik-material-ui';
import { useDispatch, useSelector } from 'react-redux';
import { TransitionProps } from '@mui/material/transitions';
import { addCargo, setInsertCargo, } from '../../../../store/slices/cargo.slice';
import { CargoCrane } from '../../../../types/CargoCrane.type';
import axios from 'axios';
import { addCargoCrane, setInsertCargoCrane } from '../../../../store/slices/cargocrane.slice';
import { RootState } from '../../../../store/store';
import { Floating } from '../../../../types/FloatingCrane.type';

type Props = {}

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function CargoCraneInsertPage({ }: Props) {
    const [open, setOpen] = React.useState(false);
    const dispatch = useDispatch<any>();
    const cargoReducer = useSelector((state: RootState) => state.cargo.cargo);
    const FloatingReducer = useSelector((state: RootState) => state.floating.floating);
    const handleClose = () => setOpen(false);
    const handleSubmit = (values: any, { setSubmitting }: any) => {
        dispatch(addCargoCrane(values, setOpen))
        dispatch(setInsertCargoCrane(values))
        setSubmitting(false);
    };

    // cc_id: '',
    //     fl_id: '',
    //     ca_id: '',
    //     cargo_name: '',
    //     floating_name: '',
    //     crane: 0,
    //     consumption_rate: 0,
    //     work_rate: 0,
    //     category: '',

    const validateForm = (values: CargoCrane) => {
        let errors: any = {}
        if (!values.fl_id) errors.fl_id = 'Enter name'
        if (!values.fl_id) errors.fl_id = 'Enter name'
        if (!values.cargo_name) errors.cargo_name = 'Enter name'
        if (!values.floating_name) errors.floating_name = 'Enter name'
        if (values.crane <= 0) errors.crane = 'Enter name'
        if (values.consumption_rate <= 0) errors.consumption_rate = 'Enter name'
        if (values.work_rate <= 0) errors.work_rate = 'Enter name'
        if (!values.category) errors.category = 'Enter name'
        return errors
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

    const initialValues: CargoCrane = {
        cc_id: '',
        fl_id: '',
        ca_id: '',
        cargo_name: '',
        floating_name: '',
        crane: 0,
        consumption_rate: 0,
        work_rate: 0,
        category: '',
    }

    return (
        <div>
            <Fab
                color="primary"
                aria-label="add"
                size='small'
                className='bg-blue-500 hover:bg-blue-700'
                onClick={() => setOpen(true)}>
                <AddIcon />
            </Fab>
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
                    <Formik initialValues={initialValues} onSubmit={handleSubmit}
                        validate={validateForm}
                    >
                        {(props: any) => showForm(props)}
                    </Formik>
                </DialogContent>
            </Dialog>
        </div>
    )
}