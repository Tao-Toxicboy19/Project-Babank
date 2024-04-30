import React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../../store/store';
import { Divider, Tooltip } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { roleSelector } from '../../../store/slices/auth/rolesSlice';
import { logout } from '../../../store/slices/auth/loginSlice';
import { useNavigate } from 'react-router-dom';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { mainTainFtsSelector } from '../../../store/slices/mainTainFts/mainTainFtsSlice';
import { mainTainCraneSelector } from '../../../store/slices/MainTainCrane/mainTainCraneSlice';
import dayjs from 'dayjs';

interface HeaderProps {
  drawerWidth: number;
  handleDrawerToggle: () => void;
}

const Header: React.FC<HeaderProps> = ({ drawerWidth, handleDrawerToggle }) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const rolesReducer = useSelector(roleSelector)
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const mainTainFTSReducer = useSelector(mainTainFtsSelector)
  const mainTainCraneReducer = useSelector(mainTainCraneSelector)

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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
              <div>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <Badge badgeContent={mainTainFTSReducer.notiPlan.length + mainTainCraneReducer.notiPlan.length} color="error">
                    <NotificationsIcon />
                  </Badge>
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl) && (mainTainFTSReducer.notiPlan.length + mainTainCraneReducer.notiPlan.length > 0)}
                  onClose={handleClose}
                >
                  {mainTainFTSReducer.notiPlan.map((item) => (
                    <>
                      <MenuItem onClick={handleClose}>
                        <Box className='flex flex-col gap-2'>
                          <Typography>ทุ่น {item.fts.FTS_name} {item.desc_FTS}</Typography>
                          <Typography>วันที่ {dayjs(item.downtime_FTS).format('DD/MM/YYYY HH:mm:ss')}</Typography>
                          <Typography>ถึงวันที่ {dayjs(item.start_time_FTS).format('DD/MM/YYYY HH:mm:ss')}</Typography>
                        </Box>
                      </MenuItem>
                      <Divider />
                    </>
                  ))}
                  {mainTainCraneReducer.notiPlan.map((item) => (
                    <>
                      <MenuItem onClick={handleClose}>
                        <Box className='flex flex-col gap-2'>
                          <Typography>เครน {item.crane.crane_name} {item.desc}</Typography>
                          <Typography>วันที่ {dayjs(item.downtime).format('DD/MM/YYYY HH:mm:ss')}</Typography>
                          <Typography>ถึงวันที่ {dayjs(item.start_time).format('DD/MM/YYYY HH:mm:ss')}</Typography>
                        </Box>
                      </MenuItem>
                      <Divider />
                    </>
                  ))}
                </Menu>
              </div>
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
                  onClick={() => dispatch(logout(navigate))}
                >
                  <LogoutIcon />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Header;
