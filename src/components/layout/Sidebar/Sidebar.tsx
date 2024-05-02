import { Badge, Box, Button, Divider, Drawer, IconButton, ListItem, ListItemIcon, ListItemText, Menu, MenuItem, Stack, Toolbar, Typography } from '@mui/material';
import React from 'react';
import DirectionsBoatFilledIcon from '@mui/icons-material/DirectionsBoatFilled';
import SupportIcon from '@mui/icons-material/Support';
import LayersIcon from '@mui/icons-material/Layers';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ListAltIcon from '@mui/icons-material/ListAlt';
import { Link, NavLink } from 'react-router-dom';
import GridViewIcon from '@mui/icons-material/GridView';
import { useSelector } from 'react-redux';
import AlignHorizontalLeftIcon from '@mui/icons-material/AlignHorizontalLeft';
// import { HiOutlineDocumentReport } from 'react-icons/hi';
import { BiUser } from 'react-icons/bi';
import Loading from '../Loading/Loading';
import { roleSelector } from '../../../store/slices/auth/rolesSlice';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { mainTainCraneSelector, removeNotiCrane } from '../../../store/slices/MainTainCrane/mainTainCraneSlice';
import { mainTainFtsSelector, removeNotiFTS } from '../../../store/slices/mainTainFts/mainTainFtsSlice';
import dayjs from 'dayjs';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAppDispatch } from '../../../store/store';

const Sidebar = ({ mobileOpen, handleDrawerToggle, drawerWidth }: any) => {
    const rolesReducer = useSelector(roleSelector)
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const mainTainFTSReducer = useSelector(mainTainFtsSelector)
    const mainTainCraneReducer = useSelector(mainTainCraneSelector)
    const dispatch = useAppDispatch()
    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    }

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

    // console.log(mainTainCraneReducer.notiPlan.length)
    console.log(mainTainFTSReducer.notiPlan.length)

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
                    <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleMenu}
                        color="inherit"
                    >
                        <Badge badgeContent={mainTainFTSReducer.count + mainTainCraneReducer.count} color="error">
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
                                    <Box className='flex flex-row gap-x-2'>
                                        <Box className='flex items-center'>
                                            <IconButton
                                                onClick={async () => {
                                                    console.log()
                                                    dispatch(removeNotiFTS({ id: item.maintain_FTS_id, type: 'fts' }))
                                                }}
                                            >
                                                <DeleteIcon color='error' />
                                            </IconButton>
                                        </Box>
                                        <Box className='flex flex-col gap-2'>
                                            <Typography>เครน {item.fts.FTS_name} {item.desc_FTS}</Typography>
                                            <Typography>วันที่ {dayjs(item.downtime_FTS).format('DD/MM/YYYY HH:mm:ss')}</Typography>
                                            <Typography>ถึงวันที่ {dayjs(item.start_time_FTS).format('DD/MM/YYYY HH:mm:ss')}</Typography>
                                        </Box>
                                    </Box>
                                </MenuItem>
                                <Divider />
                            </>
                        ))}
                        {mainTainCraneReducer.notiPlan.map((item) => (
                            <>
                                <MenuItem onClick={handleClose}>
                                    <Box className='flex flex-row gap-x-2'>
                                        <Box className='flex items-center'>
                                            <IconButton
                                                onClick={async () => {
                                                    dispatch(removeNotiCrane({ id: item.maintain_crane_id, type: 'crane' }))
                                                }}
                                            >
                                                <DeleteIcon color='error' />
                                            </IconButton>
                                        </Box>
                                        <Box className='flex flex-col gap-2'>
                                            <Typography>เครน {item.crane.crane_name} {item.desc}</Typography>
                                            <Typography>วันที่ {dayjs(item.downtime).format('DD/MM/YYYY HH:mm:ss')}</Typography>
                                            <Typography>ถึงวันที่ {dayjs(item.start_time).format('DD/MM/YYYY HH:mm:ss')}</Typography>
                                        </Box>
                                    </Box>
                                </MenuItem>
                                <Divider />
                            </>
                        ))}
                    </Menu>
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
                        }
                    />
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
                {/* <ListItem button component={MyNavLink} to="/report" activeClassName="Mui-selected" exact>
                    <ListItemIcon>
                        <HiOutlineDocumentReport className='text-3xl ml-[-4px]' />
                    </ListItemIcon>
                    <ListItemText
                        primary={
                            <Typography variant="body1" className="font-kanit">
                                รายงาน
                            </Typography>
                        } />
                </ListItem> */}
                {/* <ListItem button component={MyNavLink} to="/employee" activeClassName="Mui-selected" exact>
                    <ListItemIcon>
                        <PiUserListLight className='text-3xl ml-[-4px]' />
                    </ListItemIcon>
                    <ListItemText
                        primary={
                            <Typography variant="body1" className="font-kanit">
                                พนักงาน
                            </Typography>
                        } />
                </ListItem> */}
            </Stack>
            <Divider />
            {
                rolesReducer.result ? (
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
                )
            }
        </div >
    );

    return (
        <nav
            className={`min-[600px]:w-[240px]`}
            style={{
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
