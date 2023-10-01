import { Formik, Form, Field, FormikProps } from 'formik';
import React from 'react';
import { useState } from 'react';
import * as Yup from 'yup';
import { Fab, Dialog, DialogContent, DialogTitle, Slide, Tooltip, Card, CardContent, TextField, Stack, Button } from '@mui/material'
import { TransitionProps } from '@mui/material/transitions';
import AddIcon from '@mui/icons-material/Add';
import { addCargo } from '../../../../store/slices/cargo.slice';
import { useDispatch } from 'react-redux';

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
    const [isSubmitting, setIsSubmitting] = useState(false);
    const dispatch = useDispatch<any>();
    const [cargoCount, setCargoCount] = useState(1);
    const [open, setOpen] = useState(false);

    const initialValues = {
        cargo_names: Array.from({ length: cargoCount }, (_) => ''),
    };

    const validationSchema = Yup.object({
        cargo_names: Yup.array()
            .of(Yup.string().required('กรุณากรอกชื่อ Cargo'))
            .min(1, 'คุณต้องกรอกอย่างน้อย 1 รายการ Cargo'),
    });

    const handleSubmit = async (values: any) => {
        setIsSubmitting(true);
        try {
            await dispatch(addCargo(values, setOpen))
            setIsSubmitting(false);
        } catch (error) {
            setIsSubmitting(false);
        }
    };


    const addCargoField = () => {
        setCargoCount((prevCount) => prevCount + 1);
    };

    const addCargoFieldV2 = () => {
        setCargoCount((prevCount) => prevCount - 1);
    };

    const showForm = ({ }: FormikProps<any>) => {
        return (
            <Form>
                <Stack spacing={2} direction='column'>
                    {cargoCount > 0 &&
                        Array.from({ length: cargoCount }, (_, index) => (
                            <Field
                                key={index}
                                id='maxcapacity'
                                label='ชื่อสินค้า'
                                component={TextField}
                                name={`cargo_names[${index}]`}
                                type="text"
                                fullWidth
                            />
                        ))}
                    <Stack spacing={2} direction='row' className='justify-between'>
                        <Stack spacing={2} direction='row'>
                            <Button
                                variant="contained"
                                type="button"
                                className='bg-[#1976D2] hover:bg-[#1563BC]'
                                onClick={addCargoField}
                            >
                                เพิ่มสินค้า
                            </Button>
                            <Button
                                variant="outlined"
                                type="button"
                                onClick={addCargoFieldV2}
                            >
                                ลบสินค้า
                            </Button>
                        </Stack>
                        <Stack spacing={2} direction='row' >
                            <Button
                                fullWidth
                                variant="outlined"
                                onClick={() => setOpen(false)}
                            >
                                ปิด
                            </Button>
                            <Button
                                fullWidth
                                variant="contained"
                                type="submit"
                                className='bg-[#1976D2] hover:bg-[#1563BC]'
                                disabled={isSubmitting}
                            >
                                บันทึก
                            </Button>
                        </Stack>
                    </Stack>
                </Stack>
            </Form>
        );
    }

    return (
        <div>
            <Tooltip title="เพิ่มสินค้า">
                <Fab
                    color="primary"
                    aria-label="add"
                    size='small'
                    className='bg-blue-500 hover:bg-blue-700 my-4'
                    onClick={() => setOpen(true)}>
                    <AddIcon />
                </Fab>
            </Tooltip>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={() => setOpen(false)}
                aria-describedby="alert-dialog-slide-description"
                fullWidth
            >
                <DialogTitle className='flex justify-center'>{"เพิ่มสินค้า"}</DialogTitle>
                <Card>
                    <CardContent className="">
                        <DialogContent>
                            <Formik
                                initialValues={initialValues}
                                validationSchema={validationSchema}
                                onSubmit={handleSubmit}
                            >
                                {props => showForm(props)}
                            </Formik>
                        </DialogContent>
                    </CardContent>
                </Card>
            </Dialog>
        </div>
    );
};
