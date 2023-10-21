import { useEffect, useState } from 'react';
import { Box, CssBaseline } from '@mui/material';
import Sidebar from './components/layout/Sidebar/Sidebar';
import Header from './components/layout/Header/Header';
import { Routes, Route, Navigate } from 'react-router-dom';
import CargoPage from './components/pages/Cargo/CargoPage';
import CarrierPage from './components/pages/Carrier/CarrierPage';
import RegisterPage from './components/pages/Register/RegisterPage';
import OrderPage from './components/pages/Order/OrderPage';
import PrivateRoute from './utils/PrivateRoute';
import CargocranePage from './components/pages/Cargocrane/CargoCranePage';
import { useDispatch, useSelector } from 'react-redux';
import { restoreLogin } from './store/slices/login.slice';
import LoginPage from './components/pages/LoginPage/LoginPage';
import { RootState } from './store/store';
import PublicRoute from './utils/PublicRoute';
import CraneCreatePage from './components/pages/FTSPage/CraneCreatePage/CraneCreatePage';
import CraneEdit from './components/pages/FTSPage/CraneEdit/CraneEdit';
import FTSCreatePage from './components/pages/FTSPage/FTSCreatePage/FTSCreatePage';
import FTSEditPage from './components/pages/FTSPage/FTSEdit/FTSEditPage';
import FTSPage from './components/pages/FTSPage/FTSPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HomePage from './components/pages/Home/HomePage';
import SummarizePage from './components/pages/SummarizePage/SummarizePage';
import ReportPage from './components/pages/ReportPage/ReportPage';
import CargoCraneEditPageV2 from './components/layout/CargoCreateLayout/Edit/CargoCraneEditPageV2';
import CargoCraneCreate from './components/layout/CargoCreateLayout/Insert/CargoCraneCreate';
import CarrierEditPage from './components/layout/Carrier/Edit/CarrierEditPage';
import CarrierCreate from './components/layout/Carrier/Insert/CarrierCreate';
import CreateCargoOrderPage from './components/layout/Order/OrderCreatePage/CreateCargoOrderPage/CreateCargoOrderPage';
import OrderCreatePage from './components/layout/Order/OrderCreatePage/OrderCreatePage';
import OrderEditPageV2 from './components/layout/Order/OrderEdit/OrderEditPageV2';

const drawerWidth = 240;

export default function ResponsiveDrawer() {
  const dispatch = useDispatch<any>();
  const loginReducer = useSelector((state: RootState) => state.login);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    dispatch(restoreLogin())
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };


  return (
    <Box sx={{ display: 'flex' }} className='bg-gradient-to-bl from-[#5FBCFF] to-[#FFF] w-full h-full min-h-screen'>
      <CssBaseline />
      <ToastContainer />
      {loginReducer.data && <Header drawerWidth={drawerWidth} handleDrawerToggle={handleDrawerToggle} />}
      {loginReducer.data && <Sidebar mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} drawerWidth={drawerWidth} />}
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Box sx={{ marginTop: 8 }}>
          <Routes>
            <Route element={<PrivateRoute />}>
              <Route path="/home" element={<HomePage />} />
              <Route path="/cargo" element={<CargoPage />} />
              <Route path="/transferstation" element={<FTSPage />} />
              <Route path="/transferstation/create" element={<FTSCreatePage />} />
              <Route path="/transferstation/edit/:id" element={<FTSEditPage />} />
              <Route path="/transferstation/create/crane" element={<CraneCreatePage />} />
              <Route path="/transferstation/crane/edit/:id" element={<CraneEdit />} />
              <Route path="/carrier" element={<CarrierPage />} />
              <Route path="/carrier/create" element={<CarrierCreate />} />
              <Route path="/carrier/edit/:id" element={<CarrierEditPage />} />
              <Route path="/orders" element={<OrderPage />} />
              <Route path="/orders/create" element={<OrderCreatePage />} />
              <Route path="/orders/create/cargo" element={<CreateCargoOrderPage />} />
              <Route path="/orders/edit/:id" element={<OrderEditPageV2 />} />
              {/* <Route path="/orders/cargo/edit/:id" element={<CargoEditPage />} /> */}
              <Route path="/cargocrane" element={<CargocranePage />} />
              <Route path="/cargocrane/create" element={<CargoCraneCreate />} />
              <Route path="/cargocrane/edit/:id" element={<CargoCraneEditPageV2 />} />
              <Route path="/summarize" element={< SummarizePage />} />
              <Route path="/report" element={< ReportPage />} />
              <Route path="*" element={<Navigate to="/home" />} />
            </Route>
            <Route element={<PublicRoute />}>
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