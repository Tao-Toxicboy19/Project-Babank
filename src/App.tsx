import { useEffect, useState } from 'react';
import { Box, CssBaseline } from '@mui/material';
import Sidebar from './components/layout/Sidebar/Sidebar';
import Header from './components/layout/Header/Header';
import { Routes, Route, Navigate } from 'react-router-dom';
import CargoPage from './components/Pages/Cargo/CargoPage';
import CarrierPage from './components/Pages/Carrier/CarrierPage';
import FloatingPage from './components/Pages/FloatingCrane/FloatingPage';
import RegisterPage from './components/Pages/LoginPage/Register/RegisterPage';
import OrderPage from './components/Pages/Order/OrderPage';
import PrivateRoute from './utlis/PrivateRoute';
import CargocranePage from './components/Pages/Cargocrane/CargoCranePage';
import { useDispatch } from 'react-redux';
import { TOKEN } from './Constants';
import { restoreLogin } from './store/slices/login.slice';
import LoginPage from './components/Pages/LoginPage/LoginPage';
import HomePage from './components/Pages/Home/HomePage';
import { loadCargo } from './store/slices/cargo.slice';
import { loadCarrier } from './store/slices/carrier.slice';
import { floating } from './store/slices/floating.slice';
import { loadOrder } from './store/slices/order.slice';

const drawerWidth = 240;

function ResponsiveDrawer() {
  const dispatch = useDispatch<any>();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(floating());
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
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      {/* {loginReducer && <Header drawerWidth={drawerWidth} handleDrawerToggle={handleDrawerToggle} />}
      {loginReducer && <Sidebar mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} drawerWidth={drawerWidth} />} */}
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
            <Route path="/carrier" element={<CarrierPage />} />
            <Route path="/Order" element={<OrderPage />} />
            <Route path="/cargocrane" element={<CargocranePage />} />
            {/* <Route path="/summarize" element={< MovingTablePage />} /> */}
            <Route path="*" element={<Navigate to="/home" />} />
            {/* </Route> */}
            <Route element={<PrivateRoute token={Token} />}>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="*" element={<Navigate to="/login" />} />
            </Route>
          </Routes>
        </Box>
      </Box>
    </Box>
  );
}

export default ResponsiveDrawer;
