import { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { style } from "../../../../style/Styles";
import { Cargo, EditCargoProps } from "../../../../types/Cargo.type";
import api from "../../../../api/api";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../store/store";
import { updateCargo } from "../../../../store/slices/cargoSlice";

export default function EditCargo({ cargoId }: EditCargoProps) {
    const cargos = useSelector((state: RootState) => state.cargo.cargo);
    const dispatch = useDispatch<AppDispatch>();
    const [open, setOpen] = useState(false);
    const [cargo, setCargo] = useState<Cargo | null>(
        cargos.find(cargo => cargo.cargo_id === cargoId) || null
    );

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        const newValue = name === 'cargo_id' ? (value || undefined) : value;

        setCargo(prevCargo => {
            const updatedCargo: Cargo | null = {
                ...prevCargo,
                [name]: newValue
            } as Cargo;
            return updatedCargo;
        });
    };

    const handleUpdateCargo = async () => {
        try {
            if (cargo) {
                await api.put(`/cargo/${cargoId}`, cargo);
                dispatch(updateCargo({ ...cargo, cargo_id: cargoId }));
            }
        } catch (error) {
            console.error(error);
        }
    };

    const FormEdit = () => (
        <form onSubmit={handleUpdateCargo}>
            <TextField
                label="Cargo Name"
                variant="outlined"
                name="cargo_name"
                value={cargo?.cargo_name}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Consumption Rate"
                variant="outlined"
                name="consumption_rate"
                value={cargo?.consumption_rate}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Work Rate"
                variant="outlined"
                name="work_rate"
                value={cargo?.work_rate}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Category"
                variant="outlined"
                name="category"
                value={cargo?.category}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
            />
            <Button type="submit" variant="contained" color="primary">
                Update
            </Button>
        </form>
    )

    return (
        <div>
            <EditIcon
                onClick={() => setOpen(true)}
                className="hover:text-blue-500 hover:scale-110 transform transition-transform duration-300 mx-2"
            />
            <Modal open={open} onClose={() => setOpen(false)} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Edit Cargo ID: {cargoId}
                    </Typography>
                    {FormEdit()}
                </Box>
            </Modal>
        </div>
    );
}
