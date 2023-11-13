import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import Sidebar from './components/layout/Sidebar/Sidebar';
import Header from './components/layout/Header/Header';
import { Routes, Route, Navigate } from 'react-router-dom';
import PrivateRoute from './utils/PrivateRoute';
import { useDispatch, useSelector } from 'react-redux';
import { restoreLogin } from './store/slices/auth/login.slice';
import { RootState } from './store/store';
import PublicRoute from './utils/PublicRoute';
import { ToastContainer } from 'react-toastify';
import CarrierEditPage from './components/layout/Carrier/Edit/CarrierEditPage';
import CarrierCreate from './components/layout/Carrier/Insert/CarrierCreate';
import CreateCargoOrderPage from './components/layout/Order/OrderCreatePage/CreateCargoOrderPage/CreateCargoOrderPage';
import OrderCreatePage from './components/layout/Order/OrderCreatePage/OrderCreatePage';
import OrderEditPageV2 from './components/layout/Order/OrderEdit/OrderEditPageV2';
import EditFTS from './components/layout/MainTain/EditFTS/EditFTS';
import CreateFTS from './components/layout/MainTain/CreateFTS/CreateFTS';
import CreateCrane from './components/layout/MainTain/CreateCrane/CreateCrane';
import CargoPage from './components/Pages/Cargo/CargoPage';
import CraneCreatePage from './components/Pages/FTSPage/CraneCreatePage/CraneCreatePage';
import CraneEdit from './components/Pages/FTSPage/CraneEdit/CraneEdit';
import FTSCreatePage from './components/Pages/FTSPage/FTSCreatePage/FTSCreatePage';
import FTSEditPage from './components/Pages/FTSPage/FTSEdit/FTSEditPage';
import FTSPage from './components/Pages/FTSPage/FTSPage';
import HomePage from './components/Pages/Home/HomePage';
import LoginPage from './components/Pages/LoginPage/LoginPage';
import OrderPage from './components/Pages/Order/OrderPage';
import RegisterPage from './components/Pages/Register/RegisterPage';
import ReportPage from './components/Pages/ReportPage/ReportPage';
import SummarizePage from './components/Pages/SummarizePage/SummarizePage';
import CargocranePage from './components/Pages/Cargocrane/CargoCranePage';
import CargoCraneEditPageV2 from './components/layout/CargoCraneLayout/Edit/CargoCraneEditPageV2';
import CargoCraneCreate from './components/layout/CargoCraneLayout/Insert/CargoCraneCreate';
import CarrierPage from './components/Pages/Carrier/CarrierPage';
import CargoEditPage from './components/layout/Order/OrderEdit/CargoEditPage/CargoEditPage';
import { roles } from './store/slices/auth/rolesSlice';
import AdminRoute from './utils/AdminRoute';
import AdminRouteV2 from './utils/AdminRouteV2';
import ManagementUserPage from './components/Pages/ManagementUserPage/ManagementUserPage';

const drawerWidth = 240;

export default function ResponsiveDrawer() {
  const dispatch = useDispatch<any>();
  const loginReducer = useSelector((state: RootState) => state.login);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    dispatch(restoreLogin());
    dispatch(roles())
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: 'flex' }} className='bg-gradient-to-bl from-[#5FBCFF] to-[#FFF] w-full h-full min-h-screen'>

      <ToastContainer />
      {loginReducer.data && <Header drawerWidth={drawerWidth} handleDrawerToggle={handleDrawerToggle} />}
      {loginReducer.data && <Sidebar mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} drawerWidth={drawerWidth} />}
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Box sx={{ marginTop: 6 }}>
          <Routes>
            <Route element={<PrivateRoute />}>

              <Route path="/home" element={<HomePage />} />
              <Route path="/cargo" element={<CargoPage />} />
              <Route path="/transferstation" element={<FTSPage />} />
              <Route path="/carrier" element={<CarrierPage />} />
              <Route path="/orders" element={<OrderPage />} />
              <Route path="/summarize" element={< SummarizePage />} />
              <Route path="/report" element={< ReportPage />} />
              <Route path="/cargocrane" element={<CargocranePage />} />
              <Route path="*" element={<Navigate to="/home" />} />

              <Route element={<AdminRoute />}>
                <Route path="*" element={<Navigate to="/home" />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/cargo" element={<CargoPage />} />
                <Route path="/transferstation" element={<FTSPage />} />
                <Route path="/carrier" element={<CarrierPage />} />
                <Route path="/orders" element={<OrderPage />} />
                <Route path="/summarize" element={< SummarizePage />} />
                <Route path="/report" element={< ReportPage />} />
                <Route path="/cargocrane" element={<CargocranePage />} />
                <Route path="/transferstation/create" element={<FTSCreatePage />} />
                <Route path="/transferstation/edit/:id" element={<FTSEditPage />} />
                <Route path="/transferstation/create/crane" element={<CraneCreatePage />} />
                <Route path="/transferstation/crane/edit/:id" element={<CraneEdit />} />
                <Route path="/carrier/create" element={<CarrierCreate />} />
                <Route path="/carrier/edit/:id" element={<CarrierEditPage />} />
                <Route path="/orders/create" element={<OrderCreatePage />} />
                <Route path="/orders/create/cargo" element={<CreateCargoOrderPage />} />
                <Route path="/orders/edit/:id" element={<OrderEditPageV2 />} />
                <Route path="/orders/cargo/edit/:id" element={<CargoEditPage />} />
                <Route path="/cargocrane/create" element={<CargoCraneCreate />} />
                <Route path="/cargocrane/edit/:id" element={<CargoCraneEditPageV2 />} />
                <Route path="/maintain/:id" element={< EditFTS />} />
                <Route path="/transferstation/maintain/create" element={<CreateFTS />} />
                <Route path="/transferstation/maintain/crane/create" element={<CreateCrane />} />
              </Route>


              <Route element={<AdminRouteV2 />}>
                <Route path="/management/user" element={<ManagementUserPage />} />
              </Route>


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