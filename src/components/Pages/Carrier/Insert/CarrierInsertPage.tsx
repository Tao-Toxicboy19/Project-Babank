import { Button, Box, Fab, Dialog, DialogTitle, Slide, DialogContent, Tooltip } from '@mui/material'
import React from 'react'
import AddIcon from '@mui/icons-material/Add';
import { btnColor } from '../../../../style/Styles'
import { Field, Form, Formik, FormikProps } from 'formik';
import { TextField } from 'formik-material-ui';
import { useDispatch } from 'react-redux';
import { TransitionProps } from '@mui/material/transitions';
import { Carrier } from '../../../../types/Carrier.type';
import { addCarrier, setInsertCarrier } from '../../../../store/slices/carrier.slice';

type Props = {}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function CarrierInsertPage({ }: Props) {
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch<any>();

  const handleClose = () => setOpen(false);
  const handleSubmit = (values: any, { setSubmitting }: any) => {
    dispatch(addCarrier(values, setOpen))
    dispatch(setInsertCarrier(values))
    alert(JSON.stringify(values))
    setSubmitting(false);
  };

  const validateForm = (values: Carrier) => {
    let errors: any = {}
    if (!values.carrier_name) errors.carrier_name = 'Enter name'
    if (!values.ower) errors.ower = 'Enter ower'
    if (values.maxcapacity <= 0) errors.maxcapacity = 'Enter maxcapacity'
    if (values.burden <= 0) errors.burden = 'Enter burden'
    return errors
  };

  const showForm = ({ isSubmitting }: FormikProps<Carrier>) => {
    return (
      <Form>
        <Box className='flex flex-col gap-4 m-3'>
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

  const initialValues: Carrier = {
    cr_id: '',
    carrier_name: '',
    ower: '',
    maxcapacity: 0,
    burden: 0,
  }

  return (
    <div>
      <Tooltip title="เพิ่มเรือสินค้า">
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