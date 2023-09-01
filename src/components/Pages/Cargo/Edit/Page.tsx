import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import EditIcon from "@mui/icons-material/Edit";
import { useDispatch, useSelector } from 'react-redux';
import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { Cargo, EditCargoProps } from '../../../../types/Cargo.type';
import { RootState } from '../../../../store/store';
import { setUpdateCargo } from '../../../../store/slices/cargoSlice';
import { style } from '../../../../style/Styles';
import api from '../../../../api/api';

export default function EditPageV2({ cargoId }: EditCargoProps) {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const cargos = useSelector((state: RootState) => state.cargo.cargo);
    const [cargo, setCargo] = useState<Cargo | null>(
        cargos.find(cargo => cargo.cargo_id === cargoId) || null
    );

    const handleClose = () => setOpen(false);

    const handleCargoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setCargo((prevCargo: Cargo | any) => ({
            ...prevCargo,
            [name]: value,
        }));
    };

    const handleEditCargo = () => {
        if (cargo !== null) {
            api.put(`/cargo/${cargoId}`, cargo)
                .then(() => {
                    handleClose();
                    dispatch(setUpdateCargo(cargo));
                })
                .catch(error => {
                    console.error('เกิดข้อผิดพลาดในการแก้ไขข้อมูล Cargo: ', error);
                });
        }
    };

    const FormEdit = () => (
        <Box className="flex flex-col gap-5">
            <TextField
                label="Cargo Name"
                name="cargo_name"
                value={cargo?.cargo_name}
                onChange={handleCargoChange}
            />
            <TextField
                label="Consumption Rate"
                name="consumption_rate"
                type="number"
                value={cargo?.consumption_rate}
                onChange={handleCargoChange}
            />
            <TextField
                label="Work Rate"
                name="work_rate"
                type="number"
                value={cargo?.work_rate}
                onChange={handleCargoChange}
            />
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Action</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    name="category"
                    value={cargo?.category}
                    onChange={(event: any) => handleCargoChange(event)}
                    label="Action"
                >
                    <MenuItem value="import">Import</MenuItem>
                    <MenuItem value="export">Export</MenuItem>
                </Select>
            </FormControl>
            <Button onClick={handleEditCargo}>Save</Button>
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
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ marginBottom: 3 }}>
                        Edit Cargo
                    </Typography>
                    {FormEdit()}
                </Box>
            </Modal>
        </div>
    );
}