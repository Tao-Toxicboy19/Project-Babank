import React, { useState } from "react";
import axios from "axios";
import TextField from "@mui/material/TextField";
import { Event } from "../../../../types/Event.type";
import { Floating } from "../../../../types/FloatingCrane.type";

type Props = {};

export default function AddFloatingCranePage({}: Props) {
  const [floatingCrane, setFloatingCrane] = useState<Floating>({
    id: 0,
    name: "",
    description: "",
    latitude: 0,
    longitude: 0,
    setuptime: "",
    speed: 0,
  });

  const handleChange = (e: Event) => {
    const { name, value } = e.target;
    setFloatingCrane((prevData: any) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8080/api/addLocation",
        floatingCrane
      );
      console.log(response.data);

      // Clear form after successful submission
      setFloatingCrane({
        id: 0,
        name: "",
        description: "",
        latitude: 0,
        longitude: 0,
        setuptime: "",
        speed: 0,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="flex justify-end">
        <button
          className="btn btn-outline border-2 mb-3 "
          onClick={() => (window as any).my_modal_1.showModal()}
        >
          Add Data
        </button>
      </div>
      <dialog id="my_modal_1" className="modal">
        <form className="modal-box w-11/12 max-w-5xl" onSubmit={handleSubmit}>
          <h3 className="font-bold text-lg">Add Data</h3>
          <div className="grid grid-cols-3 gap-x-3 gap-y-4">
            <TextField
              id="outlined-basic"
              label="Name"
              variant="outlined"
              type="text"
              name="name"
              value={data.name}
              onChange={(e) =>
                setData((prevData) => ({ ...prevData, name: e.target.value }))
              }
            />
            <TextField
              id="outlined-basic"
              label="Description"
              variant="outlined"
              type="text"
              name="description"
              value={data.description}
              onChange={(e) =>
                setData((prevData) => ({
                  ...prevData,
                  description: e.target.value,
                }))
              }
            />
            <TextField
              id="outlined-basic"
              label="Latitude"
              variant="outlined"
              type="number"
              name="latitude"
            value={data.latitude}
            onChange={(e) =>
              setData((prevData) => ({
                ...prevData,
                latitude: parseFloat(e.target.value),
              }))
            }
            />
            <TextField
              id="outlined-basic"
              label="Longitude"
              variant="outlined"
              type="number"
              name="longitude"
            value={data.longitude}
            onChange={(e) =>
              setData((prevData) => ({
                ...prevData,
                longitude: parseFloat(e.target.value),
              }))
            }
            />
            <TextField
              id="outlined-basic"
              label="Setup Time"
              variant="outlined"
              type="number"
              name="setuptime"
            value={data.setuptime}
            onChange={(e) =>
              setData((prevData) => ({
                ...prevData,
                setuptime: e.target.value,
              }))
            }
            />
            <TextField
              id="outlined-basic"
              label="Speed"
              variant="outlined"
              type="number"
              name="speed"
            value={data.speed}
            onChange={(e) =>
              setData((prevData) => ({
                ...prevData,
                speed: parseFloat(e.target.value),
              }))
            }
            />
          </div>
          <div className="modal-action">
            <button type="submit" className="btn">
              Add Floating Crane
            </button>
            <button
              type="button"
              className="btn"
              onClick={() => (window as any).my_modal_1.close()}
            >
              Close
            </button>
          </div>
        </form>
      </dialog>
    </>
  );
}
