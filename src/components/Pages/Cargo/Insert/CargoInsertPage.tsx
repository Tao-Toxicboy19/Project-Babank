import React from 'react'
import AddIcon from '@mui/icons-material/Add';
import { btnColor } from '../../../../style/Styles'
import { Cargo } from '../../../../types/Cargo.type';
import { Button, Box, Select, MenuItem, FormControl, InputLabel, Fab, Dialog, DialogContent, DialogTitle, Slide, Tooltip } from '@mui/material'
import { Field, Form, Formik, FormikProps } from 'formik';
import { TextField } from 'formik-material-ui';
import { useDispatch } from 'react-redux';
import { TransitionProps } from '@mui/material/transitions';
import { addCargo, setInsertCargo, } from '../../../../store/slices/cargo.slice';

type Props = {}

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function CargoInsertPage({ }: Props) {
    const [open, setOpen] = React.useState(false);
    const dispatch = useDispatch<any>();

    const handleClose = () => setOpen(false);
    const handleSubmit = (values: any, { setSubmitting }: any) => {
        dispatch(addCargo(values, setOpen))
        dispatch(setInsertCargo(values))
        alert(JSON.stringify(values))
        setSubmitting(false);
    };

    const validateForm = (values: Cargo) => {
        let errors: any = {}
        if (!values.cargo_name) errors.cargo_name = 'Enter name'
        if (values.consumption_rate <= 0) errors.consumption_rate = 'Enter ower'
        if (values.work_rate <= 0) errors.work_rate = 'Enter maxcapacity'
        if (!values.category) errors.category = 'Enter burden'
        return errors
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

    const initialValues: Cargo = {
        cargo_id: '',
        cargo_name: '',
        consumption_rate: 0,
        work_rate: 0,
        category: '',
    }

    return (
        <div>
            <Tooltip title="เพิ่มสินค้า">
                <Fab
                    color="primary"
                    aria-label="add"
                    size='small'
                    className='bg-blue-500 hover:bg-blue-700'
                    onClick={() => setOpen(true)}>
                    <AddIcon />
                </Fab>
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