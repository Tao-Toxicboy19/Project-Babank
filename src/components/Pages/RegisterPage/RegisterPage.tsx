import { useState, FormEvent } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { TextField } from "@mui/material";
import { Event } from "../../../types/Event.type";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmpassword: "",
  });
  const navigate = useNavigate();

  const handleChange = (event: Event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8080/api/register",
        formData
      );
      navigate("/login");
      console.log(response.data);
      // Handle successful registration here, e.g. show a success message or navigate to another page
    } catch (error) {
      console.error("Error registering:", error);
      // Handle registration error here, e.g. show an error message
    }
  };

  return (
    <div className="bg-[#fff]">
      <div className="w-full h-20"></div>
      <div className="flex justify-center my-5">
        <form
          className="flex flex-col gap-y-3 border-solid border-[1px] drop-shadow-xl px-5 pb-5"
          onSubmit={handleSubmit}
        >
          <label className="flex justify-center font-medium text-[4vh] my-3">
            Register
          </label>
          <div className="flex gap-3">
            <TextField
              id="outlined-basic"
              label="First Name"
              variant="outlined"
              name="firstname"
              type="text"
              value={formData.firstname}
              onChange={handleChange}
            />
            <TextField
              id="outlined-basic"
              label="Last Name"
              variant="outlined"
              name="lastname"
              type="text"
              value={formData.lastname}
              onChange={handleChange}
            />
          </div>
          <TextField
            id="outlined-basic"
            label="Email"
            variant="outlined"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
          />
          <TextField
            id="outlined-basic"
            label="Password"
            variant="outlined"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
          />
          <TextField
            id="outlined-basic"
            label="Confirm Password"
            variant="outlined"
            name="confirmpassword"
            type="password"
            value={formData.confirmpassword}
            onChange={handleChange}
          />
          <div className="flex">
            <div className="flex items-center h-5">
              <input
                type="checkbox"
                className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
              />
            </div>
            <div className="ml-3 text-sm">
              <label className="font-light text-gray-500 dark:text-gray-300">
                I accept the{" "}
                <a
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  href="#"
                >
                  Terms and Conditions
                </a>
              </label>
            </div>
          </div>
          <button className="btn btn-primary my-3" type="submit">
            Register
          </button>
          <p className="text-sm font-light text-gray-500">
            Already have an account?{" "}
            <Link
              to={"/login"}
              className="font-medium text-primary-600 hover:underline dark:text-primary-500"
            >
              Login here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
