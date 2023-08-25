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
import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { Floating } from "../../../../types/FloatingCrane.type";
import { Cargo } from "../../../../types/Cargo.type";

interface CargoType {
  cargo_crane_id: string;
  cargo_name: string;
  floating_name: string;
  floating_id: string;
  cargo_id: string;
  consumption_rate: number;
  work_rate: number;
  category: string;
}

interface Props {}

export default function AddCargoCranePage({}: Props): JSX.Element {
  const floatingData = useSelector((state: RootState) => state.floating.data);
  const cargo = useSelector((state: RootState) => state.cargo.cargo);
  const dispatch = useDispatch<AppDispatch>();
  const [formData, setFormData] = useState<CargoType>({
    cargo_crane_id: "",
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

  const handleFloatingChange = (selectedFloatingId: string) => {
    const selectedFloating = floatingData.find(
      (item) => item.floating_id === selectedFloatingId
    );
    if (selectedFloating) {
      setFormData((prevData) => ({
        ...prevData,
        floating_id: selectedFloating.floating_id,
        floating_name: selectedFloating.floating_name,
      }));
    }
  };

  const handleCargoChange = (selectedCargoId: string) => {
    const selectedCargo = cargo.find(
      (item) => item.cargo_id === selectedCargoId
    );
    if (selectedCargo) {
      setFormData((prevData) => ({
        ...prevData,
        cargo_id: selectedCargo.cargo_id,
        cargo_name: selectedCargo.cargo_name,
      }));
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
      const response = await api.post("/cargocrane", {
        ...formData,
      });
      dispatch(addCargoCrane(formData));
      console.log("Data posted:", response.data);
      // Clear the form after successful submission
      setFormData({
        cargo_crane_id: "",
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
        <div className="w-24 mx-10"></div>
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="floating-select-label">Crane</InputLabel>
            <Select
              labelId="floating-select-label"
              id="floating-select"
              value={formData.floating_id}
              label="Select a Floating"
              onChange={(e) => handleFloatingChange(e.target.value as string)}
            >
              {floatingData.map((item: Floating) => (
                <MenuItem key={item.floating_id} value={item.floating_id}>
                  {item.floating_name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="cargo-select-label">Cargo</InputLabel>
            <Select
              labelId="cargo-select-label"
              id="cargo-select"
              value={formData.cargo_id}
              label="Select a Cargo"
              onChange={(e) => handleCargoChange(e.target.value as string)}
            >
              {cargo.map((item: Cargo) => (
                <MenuItem key={item.cargo_id} value={item.cargo_id}>
                  {item.cargo_name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
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
