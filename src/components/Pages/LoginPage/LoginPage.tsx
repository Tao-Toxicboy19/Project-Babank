import { Button, Box, Typography, TextField, Card, Grid, createTheme, CssBaseline, Container, ThemeProvider } from "@mui/material";
import { FormikProps, Formik } from "formik";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Login } from "../../../types/User.type";
import Logo1 from '../../../assets/images/LO1.png' // จากตรงนี้
import Logo2 from '../../../assets/images/LO2.png'
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
      <Container component="main" className="w-[750px]">
        <CssBaseline />
        <Card className="">
          <Box
            sx={{
              margin: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Box className="flex">
              <img src={Logo1} className="w-20" />
              <img src={Logo2} className="w-20" />
            </Box>
            <Typography className="mt-5" component="h1" variant="h5">
              เข้าสู่ระบบ
            </Typography>
            <Formik onSubmit={(values, { }) => {
              dispactch(login(values, navigate))
            }}
              initialValues={initialValues}>
              {props => showFormV2(props)}
            </Formik>
          </Box>
        </Card>
      </Container>
    </ThemeProvider >
  )
}

