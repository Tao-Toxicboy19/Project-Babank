import { Button, Box, Container, CssBaseline, ThemeProvider, Typography, createTheme, Grid, Card, CardContent, Stack } from '@mui/material'
import { Field, Form, Formik, FormikProps } from 'formik';
import { TextField } from 'formik-material-ui';
// import { useDispatch } from 'react-redux';
import axios from 'axios';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { Register } from '../../../types/User.type';


type Props = {}

const defaultTheme = createTheme();

export default function RegisterPage({ }: Props) {
  const navigate = useNavigate()
  // const dispatch = useDispatch<any>();

  const handleSubmit = async (values: Register, { isSubmitting }: any) => {
    try {
      const response = await axios.post('http://localhost:5018/api/register', values);
      navigate('/login')
      console.log(response.data);
      isSubmitting(false)
    } catch (error: any) {
      console.error(error.response.data);
      // แสดงข้อผิดพลาดที่เกิดขึ้นเช่น อีเมล์ซ้ำกัน
    }
  };

  const validationSchema = Yup.object().shape({
    firstname: Yup.string().required('กรุณากรอกชื่อ'),
    lastname: Yup.string().required('กรุณากรอกนามสกุล'),
    email: Yup.string().email('รูปแบบอีเมล์ไม่ถูกต้อง').required('กรุณากรอกอีเมล์'),
    password: Yup.string().required('กรุณากรอกรหัสผ่าน').min(6, 'รหัสผ่านควรมีอย่างน้อย 6 ตัวอักษร'),
    confirmpassword: Yup.string()
      .required('กรุณายืนยันรหัสผ่าน')
      .oneOf([Yup.ref('password'),], 'รหัสผ่านไม่ตรงกัน'),
  });

  const validateForm = (values: Register) => {
    let errors: any = {}
    if (!values.firstname) errors.firstname = 'กรุณาใส่ชื่อจริง'
    if (!values.lastname) errors.lastname = 'กรุณาใส่นามสกุล'
    if (!values.email) errors.email = 'กรุณาใส่อีเมล'
    if (!values.password) errors.password = 'กรุณาใส่รหัสผ่าน'
    if (!values.confirmpassword) errors.confirmpassword = 'กรุณายืนยันรหัสผ่าน'
    return errors
  };


  const showForm = ({ isSubmitting }: FormikProps<Register>) => {
    return (
      <Form className='mt-3 px-5'>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Field
              component={TextField}
              name='firstname'
              type='text'
              label='ชื่อจริง'
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Field
              component={TextField}
              name='lastname'
              type='text'
              label='นามสกุล'
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <Field
              component={TextField}
              name='email'
              type='text'
              label='อีเมล'
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <Field
              component={TextField}
              name='password'
              type='password'
              label='รหัสผ่าน'
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <Field
              component={TextField}
              name='confirmpassword'
              type='password'
              label='ยืนยันรหัสผ่าน'
              fullWidth
            />
          </Grid>
        </Grid>
        <Stack direction='row' spacing={2} sx={{ marginTop: 2 }}>
          <Button
            fullWidth
            variant="outlined"
            sx={{ mt: 3, mb: 2 }}
            onClick={() => navigate('/login')}
          >
            Login
          </Button>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            className='bg-[#1976D2] hover:bg-[#1563BC]'
            disabled={isSubmitting}
          >
            create account
          </Button>
        </Stack>
      </Form>
    )
  }


  const initialValues: Register = {
    firstname: '', lastname: '', email: '', password: '', confirmpassword: '',
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
                Register
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