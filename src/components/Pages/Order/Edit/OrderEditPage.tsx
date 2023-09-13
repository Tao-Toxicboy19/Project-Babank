import { Button, Box, Select, MenuItem, FormControl, InputLabel, Dialog, DialogContent, DialogTitle, Slide, IconButton, Tooltip } from '@mui/material'
import { btnColor } from '../../../../style/Styles'
import { Field, Form, Formik, FormikProps } from 'formik';
import { TextField } from 'formik-material-ui';
import { useDispatch, useSelector } from 'react-redux';
import Edit from '@mui/icons-material/Edit';
import { useState } from 'react';
import { TransitionProps } from '@mui/material/transitions';
import React from 'react';
import { Cargo } from '../../../../types/Cargo.type';
import { RootState } from '../../../../store/store';
import { Order } from '../../../../types/Order.type';
import { Carrier } from '../../../../types/Carrier.type';
import { updateOrder } from '../../../../store/slices/order.edit.slice';
import { setUpdateOrder } from '../../../../store/slices/order.slice';

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function OrderEditPage({ id, result }: { id: any; result: any }) {
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch<any>();
    const cargoReducer = useSelector((state: RootState) => state.cargo.cargo);
    const carrierReducer = useSelector((state: RootState) => state.carrier.carrier);
    const handleClose = () => setOpen(false);
    const handleSubmit = (values: any, { setSubmitting }: any) => {
        dispatch(updateOrder(id, values, setOpen))
        dispatch(setUpdateOrder(values))
        alert(JSON.stringify(values))
        setSubmitting(false);
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