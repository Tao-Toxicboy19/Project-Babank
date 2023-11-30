import { Formik, Form, Field, FormikProps } from 'formik';
import React, { Dispatch, SetStateAction } from 'react';
import { useState } from 'react';
import * as Yup from 'yup';
import { Dialog, DialogContent, DialogTitle, Slide, Card, CardContent, Stack, Button } from '@mui/material'
import { TransitionProps } from '@mui/material/transitions';
import { useDispatch } from 'react-redux';
import { TextField } from 'formik-material-ui';
import { addCargo } from '../../../../store/slices/Cargo/cargo.slice';
import { Typography } from '@mui/material';

type Props = {
    open: boolean
    setOpen: Dispatch<SetStateAction<boolean>>
}

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function CargoCreatePage({ open, setOpen }: Props) {
    const dispatch = useDispatch<any>();
    const [cargoCount, setCargoCount] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);

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
                                className='bg-[#1976D2] hover:bg-[#1563BC] font-kanit'
                                onClick={addCargoField}

                            >
                                เพิ่มสินค้า
                            </Button>
                            <Button
                                variant="outlined"
                                type="button"
                                onClick={addCargoFieldV2}
                                className='font-kanit'
                            >
                                ลบสินค้า
                            </Button>
                        </Stack>
                        <Stack spacing={2} direction='row' >
                            <Button
                                fullWidth
                                variant="outlined"
                                onClick={() => setOpen(false)}
                                className='font-kanit'
                            >
                                ปิด
                            </Button>
                            <Button
                                fullWidth
                                variant="contained"
                                type="submit"
                                className='bg-[#1976D2] hover:bg-[#1563BC] font-kanit'
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
        <>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={() => setOpen(false)}
                aria-describedby="alert-dialog-slide-description"
                fullWidth
            >
                <DialogTitle className='flex justify-center font-kanit'>
                    <Typography
                        variant="h6"
                        noWrap
                        sx={{
                            mr: 2,
                            fontSize: 33,
                            display: { xs: "none", md: "flex" },
                            fontFamily: "monospace",
                            fontWeight: 700,
                            letterSpacing: ".1rem",
                            color: "inherit",
                            textDecoration: "none",
                        }}
                        className='text-blue-900'
                    >
                        เพิ่มสินค้า
                    </Typography>
                </DialogTitle>
                <Card>
                    <CardContent className="mb-10">
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
        </>
    );
};
