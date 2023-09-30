import { Formik, Form, Field, FormikProps } from 'formik';
import React from 'react';
import { useState } from 'react';
import * as Yup from 'yup';
import { Fab, Dialog, DialogContent, DialogTitle, Slide, Tooltip, Card, CardContent, Typography, TextField } from '@mui/material'
import { TransitionProps } from '@mui/material/transitions';
import { server } from '../../../../Constants';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AddIcon from '@mui/icons-material/Add';
import DoneIcon from '@mui/icons-material/Done';

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

    const handleSubmit = (values: any, { setSubmitting }: any) => {
        alert(JSON.stringify(values));
    };

    const addCargoField = () => {
        setCargoCount((prevCount) => prevCount + 1);
    };

    const showForm = ({ isSubmitting }: FormikProps<any>) => {
        return (
            <Form>
                {cargoCount > 0 &&
                    Array.from({ length: cargoCount }, (_, index) => (
                        <Field
                            key={index}
                            name={`cargo_names[${index}]`}
                            type="text"
                            placeholder="กรอกชื่อ Cargo"
                        />
                    ))}
                <button type="button" onClick={addCargoField}>
                    เพิ่มรายการ Cargo
                </button>
                <button type="submit" disabled={isSubmitting}>
                    บันทึก
                </button>
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
                    className='bg-blue-500 hover:bg-blue-700'
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
                <DialogTitle>{"เพิ่มสินค้า"}</DialogTitle>
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
