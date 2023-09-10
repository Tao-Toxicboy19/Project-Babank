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
import { RootState } from '../../../../store/store';
import { Order } from '../../../../types/Order.type';
import { addOrder, setInsertOrder } from '../../../../store/slices/order.slice';

type Props = {}

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function OrderInsertPage({ }: Props) {
    const [open, setOpen] = React.useState(false);
    const dispatch = useDispatch<any>();
    const cargoReducer = useSelector((state: RootState) => state.cargo.cargo);
    const carrierReducer = useSelector((state: RootState) => state.carrier.carrier);
    const handleClose = () => setOpen(false);
    const handleSubmit = (values: any, { setSubmitting }: any) => {
        dispatch(addOrder(values, setOpen))
        dispatch(setInsertOrder(values))
        setSubmitting(false);
    };

    const validateForm = (values: Order) => {
        let errors: any = {}
        if (!values.carrier_name) errors.carrier_name = 'Enter name'
        if (!values.cr_id) errors.cr_id = 'Enter name'
        if (!values.cargo_name) errors.cargo_name = 'Enter name'
        if (!values.ca_id) errors.ca_id = 'Enter name'
        if (values.load_status <= 0) errors.load_status = 'Enter name'
        if (!values.category) errors.category = 'Enter name'
        if (values.arrival_time <= 0) errors.arrival_time = 'Enter name'
        if (values.deadline_time <= 0) errors.deadline_time = 'Enter name'
        if (values.latitude <= 0) errors.latitude = 'Enter name'
        if (values.longitude <= 0) errors.longitude = 'Enter name'
        if (values.bulks <= 0) errors.bulks = 'Enter name'
        if (values.maxFTS <= 0) errors.maxFTS = 'Enter name'
        return errors
    };

    const showForm = ({ values, handleChange, isSubmitting }: FormikProps<Order>) => {
        return (
            <Form>
                <Box className='flex flex-col gap-4 m-3'>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">ชื่อเรือ</InputLabel>
                        <Field
                            as={Select}
                            name='cr_id'
                            label='ชื่อเรือ'
                            value={values.cr_id}
                            onChange={(e: any) => {
                                handleChange(e);
                                const selectedCarrier = carrierReducer.find(
                                    (item) => item.cr_id === e.target.value
                                );
                                if (selectedCarrier) {
                                    handleChange({
                                        target: {
                                            name: 'carrier_name',
                                            value: selectedCarrier.carrier_name,
                                        },
                                    });
                                }
                            }}
                            fullWidth
                        >
                            {carrierReducer.map((item: Carrier) => (
                                <MenuItem key={item.cr_id} value={item.cr_id}>
                                    {item.carrier_name}
                                </MenuItem>
                            ))}
                        </Field>
                    </FormControl>
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
                    <Field
                        component={TextField}
                        name='load_status'
                        type='number'
                        label='ปริมาณสินค้า (ตัน)'
                        fullWidth
                    />
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">สถานะสินค้า (ขาเข้า/ขาออก)</InputLabel>
                        <Field
                            as={Select}
                            name='category'
                            label='สถานะสินค้า (ขาเข้า/ขาออก)'
                            value={values.category}
                            onChange={handleChange}
                            fullWidth
                        >
                            <MenuItem value='Import'>Import</MenuItem>
                            <MenuItem value='Export'>Export</MenuItem>
                        </Field>
                    </FormControl>
                    <Field
                        component={TextField}
                        name='arrival_time'
                        type='datetime-local'
                        label='วัน-เวลา มาถึง'
                        fullWidth
                    />
                    <Field
                        component={TextField}
                        name='deadline_time'
                        type='datetime-local'
                        label='วัน-เวลา สิ้นสุด'
                        fullWidth
                    />
                    <Field
                        component={TextField}
                        name='latitude'
                        type='number'
                        label='ละติจูด'
                        fullWidth
                    />
                    <Field
                        component={TextField}
                        name='longitude'
                        type='number'
                        label='ลองจิจูด'
                        fullWidth
                    />
                    <Field
                        component={TextField}
                        name='bulks'
                        type='number'
                        label='จำนวนระวาง'
                        fullWidth
                    />
                    <Field
                        component={TextField}
                        name='maxFTS'
                        type='number'
                        label='จำนวนทุ่นเข้าสูงสุด'
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

    const initialValues: Order = {
        or_id: '',
        carrier_name: '',
        cr_id: '',
        cargo_name: '',
        ca_id: '',
        load_status: 0,
        category: '',
        arrival_time: 0,
        deadline_time: 0,
        latitude: 0,
        longitude: 0,
        bulks: 0,
        maxFTS: 0,
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
