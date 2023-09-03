import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import EditIcon from "@mui/icons-material/Edit";
import { useDispatch, useSelector } from 'react-redux';
import { Alert, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { EditCargoProps } from '../../../../types/Cargo.type';
import { RootState } from '../../../../store/store';
import { btnColor, style } from '../../../../style/Styles';
import api from '../../../../api/api';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';
import { CargoCrane } from '../../../../types/CargoCrane.type';
import { setUpdateCargoCrane } from '../../../../store/slices/cargocraneSlice';

export default function EditPageV2({ Id }: EditCargoProps) {
    const dispatch = useDispatch();
    const [error, setError] = useState(false);
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const cargos = useSelector((state: RootState) => state.cargo.cargo);
    const cranes = useSelector((state: RootState) => state.floating.floating);
    const cargoCranes = useSelector((state: RootState) => state.cargoCrane.cargoCrane);
    const [cargoCrane, setcargoCrane] = useState<CargoCrane | null>(
        cargoCranes.find(cargoCrane => cargoCrane.cc_id === Id) || null
    );

    const handleFloatingChange = (selectedFloatingId: string) => {
        const selectedFloating = cranes.find(
            (item) => item.fl_id === selectedFloatingId
        );
        if (selectedFloating) {
            setcargoCrane((prevData: CargoCrane | any) => ({
                ...prevData,
                fl_id: selectedFloating.fl_id,
                floating_name: selectedFloating.floating_name,
            }));
        }
    };

    const handleCategoryChange = (
        event: React.ChangeEvent<{ value: unknown }>
    ) => {
        setcargoCrane((prevData: CargoCrane | any) => ({
            ...prevData,
            category: event.target.value as string,
        }));
    };

    const handleCraneChange = (
        event: React.ChangeEvent<{ value: unknown }>
    ) => {
        setcargoCrane((prevData: CargoCrane | any) => ({
            ...prevData,
            crane: event.target.value as number,
        }));
    };

    const handleCargoChange = (selectedCargoId: string) => {
        const selectedCargo = cargos.find(
            (item) => item.cargo_id === selectedCargoId
        );
        if (selectedCargo) {
            setcargoCrane((prevData: CargoCrane | any) => ({
                ...prevData,
                ca_id: selectedCargo.cargo_id,
                cargo_name: selectedCargo.cargo_name,
            }));
        }
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setcargoCrane((prevCargo: CargoCrane | any) => ({
            ...prevCargo,
            [name]: value,
        }));
    };

    const handleEdit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(false);
        if (!cargoCrane?.ca_id || !cargoCrane.fl_id) {
            setError(true);
            setLoading(false);
            return;
        }

        setLoading(true);
        if (cargoCrane !== null) {
            api.put(`/cargo_crane/${Id}`, cargoCrane)
                .then(() => {
                    setOpen(false);
                    setLoading(false);
                    () => setOpen(false)
                    dispatch(setUpdateCargoCrane(cargoCrane));
                })
                .catch(error => {
                    setLoading(false);
                    console.error('เกิดข้อผิดพลาดในการแก้ไขข้อมูล Cargo: ', error);
                });
        }
    };

    const FormEdit = () => (
        <Box className="flex flex-col gap-5">
            <FormControl fullWidth>
                <InputLabel id="crane-select-label">Cargo</InputLabel>
                <Select
                    labelId="crane-select-label"
                    id="crane-select"
                    value={cargoCrane?.ca_id || ''}
                    label="Crane"
                    onChange={(e) => handleCargoChange(e.target.value as string)}
                >
                    {cargos.map((items) => (
                        <MenuItem key={items.cargo_id} value={items.cargo_id}>
                            {items.cargo_name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <FormControl fullWidth>
                <InputLabel id="crane-select-label">Crane</InputLabel>
                <Select
                    labelId="crane-select-label"
                    id="crane-select"
                    value={cargoCrane?.fl_id || ''}
                    label="Crane"
                    onChange={(e) => handleFloatingChange(e.target.value as string)}
                >
                    {cranes.map((items) => (
                        <MenuItem key={items.fl_id} value={items.fl_id}>
                            {items.floating_name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <FormControl fullWidth>
                <InputLabel id="crane-simple-select-label">Action</InputLabel>
                <Select
                    labelId="crane-simple-select-label"
                    id="crane-simple-select"
                    value={cargoCrane?.crane}
                    label="Action"
                    onChange={handleCraneChange as any || ''}
                >
                    <MenuItem value="1">1</MenuItem>
                    <MenuItem value="2">2</MenuItem>
                    <MenuItem value="3">3</MenuItem>
                </Select>
            </FormControl>
            <TextField
                label="Work Rate"
                name="consumption_rate"
                type="number"
                value={cargoCrane?.consumption_rate}
                onChange={handleChange}
            />
            <TextField
                label="Work Rate"
                name="work_rate"
                type="number"
                value={cargoCrane?.work_rate}
                onChange={handleChange}
            />
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Action</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={cargoCrane?.category}
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
                    onClick={handleEdit}
                >
                    Success
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
                        Edit Cargo
                    </Typography>
                    {FormEdit()}
                </Box>
            </Modal>
        </div>
    );
}