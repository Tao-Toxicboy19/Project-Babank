import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../store/store";
import api from "../../../../api/api";
import {
  addCargoCrane,
  setCargoCrane,
} from "../../../../store/slices/cargocraneSlice";
import Dropdown from "./Dropdown";
import { CargoCrane } from "../../../../types/CargoCrane.type";

type Props = {};

export default function AddCargoCranePage({}: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const [formData, setFormData] = useState<any>({
    cargo_name: "",
    floating_name: "",
    floating_id: "",
    cargo_id: "",
    consumption_rate: 0,
    work_rate: 0,
    category: "",
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await api.get("/cargocranes");
      dispatch(setCargoCrane(response.data.cargocranes));
      console.log(response.data.cargocranes);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await api.post("/cargocrane", formData);
      dispatch(addCargoCrane(formData));
      console.log("Data posted:", response.data);
      // Clear the form after successful submission
      setFormData({
        cargo_name: "",
        floating_name: "",
        floating_id: "",
        cargo_id: "",
        consumption_rate: 0,
        work_rate: 0,
        category: "",
      });
    } catch (error) {
      console.error("Error posting data:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="w-24 mx-10">
          <Dropdown />
        </div>
        <label>
          cargo_id
          <input
            type="text"
            name="cargo_id"
            value={formData.cargo_id}
            onChange={handleChange}
          />
        </label>
        <label>
          floating_id
          <input
            type="text"
            name="floating_id"
            value={formData.floating_id}
            onChange={handleChange}
          />
        </label>
        <label>
          consumption_rate
          <input
            type="text"
            name="consumption_rate"
            value={formData.consumption_rate}
            onChange={handleChange}
          />
        </label>
        <label>
          work_rate
          <input
            type="text"
            name="work_rate"
            value={formData.work_rate}
            onChange={handleChange}
          />
        </label>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
