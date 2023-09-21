import { Button, Box, ThemeProvider, Typography, createTheme, Card, CardContent, Stack } from '@mui/material'
import { Field, Form, Formik, FormikProps } from 'formik';
import { TextField } from 'formik-material-ui';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Login } from '../../../../types/User.type';
import { FTS } from '../../../../types/FloatingCrane.type';
import { addFTS } from '../../../../store/slices/FTS.slice';


type Props = {}

const defaultTheme = createTheme();

export default function FTSCreatePage({ }: Props) {
  const navigate = useNavigate()
  const dispatch = useDispatch<any>();

  const handleSubmit = async (values: any, { isSubmitting }: any) => {
    dispatch(addFTS(values, navigate))
    isSubmitting(false)
  }


  const validateForm = (values: FTS) => {
    let errors: any = {}
    if (!values.FTS_name) errors.FTS_name = 'กรุณากรอกชื่อทุ่น'
    if (values.lat <= 0) errors.lat = 'กรุณากรอกละติจูด'
    if (values.lng <= 0) errors.lng = 'กรุณากรอกลองจิจูด'
    if (values.setuptime_FTS <= 0) errors.setuptime_FTS = 'กรุณากรอกเวลาเตรียมความพร้อม (นาที)'
    if (values.speed <= 0) errors.speed = 'กรุณากรอกความเร็วการเคลื่อนย้าย (กม./ชม.)'
    return errors
  };


  const showForm = ({ isSubmitting }: FormikProps<Login>) => {
    return (
      <Form className="w-[750px]">
        <Field
          component={TextField}
          style={{ marginTop: 16 }}
          name='FTS_name'
          id='FTS_name'
          type='text'
          label='ชื่อทุ่น'
          fullWidth
        />
        <Field
          component={TextField}
          style={{ marginTop: 16 }}
          name='lat'
          id='lat'
          type='number'
          label='ละติจูด'
          fullWidth
        />
        <Field
          component={TextField}
          style={{ marginTop: 16 }}
          name='lng'
          id='lng'
          type='number'
          label='ลองจิจูด'
          fullWidth
        />
        <Field
          component={TextField}
          style={{ marginTop: 16 }}
          name='setuptime_FTS'
          id='setuptime_FTS'
          type='number'
          label='เวลาเตรียมความพร้อม (นาที)'
          fullWidth
        />
        <Field
          component={TextField}
          style={{ marginTop: 16 }}
          name='speed'
          id='speed'
          type='number'
          label='ความเร็วการเคลื่อนย้าย (กม./ชม.)'
          fullWidth
        />
        <Stack direction='row' spacing={2} sx={{ marginTop: 2 }}>
          <Button
            fullWidth
            variant="outlined"
            sx={{ mt: 3, mb: 2 }}
            onClick={() => navigate('/transferstation')}
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

  const initialValues: FTS = {
    FTS_name: '',
    lat: 0,
    lng: 0,
    setuptime_FTS: 0,
    speed: 0,
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box className="flex justify-center items-center">
        <Card>
          <CardContent>
            <Stack direction='row' spacing={10} className="flex justify-center">
              <Box className='flex justify-start'>
                <Button variant="outlined" component={Link} to="/transferstation/create/crane">เพิ่มทุ่น</Button>

                <Typography component="h1" variant="h5">
                  เพิ่มทุ่น
                </Typography>

                <Button variant="outlined" component={Link} to="/transferstation/create/crane">เพิ่มเครน</Button>
              </Box>
            </Stack>
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