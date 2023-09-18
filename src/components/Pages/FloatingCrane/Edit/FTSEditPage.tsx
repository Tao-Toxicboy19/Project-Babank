import { Button, Box, ThemeProvider, Typography, createTheme, Card, CardContent, Stack } from '@mui/material'
import { Field, Form, Formik, FormikProps } from 'formik';
import { TextField } from 'formik-material-ui';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Login } from '../../../../types/User.type';
import { FTS } from '../../../../types/FloatingCrane.type';
import { useEffect } from 'react';
import { getProductById, updateFTS } from '../../../../store/slices/FTS.edit.slice';
import { RootState } from '../../../../store/store';


type Props = {}

const defaultTheme = createTheme();

export default function FTSEditPage({ }: Props) {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch<any>();
  const FTSEditSlice = useSelector((state: RootState) => state.FTSEdit);

  useEffect(() => {
    dispatch(getProductById(id))
  }, []);

  const handleSubmit = async (values: any, { isSubmitting }: any) => {
    dispatch(updateFTS(values, navigate, id))
    isSubmitting(false)
  }

  const showForm = ({ isSubmitting }: FormikProps<Login>) => {
    return (
      <Form>
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
            <Box className='flex justify-between'>
              <Typography component="h1" variant="h5">
                แก้ไขทุ่น
              </Typography>
            </Box>
            <Formik
              onSubmit={handleSubmit}
              initialValues={FTSEditSlice.result ? FTSEditSlice.result : initialValues}
            >
              {(props: any) => showForm(props)}
            </Formik>
          </CardContent>
        </Card>
      </Box>
    </ThemeProvider >
  )
}