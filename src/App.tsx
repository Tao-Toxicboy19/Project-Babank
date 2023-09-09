import Header from "./components/layout/Header/Header";
import { Navigate, Route, Routes } from "react-router-dom";
import Footer from "./components/layout/Footer/Footer";
import HomePage from "./components/Pages/Home/Page";
import FloatingPage from "./components/Pages/FloatingCrane/FloatingPage";
import CarrierPage from "./components/Pages/Carrier/Page";
import RegisterPage from "./components/Pages/Register/Page";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import CargocranePage from "./components/Pages/Cargocrane/Page";
import OrderPage from "./components/Pages/Order/Page";
import LoginPage from "./components/Pages/Login/Page";
import CargoPage from "./components/Pages/Cargo/Page";
import MovingTablePage from "./components/Pages/Summarize/movingTable";
import { floating } from "./store/slices/floating.slice";

export default function App() {
  const dispatch = useDispatch<any>();

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(floating()); // เรียก action ใน useEffect ด้วย await
      // อื่น ๆ ที่คุณต้องการทำหลังจากการโหลดข้อมูลเสร็จ
    };

    fetchData();
  }, [dispatch]);

  return (
    <>
      <div className="bg-[#DCE2EB] flex flex-col min-h-screen">
        <Header />
        <div className="container mx-auto flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/Floating Transfer" element={<FloatingPage />} />
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

