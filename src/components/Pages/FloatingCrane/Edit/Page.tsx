import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { btnColor, style } from '../../../../style/Styles';
import { EditCargoProps } from '../../../../types/Cargo.type';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../store/store';
import { useState } from 'react';
import { Floating } from '../../../../types/FloatingCrane.type';
import api from '../../../../api/api';
import { setUpdateFloating } from '../../../../store/slices/floatingSlice';
import { TextField } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';


export default function EditPage({ Id }: EditCargoProps) {
  const [open, setOpen] = React.useState(false);

  const dispatch = useDispatch();
  const loading = useSelector((state: RootState) => state.floating.loading);
  const floatings = useSelector((state: RootState) => state.floating.floating);
  const [floating, setfloating] = useState<Floating | null>(
    floatings.find(floating => floating.fl_id === Id) || null
  );
  // alert(`Hello${Id}`)
  const handleCargoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setfloating((prevCargo: Floating | any) => ({
      ...prevCargo,
      [name]: value,
    }));
  };

  const handleEditCargo = () => {
    if (floating !== null) {
      api.put(`/floating_crane/${Id}`, floating)
        .then(() => {
          () => setOpen(false)
          dispatch(setUpdateFloating(floating));
        })
        .catch(error => {
          console.error('เกิดข้อผิดพลาดในการแก้ไขข้อมูล floatings: ', error);
        });
    }
  };

  const FormEdit = () => (
    <Box className="flex flex-col gap-5">
      <TextField
        label="Floating Transfer Station name"
        name="floating_name"
        type="text"
        value={floating?.floating_name}
        onChange={handleCargoChange}
      />
      <TextField
        label="Description"
        name="description"
        type="text"
        value={floating?.description}
        onChange={handleCargoChange}
      />
      <TextField
        label="Latitude"
        name="latitude"
        type="number"
        value={floating?.latitude}
        onChange={handleCargoChange}
      />
      <TextField
        label="Longitude"
        name="work_rate"
        type="number"
        value={floating?.longitude}
        onChange={handleCargoChange}
      />
      <TextField
        label="Setup time"
        name="setuptime"
        type="number"
        value={floating?.setuptime}
        onChange={handleCargoChange}
      />
      <TextField
        label="Speed"
        name="speed"
        type="number"
        value={floating?.speed}
        onChange={handleCargoChange}
      />
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
          onClick={handleEditCargo}
        >
          Save
        </LoadingButton>
      </Box>
    </Box>
  )

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
          <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ marginBottom: 3 }}>
            Floating Transfer Station {Id}
          </Typography>
          {FormEdit()}
        </Box>
      </Modal>
    </div>
  );
}
