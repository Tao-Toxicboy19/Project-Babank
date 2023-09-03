import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../store/store";
import api from "../../../../api/api";
import { setInsertCargoCrane } from "../../../../store/slices/cargocraneSlice";
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
import { btnColor, style } from "../../../../style/Styles";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from '@mui/icons-material/Save';
import AddIcon from '@mui/icons-material/Add';

interface Props { }

export default function PageInsert({ }: Props): JSX.Element {
  const [loading, setLoading] = useState(false);
  const cargo = useSelector((state: RootState) => state.cargo.cargo);
  const floatingData = useSelector((state: RootState) => state.floating.floating);
  const dispatch = useDispatch<AppDispatch>();
  const [open, setOpen] = React.useState(false);
  const [error, setError] = useState(false);
  const [Data, setData] = useState<CargoCrane>({
    cc_id: "",
    cargo_name: "",
    floating_name: "",
    fl_id: "",
    ca_id: "",
    crane: 1,
    consumption_rate: 0,
    work_rate: 0,
    category: "",
  });

  const handleFloatingChange = (selectedFloatingId: string) => {
    const selectedFloating = floatingData.find(
      (item) => item.fl_id === selectedFloatingId
    );
    if (selectedFloating) {
      setData((prevData) => ({
        ...prevData,
        fl_id: selectedFloating.fl_id,
        floating_name: selectedFloating.floating_name,
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

  const handleCraneChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setData((prevData) => ({
      ...prevData,
      crane: event.target.value as number,
    }));
  };

  const handleCargoChange = (selectedCargoId: string) => {
    const selectedCargo = cargo.find(
      (item) => item.cargo_id === selectedCargoId
    );
    if (selectedCargo) {
      setData((prevData) => ({
        ...prevData,
        ca_id: selectedCargo.cargo_id,
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
    setLoading(true);
    setError(false);

    if (
      !Data.ca_id ||
      !Data.fl_id ||
      Data.consumption_rate === 0 ||
      Data.work_rate === 0 ||
      Data.crane === 0 ||
      !Data.category
    ) {
      setError(true);
      setLoading(false);
      return;
    }
    setError(false);
    try {
      await api.post("/cargo_crane", Data);
      dispatch(setInsertCargoCrane(Data));
      setOpen(false);
      setLoading(false);
      setData({
        cc_id: "",
        cargo_name: "",
        floating_name: "",
        fl_id: "",
        ca_id: "",
        crane: 1,
        consumption_rate: 0,
        work_rate: 0,
        category: "",
      })
    } catch (error) {
      setLoading(false);
      console.error("Error posting data:", error);
    }

  };

  const FormInsert = () => (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="cargo-select-label">Cargo</InputLabel>
          <Select
            labelId="cargo-select-label"
            id="cargo-select"
            value={Data.ca_id}
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
            value={Data.fl_id}
            label="Crane"
            onChange={(e) =>
              handleFloatingChange(e.target.value as string)
            }
          >
            {floatingData.map((item: Floating) => (
              <MenuItem key={item.fl_id} value={item.fl_id}>
                {item.floating_name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <FormControl fullWidth>
        <InputLabel id="crane-simple-select-label">Action</InputLabel>
        <Select
          labelId="crane-simple-select-label"
          id="crane-simple-select"
          value={Data.crane}
          label="Action"
          onChange={handleCraneChange as any || ''}
        >
          <MenuItem value="1">1</MenuItem>
          <MenuItem value="2">2</MenuItem>
          <MenuItem value="3">3</MenuItem>
        </Select>
      </FormControl>
      <FormControl variant="outlined">
        <FormHelperText id="outlined-weight-helper-text">
          Consumpation Rate
        </FormHelperText>
        <OutlinedInput
          type="number"
          id="outlined-adornment-weight"
          name="consumption_rate"
          value={
            Data.consumption_rate === 0
              ? ""
              : Data.consumption_rate
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
          value={Data.work_rate === 0 ? "" : Data.work_rate}
          onChange={handleChange}
          endAdornment={
            <InputAdornment position="end">WR</InputAdornment>
          }
        />
      </FormControl>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Action</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={Data.category}
          label="Action"
          onChange={handleCategoryChange as any}
        >
          <MenuItem value="import">Import</MenuItem>
          <MenuItem value="export">Export</MenuItem>
          <MenuItem value="Any">Any</MenuItem>
        </Select>
      </FormControl>
      <Box>
        {error && (
          <Alert className="flex w-full h-13 my-3" severity="error">
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
      <Button onClick={() => setOpen(true)}><AddIcon className="mx-2" />Insert Cargo Crane</Button>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ marginBottom: 3 }}>
            Cargo Crane
          </Typography>
          {FormInsert()}
        </Box>
      </Modal>
    </div>
  );
}
