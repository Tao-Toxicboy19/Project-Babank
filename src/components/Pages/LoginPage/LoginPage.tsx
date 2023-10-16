import { Button, Box, Typography, TextField, Card, createTheme, ThemeProvider, CardContent } from "@mui/material";
import { FormikProps, Formik } from "formik";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Login } from "../../../types/User.type";
import Logo1 from '../../../assets/images/logo/logo1.png'
import Logo2 from '../../../assets/images/logo/logo2.png'
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
        fullWidth
        id='password'
        label='Password'
        type='password'
        onChange={handleChange}
        value={values.password}
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        className='bg-[#1976D2] hover:bg-[#1563BC] font-kanit'
        disabled={isSubmitting}
      >
        เข้าสู่ระบบ
      </Button>
    </form>
  )

  const initialValues: Login = { email: "", password: "" }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Card className="max-w-[750px] flex mx-auto">
        <CardContent>
          <Box
            className='flex flex-col justify-center mx-auto mb-5'
          >
            <Box className='flex justify-center gap-x-5'>
              <Box className='flex items-center'>
                <img src={Logo1} className="w-[100px] h-auto object-cover" />
              </Box>
              <Box className='flex items-center'>
                <img src={Logo2} className="w-[130px] h-auto object-cover" />
              </Box>
              <Box className='flex items-center'>
                <img src={Logo3} className="w-[130px] h-auto object-cover" />
              </Box>
            </Box>
            <CardContent>
              <Typography
                className="flex justify-center font-kanit"
                component="h1"
                variant="h6"
              >
                การบริหารจัดการระบบโลจิสติกส์การขนถ่ายสินค้าเทกองที่ทุ่นขนถ่ายสินค้ากลางทะเลโดยใช้ระบบสารสนเทศและดิจิทัลแพลตฟอร์ม
              </Typography>
            </CardContent>
            <Formik onSubmit={(values, { setSubmitting }: any) => {
              dispactch(login(values, navigate, setSubmitting))
            }}
              initialValues={initialValues}>
              {props => showFormV2(props)}
            </Formik>
          </Box>
        </CardContent>
      </Card>
    </ThemeProvider >
  )
}

