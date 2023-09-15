import Header from "./components/layout/Header/Header";
import { Navigate, Route, Routes } from "react-router-dom";
import Footer from "./components/layout/Footer/Footer";
import HomePage from "./components/Pages/Home/Page";
import FloatingPage from "./components/Pages/FloatingCrane/FloatingPage";
import CarrierPage from "./components/Pages/Carrier/CarrierPage";
import RegisterPage from "./components/Pages/LoginPage/Register/RegisterPage";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CargocranePage from "./components/Pages/Cargocrane/CargoCranePage";
import OrderPage from "./components/Pages/Order/OrderPage";
import LoginPage from "./components/Pages/LoginPage/LoginPage";
import CargoPage from "./components/Pages/Cargo/CargoPage";
import MovingTablePage from "./components/Pages/Summarize/movingTable";
import { floating } from "./store/slices/floating.slice";
import { loadCarrier } from "./store/slices/carrier.slice";
import { loadCargo } from "./store/slices/cargo.slice";
import { loadCargoCrane } from "./store/slices/cargocrane.slice";
import { loadOrder } from "./store/slices/order.slice";
import PrivateRoute from "./utlis/PrivateRoute";
import { TOKEN } from "./Constants";
import { restoreLogin } from "./store/slices/login.slice";
import { RootState } from "./store/store";
import PublicRoute from "./utlis/PublicRoute";


export default function App() {
  const dispatch = useDispatch<any>();
  const loginReducer = useSelector((state: RootState) => state.login.data);

  useEffect(() => {
    dispatch(restoreLogin())
  }, []);

  const Token = localStorage.getItem(TOKEN);
  if (Token) {
    console.log(Token)
  } else {
    // กรณีที่ไม่มีโทเค็นใน localStorage
    console.log('ไม่มีโทเค็น');
  }



  useEffect(() => {
    const fetchData = async () => {
      await dispatch(floating());
      await dispatch(loadCarrier())
      await dispatch(loadCargo())
      await dispatch(loadCargoCrane())
      await dispatch(loadOrder())
    };

    fetchData();
  }, [dispatch]);



  return (
    <>
      <div className="bg-[#DCE2EB] flex flex-col min-h-screen" >
        {loginReducer && <Header />}
        <div className="container mx-auto flex-grow">
          <Routes>
            <Route element={<PrivateRoute token={Token} />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/cargo" element={<CargoPage />} />
              {/* <Route path="/" element={<Maps />} /> */}
              <Route path="/Floating Transfer" element={<FloatingPage />} />
              <Route path="/carrier" element={<CarrierPage />} />
              <Route path="/Order" element={<OrderPage />} />
              <Route path="/cargo crane" element={<CargocranePage />} />
              <Route path="/summarize" element={< MovingTablePage />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Route>
            <Route element={<PublicRoute token={Token} />}>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="*" element={<Navigate to="/login" />} />
            </Route>
          </Routes>
        </div>
        {loginReducer && <Footer />}
      </div >
    </>
  );
}


// AIzaSyDGi7e4tZrKmr7svv78ZdIKd6El2uyDBdg

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

