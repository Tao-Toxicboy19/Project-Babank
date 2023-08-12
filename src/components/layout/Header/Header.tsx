import { Link } from "react-router-dom";
import { AiFillHome, AiOutlineForm } from "react-icons/ai";
import { PiPlantFill } from "react-icons/pi";
import { FiLogIn } from "react-icons/fi";
import { FaTractor, FaRoute } from "react-icons/fa";
import { RiContactsBookFill } from "react-icons/ri";

type Props = {};

export default function Header({}: Props) {
  return (
    <div className="navbar bg-[#384C62]  border-b border-sky-500">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow rounded-box w-52 text-fuchsia-50"
          >
            <li>
              <Link to={"/"} className="text-fuchsia-50">
                <AiFillHome />
                หน้าแรก
              </Link>
            </li>
            <li>
              <Link to={"/plotdata"}>
                <PiPlantFill />
                ข้อมูลแปลง
              </Link>
            </li>
            <li>
              <Link className="" to={"/machineinformation"}>
                <FaTractor />
                ข้อมูลเครื่องจักร
              </Link>
            </li>
            <li>
              <Link to={"/machinemovement"}>
                <FaRoute />
                เส้นทางการเคลื่อนย้ายของเครื่องจัก
              </Link>
            </li>
            <li>
              <Link to={"/contact"}>
                <RiContactsBookFill />
                ติอต่อเรา
              </Link>
            </li>
          </ul>
        </div>
        <a className="btn btn-ghost normal-case text-xl">Logo</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 text-[#fff]">
          <li>
            <Link to={"/"}>
              <AiFillHome />
              Home
            </Link>
          </li>
          <li>
            <Link to={"/floating-crane"}>
              <PiPlantFill />
              Floating crane
            </Link>
          </li>
          <li>
            <Link className="" to={"/carrier"}>
              <FaTractor />
              Carrier
            </Link>
          </li>
          <li>
            <Link to={"/cargo"}>
              <FaRoute />
              Cargo
            </Link>
          </li>
          <li>
            <Link to={"/order"}>
              <RiContactsBookFill />
              Order
            </Link>
          </li>
          <li>
            <Link to={"/contact"}>
              <RiContactsBookFill />
              Contact
            </Link>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        <ul className="flex justify-center gap-x-5 mx-3 text-[#fff]">
          <li>
            <Link
              to={"/register"}
              className="flex flex-row items-center gap-x-2"
            >
              <AiOutlineForm />
              Regiset
            </Link>
          </li>
          <li>
            <Link to={"/login"} className="flex flex-row items-center gap-x-2">
              <FiLogIn />
              Login
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
