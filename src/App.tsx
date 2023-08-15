import { createContext, useState } from "react";
import { Floating } from "./types/FloatingCrane.type";
import Header from "./components/layout/Header/Header";
import { Route, Routes } from "react-router-dom";
import Footer from "./components/layout/Footer/Footer";
import HomePage from "./components/Pages/HomePage/HomePage";
import FloatingCranePage from "./components/Pages/FloatingCranePage/FloatingCranePage";
import MachinePage from "./components/Pages/CarrierPage/CarrierPage";
import MachineMovementPage from "./components/Pages/CargoPage/CargoPage";
import OrderPage from "./components/Pages/OrderPage/OrderPage";
import LoginPage from "./components/Pages/LoginPage/LoginPage";
import RegisterPage from "./components/Pages/RegisterPage/RegisterPage";

export const TodoContext = createContext<any>(null);

export default function App() {
  const [floating, setFloating] = useState<Floating[]>([]);

  return (
    <>
      <TodoContext.Provider value={{ floating, setFloating }}>
        <div className="bg-[#fff]">
          <Header />
          <div className="container mx-auto">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/floating-crane" element={<FloatingCranePage />} />
              <Route path="/carrier" element={<MachinePage />} />
              <Route path="/cargo" element={<MachineMovementPage />} />
              <Route path="/Order" element={<OrderPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </TodoContext.Provider>
    </>
  );
}
