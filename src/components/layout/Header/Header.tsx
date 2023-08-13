import { Link } from "react-router-dom";
import { AiFillHome, AiOutlineForm } from "react-icons/ai";
import { PiPlantFill } from "react-icons/pi";
import { FiLogIn } from "react-icons/fi";
import { FaTractor, FaRoute } from "react-icons/fa";
import { RiContactsBookFill } from "react-icons/ri";

type Props = {};

export default function Header({}: Props) {
  return (
    <div>
      <div className="navbar bg-[#fff] fixed z-50 opacity-95 border-b">
        <div className="navbar-start">
          <div className="dropdown">
            <label
              htmlFor="my-drawer"
              tabIndex={0}
              className="btn btn-ghost lg:hidden"
            >
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
            <div className="drawer">
              <input id="my-drawer" type="checkbox" className="drawer-toggle" />
              <div className="drawer-side">
                <label htmlFor="my-drawer" className="drawer-overlay"></label>
                <ul className="menu p-4 w-60 h-full bg-base-200 text-base-content">
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
            </div>
          </div>

          <Link to={"/"}>
            <a className="btn btn-ghost normal-case text-xl">Logo</a>
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 text-[#000]">
            <li>
              <Link to={"/"}>
                <AiFillHome />
                Home
              </Link>
            </li>
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
          <ul className="flex justify-center gap-x-5 mx-3 text-[#000]">
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
              <Link
                to={"/login"}
                className="flex flex-row items-center gap-x-2"
              >
                <FiLogIn />
                Login
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="w-full h-20"></div>
    </div>
  );
}
