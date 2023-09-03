import { useState } from 'react';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import SaveIcon from '@mui/icons-material/Save';
import LoadingButton from '@mui/lab/LoadingButton';
import api from '../../../../api/api';
import { btnColor, style } from '../../../../style/Styles';
import { Alert, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { RootState } from '../../../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { Cargo } from '../../../../types/Cargo.type';
import { carrier } from '../../../../types/Carrier.type';
import { Order } from '../../../../types/Order.type';
import { setInsertOrder } from '../../../../store/slices/OrderSlice';
import AddIcon from '@mui/icons-material/Add';

export default function CreateOrderModal() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const cargos = useSelector((state: RootState) => state.cargo.cargo);
  const carrier = useSelector((state: RootState) => state.carrier.carrier);
  const [formData, setFormData] = useState<Order>({
    or_id: '',
    carrier_name: '',
    cr_id: '',
    cargo_name: '',
    ca_id: '',
    load_status: 0,
    category: '',
    arrival_time: 0,
    deadline_time: 0,
    latitude: 0,
    longitude: 0,
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setFormData({
      or_id: '',
      carrier_name: '',
      cr_id: '',
      cargo_name: '',
      ca_id: '',
      load_status: 0,
      category: '',
      arrival_time: 0,
      deadline_time: 0,
      latitude: 0,
      longitude: 0,
    });
  };

  const handleCargoChange = (selectedCargoId: string) => {
    const selectedCargo = cargos.find(
      (item) => item.cargo_id === selectedCargoId
    );
    if (selectedCargo) {
      setFormData((prevData) => ({
        ...prevData,
        ca_id: selectedCargo.cargo_id,
        cargo_name: selectedCargo.cargo_name,
      }));
    }
  };

  const handleCarrier = (selectedCarrierId: string) => {
    const selectedCarrier = carrier.find(
      (item) => item.cr_id === selectedCarrierId
    );
    if (selectedCarrier) {
      setFormData((prevData) => ({
        ...prevData,
        cr_id: selectedCarrier.cr_id,
        carrier_name: selectedCarrier.carrier_name,
      }));
    }
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = () => {

    if (
      formData.cr_id === '' ||
      formData.ca_id === '' ||
      formData.load_status === 0 ||
      formData.category === '' ||
      formData.arrival_time === 0 ||
      formData.deadline_time === 0 ||
      formData.latitude === 0 ||
      formData.longitude === 0
    ) {
      setLoading(false);
      setShowErrorAlert(true);
      return;
    }

    setLoading(true);
    api
      .post('/orders', formData)
      .then(() => {
        dispatch(setInsertOrder(formData))
        setLoading(false);
        handleClose();
      })
      .catch((error) => {
        console.error('เกิดข้อผิดพลาดในการสร้าง Order: ', error);
        setLoading(false);
      });
  };

  const FormInsert = () => (
    <Box className="flex flex-col gap-5">
      <FormControl fullWidth>
        <InputLabel id="Carrier-select-label">Carrier</InputLabel>
        <Select
          labelId="Carrier-select-label"
          id="Carrier-select"
          name="cr_id"
          value={formData.cr_id}
          onChange={(e) =>
            handleCarrier(e.target.value as string)
          }
        >
          {carrier.map((item: carrier) => (
            <MenuItem key={item.cr_id} value={item.cr_id}>
              {item.carrier_name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel id="Cargo-select-label">Cargo</InputLabel>
        <Select
          labelId="Cargo-select-label"
          id="Cargo-select"
          name="ca_id"
          value={formData.ca_id}
          onChange={(e) =>
            handleCargoChange(e.target.value as string)
          }
        >
          {cargos.map((item: Cargo) => (
            <MenuItem key={item.cargo_id} value={item.cargo_id}>
              {item.cargo_name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        label="Load Status"
        name="load_status"
        type="text"
        value={formData.load_status}
        onChange={handleInputChange}
        fullWidth
      />
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Category</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          name="category"
          value={formData.category}
          onChange={handleInputChange}
        >
          <MenuItem value="import">Import</MenuItem>
          <MenuItem value="export">Export</MenuItem>
        </Select>
      </FormControl>
      <TextField
        label="Arrival Time"
        name="arrival_time"
        type="datetime-local"
        value={formData.arrival_time}
        onChange={handleInputChange}
        fullWidth
      />
      <TextField
        label="Deadline Time"
        name="deadline_time"
        type="datetime-local"
        value={formData.deadline_time}
        onChange={handleInputChange}
        fullWidth
      />
      <TextField
        label="Latitude"
        name="latitude"
        type="number"
        value={formData.latitude}
        onChange={handleInputChange}
        fullWidth
      />
      <TextField
        label="Longitude"
        name="longitude"
        type="number"
        value={formData.longitude}
        onChange={handleInputChange}
        fullWidth
      />
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
          onClick={handleSubmit}
          style={btnColor}
        >
          Save
        </LoadingButton>
      </Box>
    </Box>
  )

  return (
    <div>
      <Button variant="outlined" onClick={handleOpen}><AddIcon className="mx-2" />
        Insert Order
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ marginBottom: 3 }}>
            Create New Order
          </Typography>
          {FormInsert()}
        </Box>
      </Modal>
    </div>
  );
}