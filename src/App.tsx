import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import Sidebar from './components/layout/Sidebar/Sidebar';
import Header from './components/layout/Header/Header';
import { Routes, Route, Navigate } from 'react-router-dom';
import PrivateRoute from './utils/PrivateRoute';
import { useSelector } from 'react-redux';
import { loginSelector, restoreLogin } from './store/slices/auth/loginSlice';
import PublicRoute from './utils/PublicRoute';
import { ToastContainer } from 'react-toastify';
import MainTainFtsAdd from './components/layout/MainTain/MainTainFtsAdd/MainTainFtsAdd';
import MainTainCraneAddCrane from './components/layout/MainTain/MainTainCraneAddCrane/MainTainCraneAddCrane';
import CargoPage from './components/Pages/CargoPage/CargoPage/CargoPage';
import CraneCreatePage from './components/Pages/FTSPage/CraneAddPage/CraneAddPage';
import CraneEdit from './components/Pages/FTSPage/CraneEdit/CraneEdit';
import FTSCreatePage from './components/Pages/FTSPage/FTSAddPage/FTSAddPage';
import FTSEditPage from './components/Pages/FTSPage/FTSEdit/FTSEditPage';
import FTSPage from './components/Pages/FTSPage/FtsPage/FTSPage';
import HomePage from './components/Pages/Home/HomePage';
import LoginPage from './components/Pages/LoginPage/LoginPage';
import RegisterPage from './components/Pages/Register/RegisterPage';
import ReportPage from './components/Pages/ReportPage/ReportPage';
import SummarizePage from './components/Pages/SummarizePage/SummarizePage';
import CargocranePage from './components/Pages/CargoCranePage/CargoCranePage/CargoCranePage';
import CargoCraneEditPageV2 from './components/Pages/CargoCranePage/CargoCraneEditPageV2/CargoCraneEditPageV2';
import CargoCraneCreate from './components/Pages/CargoCranePage/CargoCraneAddPage/CargoCraneAddPage';
import AdminRoute from './utils/AdminRoute';
import AdminRouteV2 from './utils/AdminRouteV2';
import ManagementUserPage from './components/Pages/ManagementUserPage/ManagementUserPage';
import CarrierCreate from './components/Pages/CarrierPage/CarrierAdd/CarrierAdd';
import CarrierEditPage from './components/Pages/CarrierPage/CarrierEditPage/CarrierEditPage';
import EmployeePage from './components/Pages/EmployeePage/EmployeePage';
import { sulutionScheduelAsync } from './store/slices/Solution/sollutionScheduleSlice';
import { roleAsync } from './store/slices/auth/rolesSlice';
import { useAppDispatch } from './store/store';
import { carrierAsync } from './store/slices/Carrier/carrierSlice';
import { craneAsync } from './store/slices/Crane/craneSlice';
import { cargoAsync } from './store/slices/Cargo/cargoSlice';
import { cargoCraneAsync } from './store/slices/CargoCrane/cargoCraneSlice';
import { ftsAsync } from './store/slices/FTS/ftsSlice';
import { orderAsync } from './store/slices/Order/orderSlice';
import OrderPage from './components/Pages/OrderPage/OrderPage/OrderPage';
import OrderCreatePage from './components/Pages/OrderPage/OrderAddPage/OrderAddPage';
import OrderEditPageV2 from './components/Pages/OrderPage/OrderEdit/OrderEditPageV2';
import CarrierPage from './components/Pages/CarrierPage/CarrierPage/CarrierPage';
import { reportCraneAsync } from './store/slices/report/reportCraneSlice';
import { solutionOrderAsync } from './store/slices/Solution/solutionOrderSlice';
import { craneSolutionV2Async } from './store/slices/Solution/craneSolutionV2Slice';
import { ftsSolutionTableAsync } from './store/slices/Solution/ftsSolutionTableSlice';

const drawerWidth = 240;

export default function ResponsiveDrawer() {
  const dispatch = useAppDispatch()
  const loginReducer = useSelector(loginSelector)
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    dispatch(sulutionScheduelAsync())
    dispatch(restoreLogin())


    dispatch(craneSolutionV2Async())
    dispatch(ftsSolutionTableAsync())
    dispatch(solutionOrderAsync())
    dispatch(reportCraneAsync())
    dispatch(carrierAsync())
    dispatch(roleAsync())
    dispatch(orderAsync())
    dispatch(craneAsync())
    dispatch(ftsAsync())
    dispatch(cargoAsync())
    dispatch(cargoCraneAsync())
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
              <Route path="/employee" element={<EmployeePage />} />
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
                <Route path="/orders/edit/:id" element={<OrderEditPageV2 />} />
                <Route path="/cargocrane/create" element={<CargoCraneCreate />} />
                <Route path="/cargocrane/edit/:id" element={<CargoCraneEditPageV2 />} />
                <Route path="/transferstation/maintain/create" element={<MainTainFtsAdd />} />
                <Route path="/transferstation/maintain/crane/create" element={<MainTainCraneAddCrane />} />
                <Route path="/employee" element={<EmployeePage />} />
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
    </Box >
  );
}