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
import { setUpdateFloating } from '../../../../store/slices/floatingSlice.bak';
import { TextField } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';
import EditIcon from "@mui/icons-material/Edit";


export default function EditPage({ Id }: EditCargoProps) {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const floatings = useSelector((state: RootState) => state.floating.floating);
  const [floating, setFloating] = useState<Floating | null>(
    floatings.find(floating => floating.fl_id === Id) || null
  );
  // alert(`Hello${Id}`)
  const handleCargoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFloating((prevCargo: Floating | any) => ({
      ...prevCargo,
      [name]: value,
    }));
  };

  const handleEditCargo = () => {
    setLoading(true);
    if (floating !== null) {
      api.put(`/floating_crane/${Id}`, floating)
        .then(() => {
          setLoading(false);
          () => setOpen(false)
          dispatch(setUpdateFloating(floating));
        })
        .catch(error => {
          console.error('เกิดข้อผิดพลาดในการแก้ไขข้อมูล floatings: ', error);
          setLoading(false);
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
        value={floating?.NumberOfCranes}
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
      <EditIcon
        onClick={() => setOpen(true)}
        className="hover:text-blue-500 hover:scale-110 transform transition-transform duration-300 mx-2"
      />
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ marginBottom: 3 }}>
            แก้ไข ทุ่น
          </Typography>
          {FormEdit()}
        </Box>
      </Modal>
    </div>
  );
}
