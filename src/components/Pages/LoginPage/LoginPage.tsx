import { Button, Box, Typography, TextField, Card, Grid, createTheme, ThemeProvider } from "@mui/material";
import { FormikProps, Formik } from "formik";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Login } from "../../../types/User.type";
import Logo1 from '../../../assets/images/logo/logo1.png'
import Logo2 from '../../../assets/images/logo/logo2.jpg'
import Logo3 from '../../../assets/images/logo/logo3.png'
import { login } from "../../../store/slices/login.slice";


type Props = {}

const defaultTheme = createTheme();


export default function LoginPage({ }: Props) {
  const navigate = useNavigate()
  const dispactch = useDispatch<any>();

  const showFormV2 = ({ handleSubmit, handleChange, values, isSubmitting }: FormikProps<Login>) => (
    <form onSubmit={handleSubmit}>
      <TextField
        variant='outlined'
        margin='normal'
        required
        fullWidth
        id='email'
        label='email'
        onChange={handleChange}
        value={values.email}
        autoComplete='email'
        autoFocus
      />
      <TextField
        variant='outlined'
        margin='normal'
        required
        fullWidth
        id='password'
        label='Password:'
        type='password'
        onChange={handleChange}
        value={values.password}
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        className="bg-blue-400"
        disabled={isSubmitting}
      >
        เข้าสู๋ระบบ
      </Button>
      <Grid container>
        <Grid item xs>
          <Box className="flex">
            <Typography
              className="flex m-5 text-[#1695F3] font-bold"
              component={Link}
              to={'/register'}
              variant="body2"
            >
              สร้างบัญชีใหม่
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </form>
  )

  const initialValues: Login = { email: "", password: "" }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Card>
        <Box
          sx={{
            margin: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Box className='flex gap-x-5'>
            <Box>
              <img src={Logo1} className="w-[200px] h-auto object-cover" />
            </Box>
            <Box>
              <img src={Logo2} className="w-[200px] h-auto object-cover" />
            </Box>
            <Box>
              <img src={Logo3} className="w-[200px] h-auto object-cover" />
            </Box>
          </Box>
          <Typography className="mt-5" component="h1" variant="h5">
            เข้าสู่ระบบ
          </Typography>
          <Formik onSubmit={(values, { setSubmitting }: any) => {
            dispactch(login(values, navigate, setSubmitting))
          }}
            initialValues={initialValues}>
            {props => showFormV2(props)}
          </Formik>
        </Box>
      </Card>
    </ThemeProvider >
  )
}

