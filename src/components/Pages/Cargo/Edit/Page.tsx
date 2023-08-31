import { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { style } from "../../../../style/Styles";
import { Cargo } from "../../../../types/Cargo.type";
import api from "../../../../api/api";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../store/store";
import { updateCargo } from "../../../../store/slices/cargoSlice";

interface EditCargoProps {
    cargoId: string;
}

export default function EditCargo({ cargoId }: EditCargoProps) {
    const dispatch = useDispatch<AppDispatch>();
    const [open, setOpen] = useState(false);
    const [cargo, setCargo] = useState<Cargo>({
        cargo_id: "",
        cargo_name: "",
        consumption_rate: 0,
        work_rate: 0,
        category: "",
    });

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleInputChange = (event: any) => {
        const { name, value } = event.target;
        setCargo((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleUpdateCargo = async () => {
        try {
            await api.put(`/cargo/${cargoId}`, cargo);
            dispatch(updateCargo({ ...cargo, cargo_id: cargoId }));
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <EditIcon
                onClick={() => {
                    handleOpen();
                }}
                className="hover:text-blue-500 hover:scale-110 transform transition-transform duration-300 mx-2"
            />
            <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Edit Cargo ID: {cargoId}
                    </Typography>
                    <TextField
                        label="Cargo Name"
                        variant="outlined"
                        name="cargo_name"
                        value={cargo.cargo_name}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Consumption Rate"
                        variant="outlined"
                        name="consumption_rate"
                        value={cargo.consumption_rate}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Work Rate"
                        variant="outlined"
                        name="work_rate"
                        value={cargo.work_rate}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Category"
                        variant="outlined"
                        name="category"
                        value={cargo.category}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                    />
                    <Button variant="contained" color="primary" onClick={handleUpdateCargo}>
                        Update
                    </Button>
                </Box>
            </Modal>
        </div>
    );
}
