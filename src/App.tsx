import Header from "./components/layout/Header/Header";
import { Navigate, Route, Routes } from "react-router-dom";
import Footer from "./components/layout/Footer/Footer";
import HomePage from "./components/Pages/HomePage/HomePage";
import FloatingCranePage from "./components/Pages/FloatingCranePage/FloatingCranePage";
import MachinePage from "./components/Pages/CarrierPage/CarrierPage";
import MachineMovementPage from "./components/Pages/CargoPage/CargoPage";
import OrderPage from "./components/Pages/OrderPage/OrderPage";
import LoginPage from "./components/Pages/LoginPage/LoginPage";
import RegisterPage from "./components/Pages/RegisterPage/RegisterPage";
import EditFloatingCranePage from "./components/Pages/FloatingCranePage/EditFloatingCranePage/EditFloatingCranePage";
import EditCarrierPage from "./components/Pages/CarrierPage/EditCarrierPage/EditCarrierPage";
import CargoCranePage from "./components/Pages/CargoCranePage/CargoCranePage";
import AddCargoPage from "./components/Pages/CargoPage/AddCargoPage/ModalPopup";
import { useEffect } from "react";
import api from "./api/api";
import { useDispatch } from "react-redux";
import { setCargo } from "./store/slices/cargoSlice";
import { setFloating } from "./store/slices/floatingSlice";
import { setCarrier } from "./store/slices/carrierSlice";
import { setCargoCrane } from "./store/slices/cargocraneSlice";
import { setOrders } from "./store/slices/OrderSlice";

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    api.get("/cargo").then((res) => dispatch(setCargo(res.data.cargo)))
    api.get("/cargocrane").then((res) => dispatch(setCargoCrane(res.data.cargocranes)))
    api.get("/floating").then((res) => dispatch(setFloating(res.data.result)))
    api.get("/carrier").then((res) => dispatch(setCarrier(res.data.Carriers)))
    api.get("/order").then((res) => dispatch(setOrders(res.data.orders)))
  }, []);

  return (
    <>
      <div className="bg-[#fff]">
        <Header />
        <div className="container mx-auto">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/Floating Transfer" element={<FloatingCranePage />} />
            <Route path="/carrier" element={<MachinePage />} />
            <Route path="/cargo" element={<MachineMovementPage />} />
            <Route path="/cargo/add-crago" element={<AddCargoPage />} />
            <Route path="/Order" element={<OrderPage />} />
            <Route
              path="/update-position/:id"
              element={<EditFloatingCranePage />}
            />
            <Route path="/cargo crane" element={<CargoCranePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/editcarrierpage/:id" element={<EditCarrierPage />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </>
  );
}


{/* <VirtualHost *:80>
    ServerAdmin webmaster@yourdomain.com
    ServerName babackapi.com
    DocumentRoot /root/api-crane/babank-backend/src
    ErrorLog ${APACHE_LOG_DIR}/error.log
    CustomLog ${APACHE_LOG_DIR}/access.log combined

    <Directory /root/api-crane/babank-backend/src>
        Options Indexes FollowSymLinks
        AllowOverride All
        Require all granted
    </Directory>
</VirtualHost> */}

