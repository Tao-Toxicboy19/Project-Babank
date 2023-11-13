import { Button, Box, Container, CssBaseline, ThemeProvider, Typography, createTheme, Grid, Card, CardContent, Stack, Alert, TextField } from '@mui/material'
import { NavigateFunction, useNavigate } from 'react-router-dom';
import Logo1 from '../../../assets/images/logo/logo1.png' // จากตรงนี้
import { useDispatch, useSelector } from 'react-redux';
import { registerLocal } from '../../../store/slices/auth/register.slice';
import { RootState } from '../../../store/store';
import { useState } from 'react';
import { useForm } from 'react-hook-form';


type Props = {}

const defaultTheme = createTheme();

export default function RegisterPage({ }: Props) {
  const RegisterReducer = useSelector((state: RootState) => state.register);
  const { register, handleSubmit } = useForm();
  const navigate: NavigateFunction = useNavigate();
  const dispatch = useDispatch<any>();
  const [isSubmitting, setIsSubmitting] = useState(false);


  const showForm = () => {
    return (
      <form
        onSubmit={handleSubmit((data) => {
          console.log(data);
          setIsSubmitting(true);
          try {
            dispatch(registerLocal(data, navigate))
            setIsSubmitting(false);

          } catch (error) {
            setIsSubmitting(false);
          }
        })}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              type='text'
              label='username'
              fullWidth
              {...register('username')}

            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              type='password'
              label='รหัสผ่าน'
              fullWidth
              {...register('password')}
            />
          </Grid>
        </Grid>
        {(RegisterReducer.error) && <Alert severity="error" className='my-3'>อีเมลนี้ถูกใช้ไปแล้ว</Alert>}
        <Stack direction='row' spacing={2} sx={{ marginTop: 2 }}>
          <Button
            fullWidth
            variant="text"
            className="bg-[#FFF]"
            sx={{ mt: 3, mb: 2 }}
            onClick={() => navigate('/login')}
          >
            กลับไปหน้า เข้าสู่ระบบ
          </Button>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            className='bg-[#1976D2] hover:bg-[#1563BC]'
            disabled={isSubmitting}
          >
            สร้างบัญชี
          </Button>
        </Stack>
      </form >
    )
  }

  return (
    <ThemeProvider theme={defaultTheme}>

      <Container component="main" className="w-[750px]">
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
              <Box
                sx={{
                  margin: 4,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <Box className="flex">
                  <img src={Logo1} className="w-20, h-20" />
                </Box>

                <Typography className="mt-5" component="h1" variant="h5">
                  สร้างบัญชีใหม่
                </Typography>
              </Box>

              <Box>
                {showForm()}
              </Box>
            </CardContent>
          </Card >
        </Box>
      </Container>
    </ThemeProvider >
  )
}