import React, { useState } from "react";
import { Link, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./components/Pages/LoginPage/LoginPage";
import RegisterPage from "./components/Pages/RegisterPage/RegisterPage";
import PlotdataPage from "./components/Pages/PlotdataPage/PlotdataPage";
import MachinePage from "./components/Pages/MachinePage/MachinePage";
import MachineMovementPage from "./components/Pages/MachineMovementPage/MachineMovementPage";
import ContactPage from "./components/Pages/ContactPage/ContactPage";
import HomePage from "./components/Pages/HomePage/HomePage";
import Header from "./components/layout/Header/Header";

type Props = {};

export default function App({}: Props) {
  const [data, setData] = useState(0);

  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/plotdata" element={<PlotdataPage />} />
        <Route path="/machineinformation" element={<MachinePage />} />
        <Route path="/machinemovement" element={<MachineMovementPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </div>
  );
}
