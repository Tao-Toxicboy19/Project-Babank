import { Button, Box, ThemeProvider, Typography, createTheme, Card, CardContent, Stack } from '@mui/material'
import { Field, Form, Formik, FormikProps } from 'formik';
import { TextField } from 'formik-material-ui';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Carrier } from '../../../../types/Carrier.type';
import { addCarrier } from '../../../../store/slices/carrier.slice';
import { useState } from 'react';


type Props = {}

const defaultTheme = createTheme();

export default function CarrierCreatePage({ }: Props) {
  const navigate = useNavigate()
  const dispatch = useDispatch<any>();
  const [isSubmitting, setIsSubmitting] = useState(false);


  const handleSubmit = async (values: any) => {
    setIsSubmitting(true);
    try {
      await dispatch(addCarrier(values, navigate));
      setIsSubmitting(false);
    } catch (error) {
      setIsSubmitting(false);
    }
  };

  const validateForm = (values: Carrier) => {
    let errors: any = {}
    if (!values.carrier_name) errors.carrier_name = 'กรุณากรอกชื่อเรือ'
    if (!values.holder) errors.holder = 'กรุณากรอกชื่อบริษัท'
    if (values.maxcapacity <= 0) errors.maxcapacity = 'กรุณากรอกความจุสูงสุด (ตัน)'
    if (values.burden <= 0) errors.burden = 'กรุณากรอกจำนวนระวาง'
    return errors
  };


  const showForm = ({ }: FormikProps<Carrier>) => {
    return (
      <Form className="w-[750px]">
        <Field
          component={TextField}
          style={{ marginTop: 16 }}
          name='carrier_name'
          id='carrier_name'
          type='text'
          label='ชื่อเรือ'
          fullWidth
        />
        <Field
          component={TextField}
          style={{ marginTop: 16 }}
          name='holder'
          id='holder'
          type='text'
          label='ชื่อบริษัท'
          fullWidth
        />
        <Field
          component={TextField}
          style={{ marginTop: 16 }}
          name='maxcapacity'
          id='maxcapacity'
          type='number'
          label='ความจุสูงสุด (ตัน)'
          fullWidth
        />
        <Field
          component={TextField}
          style={{ marginTop: 16 }}
          name='burden'
          id='burden'
          type='number'
          label='จำนวนระวาง'
          fullWidth
        />
        <Stack direction='row' spacing={2} sx={{ marginTop: 2 }}>
          <Button
            fullWidth
            variant="outlined"
            sx={{ mt: 3, mb: 2 }}
            onClick={() => navigate('/carrier')}
          >
            กลับ
          </Button>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            className='bg-[#1976D2] hover:bg-[#1563BC]'
            disabled={isSubmitting}
          >
            เพิ่มทุ่น
          </Button>
        </Stack>
      </Form>
    )
  }

  const initialValues: Carrier = {
    cr_id: 0,
    carrier_name: '',
    maxcapacity: 0,
    holder: '',
    burden: 0,
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box className="flex justify-center items-center">
        <Card>
          <CardContent>
            <Box className='flex justify-between'>
              <Typography component="h1" variant="h5">
                เพิ่มเรือ
              </Typography>
            </Box>
            <Formik
              onSubmit={handleSubmit}
              validate={validateForm}
              initialValues={initialValues}
            >
              {(props: any) => showForm(props)}
            </Formik>
          </CardContent>
        </Card>
      </Box>
    </ThemeProvider >
  )
}