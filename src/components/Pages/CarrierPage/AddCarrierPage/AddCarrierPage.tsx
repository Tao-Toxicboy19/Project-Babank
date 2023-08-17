import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

type Props = {};

export default function CarrierPage({}: Props) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    id: 0,
    name: "",
    maxcapacity: 0,
    power: "",
    burden: 0,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    axios
      .post("http://localhost:8080/api/addCarrier", formData)
      .then((response) => {
        console.log("Carrier added successfully:", response.data);
        // Reset the form data
        setFormData({
          id: 0,
          name: "",
          maxcapacity: 0,
          power: "",
          burden: 0,
        });
        navigate("/carrier");
      })
      .catch((error) => {
        console.error("Error adding carrier:", error);
      });
  };

  return (
    <div>
      <h1>Add Carrier</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Max Capacity:
          <input
            type="number"
            name="maxcapacity"
            value={formData.maxcapacity}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Power:
          <input
            type="text"
            name="power"
            value={formData.power}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Burden:
          <input
            type="number"
            name="burden"
            value={formData.burden}
            onChange={handleChange}
          />
        </label>
        <br />
        <button type="submit">Add Carrier</button>
      </form>
    </div>
  );
}
