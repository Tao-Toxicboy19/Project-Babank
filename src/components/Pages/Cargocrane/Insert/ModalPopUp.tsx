import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../store/store";
import api from "../../../../api/api";
import { addCargoCrane } from "../../../../store/slices/cargocraneSlice";
import {
  Alert,
  Box,
  Button,
  FormControl,
  FormHelperText,
  InputAdornment,
  InputLabel,
  MenuItem,
  Modal,
  OutlinedInput,
  Select,
  Typography,
} from "@mui/material";
import { Floating } from "../../../../types/FloatingCrane.type";
import { Cargo } from "../../../../types/Cargo.type";
import { CargoCrane } from "../../../../types/CargoCrane.type";
import { style } from "../../../../style/Styles";

interface Props {}

export default function ModalPopUp({}: Props): JSX.Element {
  const floatingData = useSelector((state: RootState) => state.floating.data);
  const cargo = useSelector((state: RootState) => state.cargo.cargo);
  const dispatch = useDispatch<AppDispatch>();
  const [formData, setFormData] = useState<CargoCrane>({
    cargo_crane_id: "",
    cargo_name: "",
    floating_name: "",
    floating_id: "",
    cargo_id: "",
    consumption_rate: 0,
    work_rate: 0,
    category: "",
  });
  const [open, setOpen] = React.useState(false);
  const [error, setError] = useState(false);

  const handleFloatingChange = (selectedFloatingId: string) => {
    const selectedFloating = floatingData.find(
      (item) => item.floating_id === selectedFloatingId
    );
    if (selectedFloating) {
      setFormData((prevData) => ({
        ...prevData,
        floating_id: selectedFloating.floating_id,
        floating_name: selectedFloating.floating_name,
      }));
    }
  };

  const handleCargoChange = (selectedCargoId: string) => {
    const selectedCargo = cargo.find(
      (item) => item.cargo_id === selectedCargoId
    );
    if (selectedCargo) {
      setFormData((prevData) => ({
        ...prevData,
        cargo_id: selectedCargo.cargo_id,
        cargo_name: selectedCargo.cargo_name,
      }));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.cargo_id ||
      !formData.floating_id ||
      !formData.consumption_rate ||
      !formData.work_rate
    ) {
      setError(true);
    } else {
      setError(false);
      try {
        await api.post("/cargocrane", formData);
        dispatch(addCargoCrane(formData));
        setOpen(false);
      } catch (error) {
        console.error("Error posting data:", error);
      }
    }
  };

  return (
    <div>
      <Button onClick={() => setOpen(true)}>Insert Cargo Crane</Button>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Cargo Crane
          </Typography>
          <form onSubmit={handleSubmit}>
            <Box className="grid grid-cols-2 gap-x-5 my-3">
              <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                  <InputLabel id="cargo-select-label">Cargo</InputLabel>
                  <Select
                    labelId="cargo-select-label"
                    id="cargo-select"
                    value={formData.cargo_id}
                    label="Cargo"
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
                  <InputLabel id="Crane-select-label">Crane</InputLabel>
                  <Select
                    labelId="Crane-select-label"
                    id="Crane-select"
                    value={formData.floating_id}
                    label="Crane"
                    onChange={(e) =>
                      handleFloatingChange(e.target.value as string)
                    }
                  >
                    {floatingData.map((item: Floating) => (
                      <MenuItem key={item.floating_id} value={item.floating_id}>
                        {item.floating_name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
              <FormControl variant="outlined">
                <FormHelperText id="outlined-weight-helper-text">
                  Consumpation Rate
                </FormHelperText>
                <OutlinedInput
                  type="number"
                  id="outlined-adornment-weight"
                  name="consumption_rate"
                  value={
                    formData.consumption_rate === 0
                      ? ""
                      : formData.consumption_rate
                  }
                  onChange={handleChange}
                  endAdornment={
                    <InputAdornment position="end">CR</InputAdornment>
                  }
                />
              </FormControl>
              <FormControl variant="outlined">
                <FormHelperText id="outlined-weight-helper-text">
                  Work Rate
                </FormHelperText>
                <OutlinedInput
                  type="number"
                  id="outlined-adornment-weight2"
                  name="work_rate"
                  value={formData.work_rate === 0 ? "" : formData.work_rate}
                  onChange={handleChange}
                  endAdornment={
                    <InputAdornment position="end">WR</InputAdornment>
                  }
                />
              </FormControl>
            </Box>
            <Box>
              {error && (
                <Alert className="flex w-full h-13 my-3" severity="error">
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
