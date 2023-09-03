import { useState } from "react";
import { useDispatch } from "react-redux";
import { Cargo } from "../../../../types/Cargo.type";
import api from "../../../../api/api";
import AddIcon from '@mui/icons-material/Add';
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
import { btnColor, style } from "../../../../style/Styles";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from '@mui/icons-material/Save';
import { setInsertSuccess } from "../../../../store/slices/cargoSlice";

type Props = {};

export default function EditCargo({ }: Props) {
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
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
    setLoading(true);
    if (!cargo.cargo_name || !cargo.consumption_rate || !cargo.work_rate) {
      setShowErrorAlert(true);
      setLoading(false);
      return;
    }

    try {
      await api.post("/cargo", cargo);
      dispatch(setInsertSuccess(cargo));
      setOpen(false); setLoading(false);
      setCargo({
        cargo_id: "",
        cargo_name: "",
        consumption_rate: 0,
        work_rate: 0,
        category: "",
      });
    } catch (error) {
      setLoading(false);
      console.log(`${error}`);
    }
  };
  const FormSubmit = () => (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <TextField
        id="outlined-basic"
        label="Cargo Name"
        variant="outlined"
        type="text"
        name="cargo_name"
        value={cargo.cargo_name}
        onChange={handleInputChange}
      />
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
          <MenuItem value="Any">Any</MenuItem>
        </Select>
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
      <Button onClick={() => setOpen(true)}><AddIcon className="mx-2" />Insert Cargo</Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ marginBottom: 3 }}>
            Cargo
          </Typography>
          {FormSubmit()}
        </Box>
      </Modal>
    </div>
  );
}