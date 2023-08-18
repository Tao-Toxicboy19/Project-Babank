import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../../api/api";
import { Floating } from "../../../../types/FloatingCrane.type";
import Swal from "sweetalert2";
import { Alert } from "@mui/material";

type Props = {};

export default function AddFloatingCranePage({}: Props) {
  const [showErrorAlert, setShowErrorAlert] = useState(false); // เพิ่ม state เพื่อแสดง Alert

  const navigate = useNavigate();
  const [formData, setFormData] = useState<Floating>({
    id: 0,
    name: "",
    description: "",
    latitude: 0,
    longitude: 0,
    setuptime: "",
    speed: 0,
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (
      !formData.name ||
      !formData.description ||
      formData.latitude === 0 ||
      formData.longitude === 0 ||
      !formData.setuptime ||
      formData.speed === 0
    ) {
      setShowErrorAlert(true);
      return;
    }

    try {
      await api
        .post("/location", formData)
        .then(() => {
          let timerInterval: any;
          Swal.fire({
            title: "Auto close alert!",
            html: "I will close in <b></b> milliseconds.",
            timer: 400,
            timerProgressBar: true,
            willClose: () => {
              clearInterval(timerInterval);
            },
          }).then((result) => {
            /* Read more about handling dismissals below */
            if (result.dismiss === Swal.DismissReason.timer) {
              navigate("/floating crane");
            }
          });
        })
        .catch((err) => {
          console.log(`ส้นตีน ${err}`);
        });
    } catch (error) {
      console.error("Error sending data:", error);
    }
  };

  return (
    <div>
      <h1>Add Floating Crane Location</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Description:</label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Latitude:</label>
          <input
            type="number"
            name="latitude"
            value={formData.latitude}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Longitude:</label>
          <input
            type="number"
            name="longitude"
            value={formData.longitude}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Setup Time:</label>
          <input
            type="text"
            name="setuptime"
            value={formData.setuptime}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Speed:</label>
          <input
            type="number"
            name="speed"
            value={formData.speed}
            onChange={handleInputChange}
          />
        </div>
        {showErrorAlert && (
          <Alert variant="outlined" severity="error">
            กรอกให้ครบ
          </Alert>
        )}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
