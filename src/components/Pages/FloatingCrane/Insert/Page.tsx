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
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../store/store";
import { btnColor, style } from "../../../../style/Styles";
import { setInsertFloating } from "../../../../store/slices/floatingSlice";
import AddIcon from '@mui/icons-material/Add';
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from '@mui/icons-material/Save';

export default function ModalPopup() {
  const [open, setOpen] = React.useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const loading = useSelector((state: RootState) => state.floating.loading)
  const dispatch = useDispatch<AppDispatch>();
  const [floating_crane, setFloating_crane] = useState<Floating>({
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
    setFloating_crane((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (
      !floating_crane.floating_name ||
      !floating_crane.description ||
      floating_crane.latitude === 0 ||
      floating_crane.longitude === 0 ||
      floating_crane.setuptime === 0 ||
      floating_crane.speed === 0
    ) {
      setShowErrorAlert(true);
      return;
    }

    try {
      await api
        .post("/floating_crane", floating_crane)
        .then(() => {
          dispatch(setInsertFloating(floating_crane));
          setOpen(false);
          setFloating_crane({
            floating_id: "",
            floating_name: "",
            description: "",
            latitude: 0,
            longitude: 0,
            setuptime: 0,
            speed: 0,
          });
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.error("Error sending data:", error);
    }
  };

  const FormInsert = () => (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <TextField
        id="outlined-basic"
        label="Floating Name:"
        variant="outlined"
        type="text"
        name="floating_name"
        value={floating_crane.floating_name}
        onChange={handleInputChange}
      />
      <TextField
        id="outlined-basic"
        label="Description:"
        variant="outlined"
        type="text"
        name="description"
        value={floating_crane.description}
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
          value={floating_crane.latitude === 0 ? "" : floating_crane.latitude}
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
          value={floating_crane.longitude === 0 ? "" : floating_crane.longitude}
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
          value={floating_crane.setuptime === 0 ? "" : floating_crane.setuptime}
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
          value={floating_crane.speed === 0 ? "" : floating_crane.speed}
          onChange={handleInputChange}
          endAdornment={
            <InputAdornment position="end">SP</InputAdornment>
          }
        />
      </FormControl>
      <Box>
        {showErrorAlert && (
          <Alert variant="outlined" severity="error">
            กรุณากรอกให้ครบ!!
          </Alert>
        )}
      </Box>
      <Box className="flex justify-start gap-x-5">
        <Button
          variant="outlined"
          onClick={() => setOpen(false)}
        >
          Exit
        </Button>
        <LoadingButton
          type="submit"
          loading={loading}
          loadingPosition="start"
          startIcon={<SaveIcon />}
          variant="contained"
          style={btnColor}
        >
          Success
        </LoadingButton>
      </Box>
    </form>
  )

  return (
    <div>
      <Button onClick={() => setOpen(true)}><AddIcon className="mx-2" />Insert Crane</Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ marginBottom: 3 }}>
            Floating crane
          </Typography>
          {FormInsert()}
        </Box>
      </Modal>
    </div>
  );
}
