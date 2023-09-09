import { Box, Button, Dialog, DialogContent, DialogTitle, Slide } from '@mui/material'
import { FormikProps, Field, Formik, Form } from 'formik'
import { btnColor } from '../../../../style/Styles'
import { carrier } from '../../../../types/Carrier.type'
import { TextField } from 'formik-material-ui'
import React from 'react'
import { useDispatch } from 'react-redux'
import Edit from '@mui/icons-material/Edit'
import { TransitionProps } from '@mui/material/transitions'

type Props = {
    id: any
    result: any
}

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function CarrierEditPage({ id, result }: Props) {
    const dispatch = useDispatch<any>();
    const [open, setOpen] = React.useState(false);
    const handleClose = () => setOpen(false);
    const handleSubmit = (values: any, { setSubmitting }: any) => {
        // dispatch(updateFloating(id, values, setOpen));
        // dispatch(setUpdateFloating(values))
        
        alert(JSON.stringify(values))
        setSubmitting(false);
    };

    const showForm = ({ isSubmitting }: FormikProps<carrier>) => {
        return (
            <Form>
                <Box className='flex flex-col gap-4'>
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
            <Box
                className='bg-blue-400 hover:bg-blue-600 w-10 h-10 flex justify-center items-center rounded-full'
                onClick={() => setOpen(true)}
            >
                <Edit />
            </Box>
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