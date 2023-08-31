import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { carrier } from "../../../../types/Carrier.type";
import api from "../../../../api/api";
import {
  Alert,
  FormControl,
  FormHelperText,
  InputAdornment,
  OutlinedInput,
  TextField,
} from "@mui/material";
import { addCarrier } from "../../../../store/slices/carrierSlice";
import { style } from "../../../../style/Styles";

export default function ModalPopup() {
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const [carrier, setCarrier] = useState<carrier>({
    carrier_id: "",
    carrier_name: "",
    maxcapacity: 0,
    ower: "",
    burden: 0,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setCarrier((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (
      !carrier.carrier_name ||
      !carrier.ower ||
      carrier.burden === 0 ||
      carrier.maxcapacity === 0
    ) {
      setShowErrorAlert(true);
      return;
    }

    api
      .post("/carrier", carrier)
      .then(() => {
        dispatch(addCarrier(carrier));
        setCarrier({
          carrier_id: "",
          carrier_name: "",
          maxcapacity: 0,
          ower: "",
          burden: 0,
        });
        setOpen(false);
      })
      .catch((error) => {
        console.error("Error adding carrier:", error);
      });
  };

  return (
    <div>
      <Button onClick={() => setOpen(true)}>Insert Carrier</Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Carrier
          </Typography>
          <form onSubmit={handleSubmit}>
            <Box className="grid grid-cols-2 gap-5 my-3">
              <TextField
                id="outlined-basic"
                label="Carrier name"
                variant="outlined"
                type="text"
                name="carrier_name"
                value={carrier.carrier_name}
                onChange={handleChange}
              />
              <TextField
                id="outlined-basic"
                label="Ower"
                variant="outlined"
                type="text"
                name="ower"
                value={carrier.ower}
                onChange={handleChange}
              />
              <FormControl variant="outlined">
                <FormHelperText id="outlined-weight-helper-text">
                  Max capacity:
                </FormHelperText>
                <OutlinedInput
                  id="outlined-adornment-weight2"
                  type="number"
                  name="burden"
                  value={carrier.burden === 0 ? "" : carrier.burden}
                  onChange={handleChange}
                  endAdornment={
                    <InputAdornment position="end">Max cap</InputAdornment>
                  }
                />
              </FormControl>
              <FormControl variant="outlined">
                <FormHelperText id="outlined-weight-helper-text">
                  Burden:
                </FormHelperText>
                <OutlinedInput
                  id="outlined-adornment-weight2"
                  type="number"
                  name="maxcapacity"
                  value={carrier.maxcapacity === 0 ? "" : carrier.maxcapacity}
                  onChange={handleChange}
                  endAdornment={
                    <InputAdornment position="end">Bur</InputAdornment>
                  }
                />
              </FormControl>
            </Box>
            <Box className="my-3">
              {showErrorAlert && (
                <Alert variant="outlined" severity="error">
                  กรุณากรอกให้ครบ!!
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
