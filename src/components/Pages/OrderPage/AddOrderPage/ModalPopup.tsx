import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import { useState } from "react";
import { Order } from "../../../../types/Order.type";
import api from "../../../../api/api";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { Cargo } from "../../../../types/Cargo.type";
import { carrier } from "../../../../types/Carrier.type";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "60%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function ModalPopup() {
  const carrier = useSelector((state: RootState) => state.carrier.carrier);
  const cargo = useSelector((state: RootState) => state.cargo.cargo);
  const [open, setOpen] = React.useState(false);
  const [data, setData] = useState<Order>({
    order_id: "",
    carrier_name: "",
    carrier_id: "",
    cargo_name: "",
    cargo_id: "",
    load_status: 0,
    category: "",
    arrival_time: 0,
    deadline_time: 0,
    latitude: 0,
    longitude: 0,
  });

  const handleFloatingChange = (selectedCarrierId: string) => {
    const selectedCarrier = carrier.find(
      (item) => item.carrier_id === selectedCarrierId
    );
    if (selectedCarrier) {
      setData((prevData) => ({
        ...prevData,
        carrier_id: selectedCarrier.carrier_id,
        carrier_name: selectedCarrier.carrier_name,
      }));
    }
  };

  const handleCategoryChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setData((prevData) => ({
      ...prevData,
      category: event.target.value as string,
    }));
  };

  const handleCargoChange = (selectedCargoId: string) => {
    const selectedCargo = cargo.find(
      (item) => item.cargo_id === selectedCargoId
    );
    if (selectedCargo) {
      setData((prevData) => ({
        ...prevData,
        cargo_id: selectedCargo.cargo_id,
        cargo_name: selectedCargo.cargo_name,
      }));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await api.post("/order", data);
      setData({
        order_id: "",
        carrier_name: "",
        carrier_id: "",
        cargo_name: "",
        cargo_id: "",
        load_status: 0,
        category: "",
        arrival_time: 0,
        deadline_time: 0,
        latitude: 0,
        longitude: 0,
      });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <Button onClick={() => setOpen(true)}>Open modal</Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <form onSubmit={handleSubmit}>
            <Box>
              <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                  <InputLabel id="cargo-select-label">Cargo</InputLabel>
                  <Select
                    labelId="cargo-select-label"
                    id="cargo-select"
                    value={data.cargo_id}
                    label="Select a Cargo"
                    onChange={(e) =>
                      handleCargoChange(e.target.value as string)
                    }
                  >
                    {cargo.map((item: Cargo) => (
                      <MenuItem key={item.cargo_id} value={item.cargo_id}>
                        {item.cargo_name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
              <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                  <InputLabel id="floating-select-label">Carrier</InputLabel>
                  <Select
                    labelId="floating-select-label"
                    id="floating-select"
                    value={data.carrier_id}
                    label="Select a Floating"
                    onChange={(e) =>
                      handleFloatingChange(e.target.value as string)
                    }
                  >
                    {carrier.map((item: carrier) => (
                      <MenuItem key={item.carrier_id} value={item.carrier_id}>
                        {item.carrier_name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Action</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={data.category}
                  label="Action"
                  onChange={handleCategoryChange as any}
                >
                  <MenuItem value="import">Import</MenuItem>
                  <MenuItem value="export">Export</MenuItem>
                </Select>
              </FormControl>
              <TextField
                id="outlined-basic"
                label="Cargo Name"
                variant="outlined"
                type="text"
                name="cargo_name"
                value={data.load_status}
                onChange={handleChange}
              />
            </Box>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
