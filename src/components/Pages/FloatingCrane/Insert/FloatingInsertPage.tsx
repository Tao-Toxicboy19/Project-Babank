import { Button, Box, Select, MenuItem, FormControl, InputLabel, Fab, Dialog, DialogContent, DialogTitle, Slide, } from '@mui/material'
import React from 'react'
import AddIcon from '@mui/icons-material/Add';
import { btnColor } from '../../../../style/Styles'
import { Field, Form, Formik, FormikProps } from 'formik';
import { TextField } from 'formik-material-ui';
import { Floating } from '../../../../types/FloatingCrane.type';
import { useDispatch } from 'react-redux';
import { addFloating, setInsertFloating } from '../../../../store/slices/floating.slice';
import { TransitionProps } from '@mui/material/transitions';

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
    dispatch(addFloating(values, setOpen))
    dispatch(setInsertFloating(values))
    setSubmitting(false);
  };

  const validateForm = (values: Floating) => {
    let errors: any = {}
    if (!values.floating_name) errors.floating_name = 'Enter name'
    if (values.latitude <= 0) errors.latitude = 'Enter latitude'
    if (values.longitude <= 0) errors.longitude = 'Enter longitude'
    if (values.setuptime <= 0) errors.setuptime = 'Enter setuptime'
    if (values.speed <= 0) errors.speed = 'Enter speed'
    return errors
  };

  const showForm = ({ values, handleChange, isSubmitting }: FormikProps<Floating>) => {
    return (
      <Form>
        <Box className='grid grid-cols-2 gap-3 m-3'>
          <Field
            component={TextField}
            name='floating_name'
            type='text'
            label='ชื่อ'
            fullWidth
          />
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">จำนวนเครน</InputLabel>
            <Field
              as={Select}
              name='NumberOfCranes'
              label='จำนวนเครน'
              value={values.NumberOfCranes}
              onChange={handleChange}
              fullWidth
            >
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={3}>3</MenuItem>
            </Field>
          </FormControl>
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
            name='setuptime'
            type='number'
            label='เวลาเตรียมความพร้อม (นาที)'
            fullWidth
          />
          <Field
            component={TextField}
            name='speed'
            type='number'
            label='เวลาเตรียมความพร้อม (นาที)'
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

  const initialValues: Floating = { floating_name: '', NumberOfCranes: 1, latitude: 0, longitude: 0, setuptime: 0, speed: 0, };

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
          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validate={validateForm}
          >
            {(props: any) => showForm(props)}
          </Formik>
        </DialogContent>
      </Dialog>
    </div>
  )
}