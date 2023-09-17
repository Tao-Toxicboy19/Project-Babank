import { Button, Box, Container, CssBaseline, ThemeProvider, Typography, createTheme, Card, CardContent, Stack } from '@mui/material'
import { Field, Form, Formik, FormikProps } from 'formik';
import { TextField } from 'formik-material-ui';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { Login } from '../../../types/User.type';
import { useDispatch } from 'react-redux';
import { login } from '../../../store/slices/login.slice';


type Props = {}

const defaultTheme = createTheme();

export default function LoginPage({ }: Props) {
  const navigate = useNavigate()
  const dispatch = useDispatch<any>();

  const handleSubmit = async (values: any, { isSubmitting }: any) => {
    dispatch(login(values))
    isSubmitting(false)
  }

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('รูปแบบอีเมล์ไม่ถูกต้อง').required('กรุณากรอกอีเมล์'),
    password: Yup.string().required('กรุณากรอกรหัสผ่าน')
  });

  const validateForm = (values: Login) => {
    let errors: any = {}
    if (!values.email) errors.email = 'กรุณาใส่อีเมล'
    if (!values.password) errors.password = 'กรุณาใส่รหัสผ่าน'
    return errors
  };


  const showForm = ({ isSubmitting }: FormikProps<Login>) => {
    return (
      <Form className='mt-3 px-5'>
        <Field
          component={TextField}
          name='email'
          id='email'
          type='text'
          label='ชื่อจริง'
          fullWidth
        />
        <Field
          component={TextField}
          name='password'
          id='password'
          type='password'
          label='ชื่อจริง'
          fullWidth
        />
        <Stack direction='row' spacing={2} sx={{ marginTop: 2 }}>
          <Button
            fullWidth
            variant="outlined"
            sx={{ mt: 3, mb: 2 }}
            onClick={() => navigate('/register')}
          >
            Register
          </Button>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            className='bg-[#1976D2] hover:bg-[#1563BC]'
            disabled={isSubmitting}
          >
            Login
          </Button>
        </Stack>
      </Form>
    )
  }


  const initialValues: Login = {
    email: '', password: ''
  };

  return (
    <ThemeProvider theme={defaultTheme}>

      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Card>
            <CardContent>
              <Typography component="h1" variant="h5">
                Login
              </Typography>

              <Formik onSubmit={handleSubmit}
                validate={validateForm}
                initialValues={initialValues}
                validationSchema={validationSchema}
              >
                {(props: any) => showForm(props)}
              </Formik>
            </CardContent>
          </Card >
        </Box>
      </Container>
    </ThemeProvider >
  )
}