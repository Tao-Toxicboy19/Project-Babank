import { Button, Box, ThemeProvider, createTheme, Card, CardContent, Stack } from '@mui/material'
import { Field, Form, Formik, FormikProps } from 'formik';
import { TextField } from 'formik-material-ui';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Login } from '../../../../type/User.type';
import { FTS } from '../../../../type/FloatingCrane.type';
import { ftsSelector } from '../../../../store/slices/FTS/ftsSlice';
import { useState } from 'react';
import NotFound from '../../../layout/ERR_REPORT/PageNotFound';
import Loading from '../../../layout/Loading/Loading';
import { ftsAddAsync } from '../../../../store/slices/FTS/ftsAddSlice';


type Props = {}

const defaultTheme = createTheme();

export default function FTSAddPage({ }: Props) {
  const navigate = useNavigate()
  const dispatch = useDispatch<any>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const FTSReduer = useSelector(ftsSelector)

  const handleSubmit = async (values: any) => {
    setIsSubmitting(true);
    try {
      await dispatch(ftsAddAsync({ values, navigate }))
      setIsSubmitting(false);
    } catch (error) {
      setIsSubmitting(false);
    }
  };

  const validateForm = (values: FTS) => {
    let errors: any = {}
    if (!values.FTS_name) errors.FTS_name = 'กรุณากรอกชื่อทุ่น'
    if (values.lat <= 0) errors.lat = 'กรุณากรอกละติจูด'
    if (values.lng <= 0) errors.lng = 'กรุณากรอกลองจิจูด'
    if (values.setuptime_FTS <= 0) errors.setuptime_FTS = 'กรุณากรอกเวลาเตรียมความพร้อม (นาที)'
    if (values.speed <= 0) errors.speed = 'กรุณากรอกความเร็วการเคลื่อนย้าย (กม./ชม.)'
    return errors
  };


  const showForm = ({ }: FormikProps<Login>) => {
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
          className='font-kanit'
        />
        <Field
          component={TextField}
          style={{ marginTop: 16 }}
          name='lat'
          id='lat'
          type='number'
          label='ละติจูด'
          fullWidth
          className='font-kanit'
        />
        <Field
          component={TextField}
          style={{ marginTop: 16 }}
          name='lng'
          id='lng'
          type='number'
          label='ลองจิจูด'
          fullWidth
          className='font-kanit'
        />
        <Field
          component={TextField}
          style={{ marginTop: 16 }}
          name='setuptime_FTS'
          id='setuptime_FTS'
          type='number'
          label='เวลาเตรียมความพร้อม (นาที)'
          fullWidth
          className='font-kanit'
        />
        <Field
          component={TextField}
          style={{ marginTop: 16 }}
          name='speed'
          id='speed'
          type='number'
          label='ความเร็วการเคลื่อนย้าย (กม./ชม.)'
          fullWidth
          className='font-kanit'
        />
        <Stack direction='row' spacing={2} sx={{ marginTop: 2 }}>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            className='bg-[#66BB6A] hover:bg-[#1B5E20] font-kanit'
            disabled={isSubmitting}
          >
            เพิ่มทุ่น
          </Button>
          <Button
            fullWidth
            variant="outlined"
            sx={{ mt: 3, mb: 2 }}
            onClick={() => navigate('/transferstation')}
            className='font-kanit'
          >
            กลับ
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
    <>
      {FTSReduer.loading ? (
        <Loading />
      ) : FTSReduer.error ? (
        <NotFound />
      ) :
        (
          <ThemeProvider theme={defaultTheme}>
            <Box className="flex justify-center items-center">
              <Card>
                <CardContent>
                  <Box className=" w-full flex justify-between gap-x-2">
                    <Button fullWidth variant="contained" disabled>เพิ่มทุ่น</Button >
                    <Button fullWidth variant="contained" component={Link} to="/transferstation/create/crane">เพิ่มเครน</Button>
                  </Box >
                  <Formik
                    onSubmit={handleSubmit}
                    validate={validateForm}
                    initialValues={initialValues}
                  >
                    {(props: any) => showForm(props)}
                  </Formik>
                </CardContent >
              </Card >
            </Box >
          </ThemeProvider >
        )

      }
    </>
  )
}