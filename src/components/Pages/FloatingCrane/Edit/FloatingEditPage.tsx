import { Button, Modal, Box, Typography, Select, MenuItem, FormControl, InputLabel, Fab } from '@mui/material'
import { btnColor, style } from '../../../../style/Styles'
import { Field, Form, Formik, FormikProps } from 'formik';
import { TextField } from 'formik-material-ui';
import { Floating } from '../../../../types/FloatingCrane.type';
import { useDispatch } from 'react-redux';
import Edit from '@mui/icons-material/Edit';
import { useState } from 'react';
import { updateFloating } from '../../../../store/slices/floating.edit.slice';
import { setUpdateFloating } from '../../../../store/slices/floating.slice';


export default function FloatingEditPage({ id, result }: { id: any; result: any }) {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch<any>();

  const handleSubmit = (values: any, { setSubmitting }: any) => {
    dispatch(updateFloating(id, values, setOpen));
    dispatch(setUpdateFloating(values))
    setSubmitting(false);
  };

  const showForm = ({ values, handleChange, isSubmitting }: FormikProps<Floating>) => {
    return (
      <Form>
        <Field
          component={TextField}
          name='floating_name'
          type='text'
          label='floating_name'
        />
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Age</InputLabel>
          <Field
            as={Select}
            name='NumberOfCranes'
            label='NumberOfCranes'
            value={values.NumberOfCranes}
            onChange={handleChange}
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
          label='latitude'
        />
        <Field
          component={TextField}
          name='longitude'
          type='number'
          label='longitude'
        />
        <Field
          component={TextField}
          name='setuptime'
          type='number'
          label='setuptime'
        />
        <Field
          component={TextField}
          name='speed'
          type='number'
          label='speed'
        />
        <Box className="flex justify-start gap-x-5">
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
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ marginBottom: 3 }}>
            Edit {id}
          </Typography>
          <Formik initialValues={result} onSubmit={handleSubmit}>
            {(props: any) => showForm(props)}
          </Formik>
        </Box>
      </Modal>
    </div>
  )
}