import axios from "axios";
import { useEffect, useState } from "react";
import { AiFillHome } from "react-icons/ai";
import { FaTractor, FaRoute } from "react-icons/fa";
import { PiPlantFill } from "react-icons/pi";
import { RiContactsBookFill } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";

type Props = {};

export default function HomePage({}: Props) {
  const [name, setName] = useState("");
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios
      .get("http://localhost:5173")
      .then((res) => {
        if (res.data.valid) {
          setName(res.data.username);
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
          <h1>Floating Crane Scheduling........</h1>
        </div>
        <div className="container flex flex-col items-center md:flex-row md:justify-center gap-4">
          <Link to={"/floating-crane"} className="btn-link">
            <button className="btn btn-outline btn-info">
              <PiPlantFill />
              Floating crane
            </button>
          </Link>
          <Link to={"/carrier"} className="btn-link">
            <button className="btn btn-outline btn-info">
              <FaTractor />
              Carrier
            </button>
          </Link>
          <Link to={"/cargo"} className="btn-link">
            <button className="btn btn-outline btn-info">
              <FaRoute />
              Cargo
            </button>
          </Link>
          <Link to={"/order"} className="btn-link">
            <button className="btn btn-outline btn-info">
              <RiContactsBookFill />
              Order
            </button>
          </Link>
          <Link to={"/contact"} className="btn-link">
            <button className="btn btn-outline btn-info">
              <RiContactsBookFill />
              Contact
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}
