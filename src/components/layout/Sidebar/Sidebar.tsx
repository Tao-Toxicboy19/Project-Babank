import { Box, Divider, Drawer, ListItem, ListItemButton, ListItemIcon, ListItemText, Stack, Toolbar, Typography } from '@mui/material';
import React from 'react';
import DirectionsBoatFilledIcon from '@mui/icons-material/DirectionsBoatFilled';
import SupportIcon from '@mui/icons-material/Support';
import LayersIcon from '@mui/icons-material/Layers';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ListAltIcon from '@mui/icons-material/ListAlt';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link, NavLink } from 'react-router-dom';
import GridViewIcon from '@mui/icons-material/GridView';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../../store/slices/auth/login.slice';
import AlignHorizontalLeftIcon from '@mui/icons-material/AlignHorizontalLeft';
import { HiOutlineDocumentReport } from 'react-icons/hi';
import { BiUser } from 'react-icons/bi';
import { RootState } from '../../../store/store';
import Loading from '../Loading/Loading';
import { PiUserListLight } from "react-icons/pi";

const Sidebar = ({ mobileOpen, handleDrawerToggle, drawerWidth }: any) => {
    const dispatch = useDispatch<any>();
    const rolesReducer = useSelector((state: RootState) => state.rolesReducer);

    const MyNavLink = React.forwardRef<any, any>((props, ref) => {
        return (
            <NavLink
                ref={ref}
                to={props.to}
                className={({ isActive }) =>
                    `${props.className} ${isActive ? props.activeClassName : ""}`
                }
            >
                {props.children}
            </NavLink>
        );
    });

    const drawer = (
        <div>
            <Toolbar>
                <Typography
                    variant="h6"
                    noWrap
                    component={Link}
                    to="/"
                    sx={{
                        mr: 2,
                        fontSize: 22,
                        display: { xs: "none", md: "flex" },
                        fontFamily: "monospace",
                        fontWeight: 700,
                        letterSpacing: ".1rem",
                        color: "inherit",
                        textDecoration: "none",
                    }}
                    className='text-blue-900'
                >
                    crane.otpzlab
                </Typography>
            </Toolbar>
            <Divider />
            <Stack direction='column' spacing={1} sx={{ marginY: 3 }}>
                <ListItem button component={MyNavLink} to="/home" activeClassName="Mui-selected" exact>
                    <ListItemIcon>
                        <GridViewIcon />
                    </ListItemIcon>
                    <ListItemText
                        primary={
                            <Typography variant="body1" className="font-kanit">
                                หน้าแรก
                            </Typography>
                        }
                    />
                </ListItem>
                <ListItem button component={MyNavLink} to="/transferstation" activeClassName="Mui-selected" exact>
                    <ListItemIcon>
                        <SupportIcon />
                    </ListItemIcon>
                    <ListItemText
                        primary={
                            <Typography variant="body1" className="font-kanit">
                                ทุ่น
                            </Typography>
                        }
                    />
                </ListItem>
                <ListItem button component={MyNavLink} to="/carrier" activeClassName="Mui-selected" exact>
                    <ListItemIcon>
                        <DirectionsBoatFilledIcon />
                    </ListItemIcon>
                    <ListItemText
                        primary={
                            <Typography variant="body1" className="font-kanit">
                                เรือสินค้า
                            </Typography>
                        } />
                </ListItem>
                <ListItem button component={MyNavLink} to="/cargo" activeClassName="Mui-selected" exact>
                    <ListItemIcon>
                        <ListAltIcon />
                    </ListItemIcon>
                    <ListItemText
                        primary={
                            <Typography variant="body1" className="font-kanit">
                                สินค้า
                            </Typography>
                        } />
                </ListItem>
                <ListItem button component={MyNavLink} to="/cargocrane" activeClassName="Mui-selected" exact>
                    <ListItemIcon>
                        <LayersIcon />
                    </ListItemIcon>
                    <ListItemText
                        primary={
                            <Typography variant="body1" className="font-kanit">
                                ข้อมูลสินค้าและเครน
                            </Typography>
                        } />
                </ListItem>
                <ListItem button component={MyNavLink} to="/orders" activeClassName="Mui-selected" exact>
                    <ListItemIcon>
                        <DashboardIcon />
                    </ListItemIcon>
                    <ListItemText
                        primary={
                            <Typography variant="body1" className="font-kanit">
                                รายการขนถ่ายสินค้า
                            </Typography>
                        } />
                </ListItem>
                <ListItem button component={MyNavLink} to="/summarize" activeClassName="Mui-selected" exact>
                    <ListItemIcon>
                        <AlignHorizontalLeftIcon className='flex justify-center text-3xl' />
                    </ListItemIcon>
                    <ListItemText
                        primary={
                            <Typography variant="body1" className="font-kanit">
                                สรุปแผนการจัดทุ่นและต้นทุน
                            </Typography>
                        } />
                </ListItem>
                <ListItem button component={MyNavLink} to="/report" activeClassName="Mui-selected" exact>
                    <ListItemIcon>
                        <HiOutlineDocumentReport className='text-3xl ml-[-4px]' />
                    </ListItemIcon>
                    <ListItemText
                        primary={
                            <Typography variant="body1" className="font-kanit">
                                รายงาน
                            </Typography>
                        } />
                </ListItem>
                <ListItem button component={MyNavLink} to="/employee" activeClassName="Mui-selected" exact>
                    <ListItemIcon>
                        <PiUserListLight className='text-3xl ml-[-4px]' />
                    </ListItemIcon>
                    <ListItemText
                        primary={
                            <Typography variant="body1" className="font-kanit">
                                พนักงาน
                            </Typography>
                        } />
                </ListItem>
            </Stack>
            <Divider />
            {rolesReducer.result ? (
                rolesReducer.result.role === 'Viewer' ? (
                    <></>
                ) : rolesReducer.result.role === 'Contributor' ? (
                    <></>
                ) : (
                    <Box className='mt-5'>
                        <ListItem button component={MyNavLink} to="/management/user" activeClassName="Mui-selected" exact>
                            <ListItemIcon>
                                <BiUser className='text-3xl ml-[-4px]' />
                            </ListItemIcon>
                            <ListItemText
                                primary={
                                    <Typography variant="body1" className="font-kanit">
                                        จัดการบัญชีผู้ใช้
                                    </Typography>
                                } />
                        </ListItem>
                    </Box>
                )
            ) : (
                <></>
            )}
            <Stack sx={{ position: 'absolute', bottom: 10, width: '100%' }}>
                <ListItemButton
                    onClick={() => dispatch(logout())}
                >
                    <ListItemIcon>
                        <LogoutIcon />
                    </ListItemIcon>
                    <ListItemText primary="Logout" />
                </ListItemButton>
            </Stack>
        </div >
    );

    return (
        <nav
            style={{
                width: drawerWidth,
                flexShrink: 0,
            }}
        >
            <Drawer
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                    keepMounted: true,
                }}
                sx={{
                    display: { xs: 'block', sm: 'none' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                }}
            >
                {drawer}
            </Drawer>
            <Drawer
                variant="permanent"
                sx={{
                    display: { xs: 'none', sm: 'block' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                }}
            >
                {rolesReducer.loading ? (
                    <Loading />
                ) : (
                    drawer
                )}
            </Drawer>
        </nav>
    );
};

export default Sidebar;
