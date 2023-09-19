import { useEffect, useState } from 'react';
import { Box, CssBaseline } from '@mui/material';
import Sidebar from './components/layout/Sidebar/Sidebar';
import Header from './components/layout/Header/Header';
import { Routes, Route, Navigate } from 'react-router-dom';
import CargoPage from './components/Pages/Cargo/CargoPage';
import CarrierPage from './components/Pages/Carrier/CarrierPage';
import RegisterPage from './components/Pages/Register/RegisterPage';
import OrderPage from './components/Pages/Order/OrderPage';
import PrivateRoute from './utlis/PrivateRoute';
import CargocranePage from './components/Pages/Cargocrane/CargoCranePage';
import { useDispatch, useSelector } from 'react-redux';
import { TOKEN } from './Constants';
import { restoreLogin } from './store/slices/login.slice';
import LoginPage from './components/Pages/LoginPage/LoginPage';
import HomePage from './components/Pages/Home/HomePage';
import { loadCargo } from './store/slices/cargo.slice';
import { loadCarrier } from './store/slices/carrier.slice';
import { loadOrder } from './store/slices/order.slice';
import { RootState } from './store/store';
import PublicRoute from './utlis/PublicRoute';
import FloatingPage from './components/Pages/FTSPage/FloatingPage';
import CraneCreatePage from './components/Pages/FTSPage/CraneCreatePage/CraneCreatePage';
import CraneEdit from './components/Pages/FTSPage/CraneEdit/CraneEdit';
import FTSCreatePage from './components/Pages/FTSPage/FTSCreatePage/FTSCreatePage';
import FTSEditPage from './components/Pages/FTSPage/FTSEdit/FTSEditPage';
import MovingTablePage from './components/Pages/Summarize/movingTable';

const drawerWidth = 240;

function ResponsiveDrawer() {
  const dispatch = useDispatch<any>();
  const loginReducer = useSelector((state: RootState) => state.login);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(loadCarrier())
      await dispatch(loadCargo())
      // await dispatch(loadCargoCrane())
      await dispatch(loadOrder())
      console.log('Hello Guys')
    };
    fetchData();
  }, [dispatch]);

  useEffect(() => {
    dispatch(restoreLogin())
  }, []);

  const Token = localStorage.getItem(TOKEN);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: 'flex' }} >
      <CssBaseline />
      {/* {loginReducer.data && <Header drawerWidth={drawerWidth} handleDrawerToggle={handleDrawerToggle} />}
      {loginReducer.data && <Sidebar mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} drawerWidth={drawerWidth} />} */}
      <Header drawerWidth={drawerWidth} handleDrawerToggle={handleDrawerToggle} />
      <Sidebar mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} drawerWidth={drawerWidth} />
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Box sx={{ marginTop: 8 }}>
          <Routes>
            {/* <Route element={<PrivateRoute token={Token} />}> */}
            <Route path="/home" element={<HomePage />} />
            <Route path="/cargo" element={<CargoPage />} />
            {/* <Route path="/" element={<Maps />} /> */}
            <Route path="/transferstation" element={<FloatingPage />} />
            <Route path="/transferstation/create" element={<FTSCreatePage />} />
            <Route path="/transferstation/edit/:id" element={<FTSEditPage />} />
            <Route path="/transferstation/create/crane" element={<CraneCreatePage />} />
            <Route path="/transferstation/crane/edit/:id" element={<CraneEdit />} />
            <Route path="/carrier" element={<CarrierPage />} />
            <Route path="/Order" element={<OrderPage />} />
            <Route path="/cargocrane" element={<CargocranePage />} />
            <Route path="/summarize" element={< MovingTablePage />} />
            <Route path="*" element={<Navigate to="/home" />} />
            {/* </Route> */}
            {/* <Route element={<PublicRoute token={Token} />}> */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="*" element={<Navigate to="/login" />} />
            {/* </Route> */}
          </Routes>
        </Box>
      </Box>
    </Box>
  );
}

export default ResponsiveDrawer;
