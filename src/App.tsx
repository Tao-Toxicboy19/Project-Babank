import Header from "./components/layout/Header/Header";
import { Navigate, Route, Routes } from "react-router-dom";
import Footer from "./components/layout/Footer/Footer";
import HomePage from "./components/Pages/Home/Page";
import FloatingCranePage from "./components/Pages/FloatingCrane/Page";
import CarrierPage from "./components/Pages/Carrier/Page";
import RegisterPage from "./components/Pages/Register/Page";
import { useEffect } from "react";
import api from "./api/api";
import { useDispatch } from "react-redux";
import { setCargoSuccess } from "./store/slices/cargoSlice";
import CargocranePage from "./components/Pages/Cargocrane/Page";
import OrderPage from "./components/Pages/Order/Page";
import LoginPage from "./components/Pages/Login/Page";
import CargoPage from "./components/Pages/Cargo/Page";
import { setFloatingSuccess } from "./store/slices/floatingSlice.bak";
import { setCarrierSuccess } from "./store/slices/carrierSlice";
import { setCargoCraneSuccess } from "./store/slices/cargocraneSlice";
import { setOrderSuccess } from "./store/slices/OrderSlice";
import MovingTablePage from "./components/Pages/Summarize/movingTable";
import { floating } from "./store/slices/floatingSlice";
import axios from "axios";

export default function App() {
  const dispatch = useDispatch<any>();

  useEffect(() => {
    dispatch(floating())
    // api.get("/cargo").then((res) => dispatch(setCargoSuccess(res.data)))
    // // api.get("/floating_crane").then((res) => dispatch(setFloatingSuccess(res.data)))
    // api.get("/cargo_crane").then((res) => dispatch(setCargoCraneSuccess(res.data)))
    // api.get("/carrier").then((res) => dispatch(setCarrierSuccess(res.data)))
    // api.get("/orders").then((res) => dispatch(setOrderSuccess(res.data)))
  }, []);

  return (
    <>
      <div className="bg-[#DCE2EB] flex flex-col min-h-screen">
        <Header />
        <div className="container mx-auto flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/Floating Transfer" element={<FloatingCranePage />} />
            <Route path="/carrier" element={<CarrierPage />} />
            <Route path="/cargo" element={<CargoPage />} />
            <Route path="/Order" element={<OrderPage />} />
            <Route path="/cargo crane" element={<CargocranePage />} />
            <Route path="/summarize" element={< MovingTablePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </>
  );
}


// const [loading, setLoading] = useState(true); // เพิ่ม state สำหรับตัวแปร loading
// const [error, setError] = useState<string | null>(null); // เพิ่ม state สำหรับตัวแปร error
// useEffect(() => {
//   // ใช้ setTimeout เพื่อจำลองการโหลด
//   const loadingTimeout = setTimeout(() => {
//     setLoading(false); // เมื่อโหลดเสร็จสิ้น
//   }, 3500); // หน่วงเวลาในการโหลดเป็น 1.5 วินาที

//   // คืนค่าฟังก์ชันเพื่อทำความสะอาดเมื่อคอมโพเนนต์ถูกยกเลิก
//   return () => {
//     clearTimeout(loadingTimeout);
//   };
// }, []);


// แปลงเวลา

// import React, { useEffect, useState } from 'react';

// function App() {
//   const [isoDateTime, setIsoDateTime] = useState("2023-09-08T13:36:26.000Z");
//   const [localDateTime, setLocalDateTime] = useState("");

//   useEffect(() => {
//     const date = new Date(isoDateTime);
//     const localTime = date.toLocaleString();

//     setLocalDateTime(localTime);
//   }, [isoDateTime]);

//   return (
//     <div>
//       <p>ISO DateTime: {isoDateTime}</p>
//       <p>Local DateTime: {localDateTime}</p>
//     </div>
//   );
// }

// export default App;

