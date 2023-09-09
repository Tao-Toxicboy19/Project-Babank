import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { btnColor, style } from '../../../../style/Styles';
import { EditCargoProps } from '../../../../types/Cargo.type';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../store/store';
import { useEffect, useState } from 'react';
import { Floating } from '../../../../types/FloatingCrane.type';
import api from '../../../../api/api';
import { setUpdateFloating } from '../../../../store/slices/floatingSlice.bak';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';
import EditIcon from "@mui/icons-material/Edit";
import { Field, Form, Formik, FormikProps } from 'formik';
import { Select, TextField } from 'formik-material-ui';
import { FormControl, InputLabel } from '@mui/material';
import { MenuItem } from 'material-ui';
import { getFloatingById, updateFloating } from '../../../../store/slices/floating.slice';


type EditPageProps = {
  id: any;
};
export default function EditPage({ id }: EditPageProps) {
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch<any>();

  useEffect(() => {
    dispatch(getFloatingById(id))
  }, []);

  // const handleSubmit = (values: any, { setSubmitting }: any) => {
  //   dispatch(updateFloating(values, setOpen))
  //   dispatch(setUpdateFloating(values))
  //   setSubmitting(false);
  // };

  const showForm = ({ values, handleChange, isSubmitting }: FormikProps<Floating>) => {
    return (
      <Form>
        <h1>Hello {id}</h1>
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
      <EditIcon
        onClick={() => setOpen(true)}
        className="hover:text-blue-500 hover:scale-110 transform transition-transform duration-300 mx-2"
      />
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ marginBottom: 3 }}>
            แก้ไข ทุ่น
          </Typography>
          <Formik initialValues={{}} onSubmit={(values)=>{
            
          }}>
            {(props: any) => showForm(props)}
          </Formik>
        </Box>
      </Modal>
    </div>
  );
}
