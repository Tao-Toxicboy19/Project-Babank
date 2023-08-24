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
import AddFloatingCranePage from "./components/Pages/FloatingCranePage/AddFloatingCranePage/AddFloatingCranePage";
import EditFloatingCranePage from "./components/Pages/FloatingCranePage/EditFloatingCranePage/EditFloatingCranePage";
import AddCarrierPage from "./components/Pages/CarrierPage/AddCarrierPage/AddCarrierPage";
import EditCarrierPage from "./components/Pages/CarrierPage/EditCarrierPage/EditCarrierPage";
import CargoCranePage from "./components/Pages/CargoCranePage/CargoCranePage";
import AddCargoPage from "./components/Pages/CargoPage/AddCargoPage/AddCargoPage";
import AddCargoCranePage from "./components/Pages/CargoCranePage/AddCargoCranePage/AddCargoCranePage";
import { useEffect } from "react";
import api from "./api/api";
import { addfloating } from "./store/slices/locationSlice";
import { useDispatch } from "react-redux";
import { setCargo } from "./store/slices/cargoSlice";

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    api.get("/cargos").then((res) => dispatch(setCargo(res.data.cargo)));
    api.get("/floating").then((res) => dispatch(addfloating(res.data.result)));
  }, []);

  return (
    <>
      <div className="bg-[#fff]">
        <Header />
        <div className="container mx-auto">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/floating crane" element={<FloatingCranePage />} />
            <Route path="/carrier" element={<MachinePage />} />
            <Route path="/cargo" element={<MachineMovementPage />} />
            <Route path="/cargo/add-crago" element={<AddCargoPage />} />
            <Route path="/Order" element={<OrderPage />} />
            <Route
              path="/floating crane/insert-crane"
              element={<AddFloatingCranePage />}
            />
            <Route
              path="/update-position/:id"
              element={<EditFloatingCranePage />}
            />
            <Route path="/cargo crane" element={<CargoCranePage />} />
            <Route
              path="/cargo crane/insert-crago crane"
              element={<AddCargoCranePage />}
            />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/addcarrierpage" element={<AddCarrierPage />} />
            <Route path="/editcarrierpage/:id" element={<EditCarrierPage />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </>
  );
}
