import Header from "./components/layout/Header/Header";
import { Navigate, Route, Routes } from "react-router-dom";
import Footer from "./components/layout/Footer/Footer";
import HomePage from "./components/Pages/Home/Page";
import FloatingCranePage from "./components/Pages/FloatingCrane/Page";
import CarrierPage from "./components/Pages/Carrier/Page";
import RegisterPage from "./components/Pages/Register/Page";
import EditFloatingCranePage from "./components/Pages/FloatingCrane/Edit/Page";
import EditCarrierPage from "./components/Pages/Carrier/Edit/EditCarrierPage";
import { useEffect } from "react";
import api from "./api/api";
import { useDispatch } from "react-redux";
import { setCargo } from "./store/slices/cargoSlice";
import { setFloating } from "./store/slices/floatingSlice";
import { setCarrier } from "./store/slices/carrierSlice";
import { setCargoCrane } from "./store/slices/cargocraneSlice";
import { setOrders } from "./store/slices/OrderSlice";
import CargocranePage from "./components/Pages/Cargocrane/CargoCranePage";
import OrderPage from "./components/Pages/Order/Page";
import LoginPage from "./components/Pages/Login/Page";
import CargoPage from "./components/Pages/Cargo/Page";

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
            <Route path="/carrier" element={<CarrierPage />} />
            <Route path="/cargo" element={<CargoPage />} />
            <Route path="/Order" element={<OrderPage />} />
            <Route
              path="/update-position/:id"
              element={<EditFloatingCranePage />}
            />
            <Route path="/cargo crane" element={<CargocranePage />} />
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

