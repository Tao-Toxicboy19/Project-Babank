import { useState } from "react";
import { useDispatch } from "react-redux";
import { Cargo } from "../../../../types/Cargo.type";
import api from "../../../../api/api";
import { addCargo } from "../../../../store/slices/cargoSlice";
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
  TextField,
  Typography,
} from "@mui/material";

type Props = {};

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

export default function ModalPopup({}: Props) {
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const [cargo, setCargo] = useState<Cargo>({
    cargo_id: "",
    cargo_name: "",
    consumption_rate: 0,
    work_rate: 0,
    category: "",
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setCargo((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCategoryChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setCargo((prevData) => ({
      ...prevData,
      category: event.target.value as string,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!cargo.cargo_name || !cargo.consumption_rate || !cargo.work_rate) {
      setShowErrorAlert(true);
      return;
    }

    try {
      await api.post("/cargo", cargo);
      dispatch(addCargo(cargo));
      setOpen(false);
      setCargo({
        cargo_id: "",
        cargo_name: "",
        consumption_rate: 0,
        work_rate: 0,
        category: "",
      });
    } catch (error) {
      console.log(`${error}`);
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
            Cargo
          </Typography>
          <form onSubmit={handleSubmit}>
            <Box className="grid grid-cols-2 gap-5 my-3">
              <TextField
                id="outlined-basic"
                label="Cargo Name"
                variant="outlined"
                type="text"
                name="cargo_name"
                value={cargo.cargo_name}
                onChange={handleInputChange}
              />
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Action</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={cargo.category}
                  label="Action"
                  onChange={handleCategoryChange as any}
                >
                  <MenuItem value="import">Import</MenuItem>
                  <MenuItem value="export">Export</MenuItem>
                </Select>
              </FormControl>
              <FormControl variant="outlined">
                <FormHelperText id="outlined-weight-helper-text">
                  Consumption Rate:
                </FormHelperText>
                <OutlinedInput
                  id="outlined-adornment-weight2"
                  type="number"
                  name="consumption_rate"
                  value={
                    cargo.consumption_rate === 0 ? "" : cargo.consumption_rate
                  }
                  onChange={handleInputChange}
                  endAdornment={
                    <InputAdornment position="end">CR</InputAdornment>
                  }
                />
              </FormControl>
              <FormControl variant="outlined">
                <FormHelperText id="outlined-weight-helper-text">
                  Work Rate:
                </FormHelperText>
                <OutlinedInput
                  id="outlined-adornment-weight2"
                  type="number"
                  name="work_rate"
                  value={cargo.work_rate === 0 ? "" : cargo.work_rate}
                  onChange={handleInputChange}
                  endAdornment={
                    <InputAdornment position="end">WR</InputAdornment>
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
