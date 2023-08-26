import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../store/store";
import { useState } from "react";
import { Order } from "../../../../types/Order.type";
import api from "../../../../api/api";
import {
  Alert,
  FormControl,
  FormHelperText,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
} from "@mui/material";
import { Cargo } from "../../../../types/Cargo.type";
import { carrier } from "../../../../types/Carrier.type";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import { addOrder } from "../../../../store/slices/OrderSlice";

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
  const dispatch = useDispatch<AppDispatch>();
  const [showErrorAlert, setShowErrorAlert] = useState(false);
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
    arrival_date: 0,
    arrival_time: 0,
    deadline_date: 0,
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

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCategoryChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setData((prevData) => ({
      ...prevData,
      category: event.target.value as string,
    }));
  };

  const handleDateChange = (date: Date | null, type: string) => {
    if (date) {
      const timestamp = date.toISOString();
      setData((prevData) => ({
        ...prevData,
        [type]: timestamp,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !data.cargo_id ||
      !data.carrier_id ||
      !data.load_status ||
      !data.category ||
      !data.arrival_date ||
      !data.arrival_time ||
      !data.deadline_date ||
      !data.deadline_time ||
      data.latitude === 0 ||
      data.longitude === 0
    ) {
      setShowErrorAlert(true);
      return;
    }
    const newData = {
      ...data,
      arrival_date: data.arrival_date
        ? dayjs(data.arrival_date).format("YYYY-MM-DD")
        : null,
      arrival_time: data.arrival_time
        ? dayjs(data.arrival_time, "HH:mm:ss").format("HH:mm:ss")
        : null,
      deadline_date: data.deadline_date
        ? dayjs(data.deadline_date).format("YYYY-MM-DD")
        : null,
      deadline_time: data.deadline_time
        ? dayjs(data.deadline_time, "HH:mm:ss").format("HH:mm:ss")
        : null,
    };

    try {
      await api.post("/order", newData);
      dispatch(addOrder(newData));
      setOpen(false);
      setData({
        order_id: "",
        carrier_name: "",
        carrier_id: "",
        cargo_name: "",
        cargo_id: "",
        load_status: 0,
        category: "",
        arrival_date: 0,
        arrival_time: 0,
        deadline_date: 0,
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
            Order
          </Typography>
          <form onSubmit={handleSubmit}>
            <Box className="grid grid-cols-2 gap-5 my-3">
              <FormControl fullWidth>
                <InputLabel id="Carrier-select-label">Carrier</InputLabel>
                <Select
                  labelId="Carrier-select-label"
                  id="Carrier-select"
                  value={data.carrier_id}
                  label="Carrier"
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
              <FormControl fullWidth>
                <InputLabel id="cargo-select-label">Cargo</InputLabel>
                <Select
                  labelId="cargo-select-label"
                  id="cargo-select"
                  value={data.cargo_id}
                  label="Cargo"
                  onChange={(e) => handleCargoChange(e.target.value as string)}
                >
                  {cargo.map((item: Cargo) => (
                    <MenuItem key={item.cargo_id} value={item.cargo_id}>
                      {item.cargo_name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                id="outlined-basic"
                label="Load status:"
                variant="outlined"
                type="text"
                name="load_status"
                value={data.load_status === 0 ? "" : data.load_status}
                onChange={handleInputChange}
              />
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Category</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={data.category}
                  label="Category"
                  onChange={handleCategoryChange as any}
                >
                  <MenuItem value="import">Import</MenuItem>
                  <MenuItem value="export">Export</MenuItem>
                </Select>
              </FormControl>
              <Box className="flex gap-3">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Arrival Date"
                    value={
                      data.arrival_date
                        ? dayjs(data.arrival_date).toDate()
                        : null
                    }
                    onChange={(date) => handleDateChange(date, "arrival_date")}
                  />
                </LocalizationProvider>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <TimePicker
                    label="Arrival Time"
                    value={
                      data.arrival_time
                        ? dayjs(data.arrival_time).toDate()
                        : null
                    }
                    onChange={(time) => handleDateChange(time, "arrival_time")}
                  />
                </LocalizationProvider>
              </Box>
              <Box className="flex gap-3">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Deadline Date"
                    value={
                      data.deadline_date
                        ? dayjs(data.deadline_date).toDate()
                        : null
                    }
                    onChange={(date) => handleDateChange(date, "deadline_date")}
                  />
                </LocalizationProvider>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <TimePicker
                    label="Deadline Time"
                    value={
                      data.deadline_time
                        ? dayjs(data.deadline_time).toDate()
                        : null
                    }
                    onChange={(time) => handleDateChange(time, "deadline_time")}
                  />
                </LocalizationProvider>
              </Box>
              <FormControl variant="outlined">
                <FormHelperText id="outlined-weight-helper-text">
                  Latitude:
                </FormHelperText>
                <OutlinedInput
                  id="outlined-adornment-weight2"
                  type="number"
                  name="latitude"
                  value={data.latitude === 0 ? "" : data.latitude}
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
                  value={data.longitude === 0 ? "" : data.longitude}
                  onChange={handleInputChange}
                  endAdornment={
                    <InputAdornment position="end">Long</InputAdornment>
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
