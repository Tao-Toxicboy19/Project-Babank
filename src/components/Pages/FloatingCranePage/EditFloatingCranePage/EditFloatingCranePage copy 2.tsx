import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, TextField } from "@mui/material";
import { useDispatch } from "react-redux"; // เพิ่มนี้
import api from "../../../../api/api";
import { updateFloating } from "../../../../store/slices/locationSlice";

type Props = {};

export default function EditFloatingCranePage({}: Props) {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch(); // เพิ่มนี้

  const [formData, setFormData] = useState({
    id: "",
    name: "",
    description: "",
    latitude: "",
    longitude: "",
    setuptime: "",
    speed: "",
  });

  const handleUpdate = () => {
    const updatedData = {
      ...formData,
      // สามารถแก้ไขข้อมูลเพิ่มเติมใน Object นี้ได้ตามความเหมาะสม
    };

    api
      .put(`updatelocation/${id}`, updatedData)
      .then((response) => {
        console.log("Data updated successfully:", response.data);
        dispatch(updateFloating({ id, ...updatedData }));
        navigate("/floating crane");
      })
      .catch((error) => {
        console.error("Error updating data:", error);
      });
  };

  return (
    <div>
      <h1>EditFloatingCranePage</h1>
      <TextField
        label="Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      />
      <TextField
        label="Description"
        value={formData.description}
        onChange={(e) =>
          setFormData({ ...formData, description: e.target.value })
        }
      />
      <TextField
        label="latitude"
        value={formData.latitude}
        onChange={(e) =>
          setFormData({ ...formData, description: e.target.value })
        }
      />
      <TextField
        label="longitude"
        value={formData.longitude}
        onChange={(e) =>
          setFormData({ ...formData, description: e.target.value })
        }
      />
      <TextField
        label="setuptime"
        value={formData.setuptime}
        onChange={(e) =>
          setFormData({ ...formData, description: e.target.value })
        }
      />
      <TextField
        label="speed"
        value={formData.speed}
        onChange={(e) =>
          setFormData({ ...formData, description: e.target.value })
        }
      />
      <Button variant="contained" onClick={handleUpdate}>
        Update
      </Button>
    </div>
  );
}
