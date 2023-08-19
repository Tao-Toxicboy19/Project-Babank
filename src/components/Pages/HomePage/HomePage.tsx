import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUserEmail } from "../../../store/slices/authSlice";
import { RootState } from "../../../store/store";

type Props = {};

export default function HomePage({}: Props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userEmail = useSelector((state: RootState) => state.auth.userEmail); // ดึง userEmail จาก Redux state
  
  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios
      .get("http://localhost:7070/api")
      .then((res) => {
        if (res.data.valid) {
          dispatch(setUserEmail(res.data.email));
        } else {
          navigate("/login");
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <div>
        <div className="container flex text-center justify-center text-xl m-4 text-black">
          <h1>Floating Crane Scheduling........{userEmail}</h1>
        </div>
      </div>
    </>
  );
}
