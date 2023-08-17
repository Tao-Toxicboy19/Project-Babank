import { Box, TextField } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../../../api/api";

type Props = {};

interface LocationData {
  id: number;
  name: string;
  description: string;
  latitude: number;
  longitude: number;
  setuptime: string;
  speed: number;
}

export default function EditFloatingCranePage({}: Props) {
  const { id } = useParams<{ id: string }>();

  const [locationData, setLocationData] = useState<LocationData>({
    id: 0,
    name: "",
    description: "",
    latitude: 0,
    longitude: 0,
    setuptime: "",
    speed: 0,
  });

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/singlelocation/${id}`)
      .then((res) => {
        setLocationData(res.data.result[0]);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const { name, value } = event.target;
    setLocationData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    api
      .put(`/location/${id}`, locationData)
      .then(() => {
        alert("Update successful");
      })
      .catch((err) => console.log("Error updating data:", err));
  };

  return (
    <>
      <Box>
        <TextField id="standard-basic" label="Standard" variant="standard" />
      </Box>
      <div>
        <h1>Edit Location</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={locationData.name}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Description:</label>
            <input
              type="text"
              name="description"
              value={locationData.description}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>latitude:</label>
            <input
              type="text"
              name="latitude"
              value={locationData.latitude}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>longitude:</label>
            <input
              type="text"
              name="longitude"
              value={locationData.longitude}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>setuptime:</label>
            <input
              type="text"
              name="setuptime"
              value={locationData.setuptime}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>speed:</label>
            <input
              type="text"
              name="speed"
              value={locationData.speed}
              onChange={handleInputChange}
            />
          </div>
          <button type="submit">Update</button>
        </form>
      </div>
    </>
  );
}
