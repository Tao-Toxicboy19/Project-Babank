import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Floating } from "../../../../types/FloatingCrane.type";
import { useState } from "react";
import api from "../../../../api/api";
import {
  Alert,
  FormControl,
  FormHelperText,
  InputAdornment,
  OutlinedInput,
  TextField,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../store/store";
import { addFloating } from "../../../../store/slices/FloatingSlice";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "60%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export default function ModalPopup() {
  const [open, setOpen] = React.useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const [formData, setFormData] = useState<Floating>({
    floating_id: "",
    floating_name: "",
    description: "",
    latitude: 0,
    longitude: 0,
    setuptime: 0,
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
      !formData.floating_name ||
      !formData.description ||
      formData.latitude === 0 ||
      formData.longitude === 0 ||
      formData.setuptime === 0 ||
      formData.speed === 0
    ) {
      setShowErrorAlert(true);
      return;
    }

    try {
      await api
        .post("/floating", formData)
        .then(() => {
          dispatch(addFloating(formData));
          setOpen(false);
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.error("Error sending data:", error);
    }
  };

  return (
    <div>
      <Button onClick={() => setOpen(true)}>Insert Crane</Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Floating crane
          </Typography>
          <form onSubmit={handleSubmit}>
            <Box className="grid grid-cols-2 gap-5">
              <TextField
                id="outlined-basic"
                label="Floating Name:"
                variant="outlined"
                type="text"
                name="floating_name"
                value={formData.floating_name}
                onChange={handleInputChange}
              />
              <TextField
                id="outlined-basic"
                label="Description:"
                variant="outlined"
                type="text"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
              />
              <FormControl variant="outlined">
                <FormHelperText id="outlined-weight-helper-text">
                  Latitude:
                </FormHelperText>
                <OutlinedInput
                  id="outlined-adornment-weight2"
                  type="number"
                  name="latitude"
                  value={formData.latitude === 0 ? "" : formData.latitude}
                  onChange={handleInputChange}
                  endAdornment={
                    <InputAdornment position="end">Lat</InputAdornment>
                  }
                />
              </FormControl>
              <FormControl variant="outlined">
                <FormHelperText id="outlined-weight-helper-text">
                  Longitude:
                </FormHelperText>
                <OutlinedInput
                  id="outlined-adornment-weight2"
                  type="number"
                  name="longitude"
                  value={formData.longitude === 0 ? "" : formData.longitude}
                  onChange={handleInputChange}
                  endAdornment={
                    <InputAdornment position="end">Long</InputAdornment>
                  }
                />
              </FormControl>
              <FormControl variant="outlined">
                <FormHelperText id="outlined-weight-helper-text">
                  Setup time:
                </FormHelperText>
                <OutlinedInput
                  id="outlined-adornment-weight2"
                  type="number"
                  name="setuptime"
                  value={formData.setuptime === 0 ? "" : formData.setuptime}
                  onChange={handleInputChange}
                  endAdornment={
                    <InputAdornment position="end">ST</InputAdornment>
                  }
                />
              </FormControl>
              <FormControl variant="outlined">
                <FormHelperText id="outlined-weight-helper-text">
                  Speed:
                </FormHelperText>
                <OutlinedInput
                  id="outlined-adornment-weight2"
                  type="number"
                  name="speed"
                  value={formData.speed === 0 ? "" : formData.speed}
                  onChange={handleInputChange}
                  endAdornment={
                    <InputAdornment position="end">SP</InputAdornment>
                  }
                />
              </FormControl>
            </Box>
            <Box className="my-3">
              {showErrorAlert && (
                <Alert variant="outlined" severity="error">
                  กรุณากรอกให้ครบ
                </Alert>
              )}
            </Box>
            <Box className="flex justify-center mt-2">
              <Button
                type="submit"
                className="bg-[#439947]"
                variant="contained"
                color="success"
              >
                Success
              </Button>
            </Box>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
