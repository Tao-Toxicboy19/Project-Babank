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

export default function App() {
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
            <Route path="/Order" element={<OrderPage />} />
            <Route path="/add-position" element={<AddFloatingCranePage />} />
            <Route
              path="/update-position/:id"
              element={<EditFloatingCranePage />}
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
