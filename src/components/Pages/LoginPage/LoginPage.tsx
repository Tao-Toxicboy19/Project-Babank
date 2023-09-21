import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Card } from '@mui/material';
import Logo1 from '../../../assets/images/LO1.png' // จากตรงนี้
import Logo2 from '../../../assets/images/LO2.png'
import { Link } from 'react-router-dom';


// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function SignIn() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

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
              {/* เอามาจาก import ด้านบน */}
              <img src={Logo1} className="w-20" />
              <img src={Logo2} className="w-20" />
            </Box>
            <Typography className="mt-5" component="h1" variant="h5">
              เข้าสู่ระบบ
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="ชื่อผู้ใช้งาน"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="รหัสผ่าน"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="จดจำรหัสผ่าน"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                className="bg-blue-400"
              >
                เข้าสู๋ระบบ
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link to={"/register"} >
                    <Typography variant="body2">สร้างบัญชีใหม่</Typography>
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Card>
      </Container>
    </ThemeProvider>
  );
}