import React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { Tooltip } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { logout } from '../../../store/slices/auth/login.slice';

interface HeaderProps {
  drawerWidth: number;
  handleDrawerToggle: () => void;
}

const Header: React.FC<HeaderProps> = ({ drawerWidth, handleDrawerToggle }) => {
  const dispatch = useDispatch<any>();
  const rolesReducer = useSelector((state: RootState) => state.rolesReducer);

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Box className='flex justify-between w-full'>
            <Box>
              <Typography
                variant="h6"
                component='h1'
                className='font-kanit hidden sm:block'
                sx={{
                  fontSize: 22,
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".1rem",
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                ระบบจัดการทุ่นสำหรับการขนถ่ายสินค้า
              </Typography>
            </Box>
            <Box className="flex flex-row gap-x-5">
              <Typography
                variant="h6"
                component='h1'
                className='font-kanit'
                sx={{
                  fontSize: 22,
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".1rem",
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                {rolesReducer.result?.name}
              </Typography>
              <Tooltip title="logout">
                <IconButton
                  className='text-white'
                  onClick={() => dispatch(logout())}
                >
                  <LogoutIcon />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>

        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
