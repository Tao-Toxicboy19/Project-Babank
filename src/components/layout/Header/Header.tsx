import React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';

interface HeaderProps {
  drawerWidth: number;
  handleDrawerToggle: () => void;
}

const Header: React.FC<HeaderProps> = ({ drawerWidth, handleDrawerToggle }) => {
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
              ระบบจัดการทุ่นสำหรับการขนถ่ายสินค้า
            </Typography>
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
          </Box>

        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
