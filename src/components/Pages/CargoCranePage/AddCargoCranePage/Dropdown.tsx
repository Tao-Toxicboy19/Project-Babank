import { useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import { Floating } from "../../../../types/FloatingCrane.type";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useState } from "react";
import { Cargo } from "../../../../types/Cargo.type";

export default function FloatingSelect() {
  const floatingData = useSelector((state: RootState) => state.floating.data);
  const cargo = useSelector((state: RootState) => state.cargo.cargo);
  const [selectedFloatingIdForCrane, setSelectedFloatingIdForCrane] =
    useState("");
  const [selectedFloatingIdForCargo, setSelectedFloatingIdForCargo] =
    useState("");

  const handleCraneChange = (event: SelectChangeEvent) => {
    setSelectedFloatingIdForCrane(event.target.value as string);
  };

  const handleCargoChange = (event: SelectChangeEvent) => {
    setSelectedFloatingIdForCargo(event.target.value as string);
  };

  return (
    <>
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="floating-select-label">Crane</InputLabel>
          <Select
            labelId="floating-select-label"
            id="floating-select"
            value={selectedFloatingIdForCrane}
            label="Select a Floating"
            onChange={handleCraneChange}
          >
            {floatingData.map((item: Floating) => (
              <MenuItem key={item.floating_id} value={item.floating_id}>
                {item.floating_name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="floating-select-label">Cargo</InputLabel>
          <Select
            labelId="floating-select-label"
            id="floating-select"
            value={selectedFloatingIdForCargo}
            label="Select a Floating"
            onChange={handleCargoChange}
          >
            {cargo.map((item: Cargo) => (
              <MenuItem key={item.cargo_id} value={item.cargo_id}>
                {item.cargo_name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </>
  );
}
