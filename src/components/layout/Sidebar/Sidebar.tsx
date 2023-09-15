import { Divider, Drawer, ListItem, ListItemIcon, ListItemText, Stack, Toolbar, Typography } from '@mui/material';
import React from 'react';
import DirectionsBoatFilledIcon from '@mui/icons-material/DirectionsBoatFilled';
import SupportIcon from '@mui/icons-material/Support';
import LayersIcon from '@mui/icons-material/Layers';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ListAltIcon from '@mui/icons-material/ListAlt';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { loutout } from '../../../store/slices/login.slice';
import { useDispatch } from 'react-redux';

const Sidebar = ({ mobileOpen, handleDrawerToggle, drawerWidth }: any) => {
    const dispatch = useDispatch<any>();
    const navigate = useNavigate()

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
                        <SupportIcon />
                    </ListItemIcon>
                    <ListItemText primary="ทุ่น" />
                </ListItem>
                <ListItem button component={MyNavLink} to="/transferstation" activeClassName="Mui-selected" exact>
                    <ListItemIcon>
                        <SupportIcon />
                    </ListItemIcon>
                    <ListItemText primary="ทุ่น" />
                </ListItem>
                <ListItem button component={MyNavLink} to="/carrier" activeClassName="Mui-selected" exact>
                    <ListItemIcon>
                        <DirectionsBoatFilledIcon />
                    </ListItemIcon>
                    <ListItemText primary="เรือสินค้า" />
                </ListItem>
                <ListItem button component={MyNavLink} to="/cargo" activeClassName="Mui-selected" exact>
                    <ListItemIcon>
                        <ListAltIcon />
                    </ListItemIcon>
                    <ListItemText primary="สินค้า" />
                </ListItem>
                <ListItem button component={MyNavLink} to="/cargocrane" activeClassName="Mui-selected" exact>
                    <ListItemIcon>
                        <LayersIcon />
                    </ListItemIcon>
                    <ListItemText primary="ข้อมูลสินค้าและเครน" />
                </ListItem>
                <ListItem button component={MyNavLink} to="/order" activeClassName="Mui-selected" exact>
                    <ListItemIcon>
                        <DashboardIcon />
                    </ListItemIcon>
                    <ListItemText primary="การถ่ายโอนสินค้า" />
                </ListItem>
            </Stack>
            <Divider />
            <Stack sx={{ position: 'absolute', bottom: 10, width: '100%' }}>
                <ListItem button component={MyNavLink} to="/login" activeClassName="Mui-selected" exact>
                    <ListItemIcon
                        onClick={() => {
                            dispatch(loutout(navigate))
                        }}>
                        <LogoutIcon />
                    </ListItemIcon>
                    <ListItemText primary="Logout" />
                </ListItem>
            </Stack>
        </div>
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
                    keepMounted: true, // Better open performance on mobile.
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
                {drawer}
            </Drawer>
        </nav>
    );
};

export default Sidebar;
