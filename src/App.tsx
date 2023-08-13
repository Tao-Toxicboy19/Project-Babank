import React, { useState } from "react";
import { Link, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./components/Pages/LoginPage/LoginPage";
import RegisterPage from "./components/Pages/RegisterPage/RegisterPage";
import PlotdataPage from "./components/Pages/FloatingCranePage/FloatingCranePage";
import MachinePage from "./components/Pages/CarrierPage/CarrierPage";
import MachineMovementPage from "./components/Pages/CargoPage/CargoPage";
import ContactPage from "./components/Pages/ContactPage/ContactPage";
import HomePage from "./components/Pages/HomePage/HomePage";
import Header from "./components/layout/Header/Header";
import FloatingCranePage from "./components/Pages/FloatingCranePage/FloatingCranePage";
import OrderPage from "./components/Pages/OrderPage/OrderPage";
import Footer from "./components/layout/Footer/Footer";

type Props = {};

export default function App({}: Props) {
  const [data, setData] = useState(0);

  return (
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
  );
}
