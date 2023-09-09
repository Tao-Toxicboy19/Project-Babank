import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import EditIcon from "@mui/icons-material/Edit";
import { useDispatch, useSelector } from 'react-redux';
import { Cargo, EditCargoProps } from '../../../../types/Cargo.type';
import { RootState } from '../../../../store/store';
import { btnColor, style } from '../../../../style/Styles';
import api from '../../../../api/api';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';
import { carrier } from '../../../../types/Carrier.type';
import { setUpdateCarrier } from '../../../../store/slices/carrier.slice';
import { TextField } from '@mui/material';

export default function EditPage({ Id }: EditCargoProps) {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const carriers = useSelector((state: RootState) => state.carrier.carrier);
    const [carrier, setCarrier] = useState<carrier | null>(
        carriers.find(carrier => carrier.cr_id === Id) || null
    );

    const handleCargoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setCarrier((prevCargo: Cargo | any) => ({
            ...prevCargo,
            [name]: value,
        }));
    };

    const handleEditCargo = () => {
        setLoading(true);
        if (carrier !== null) {
            api.put(`/carrier/${Id}`, carrier)
                .then(() => {
                    setLoading(false);
                    () => setOpen(false)
                    dispatch(setUpdateCarrier(carrier));
                })
                .catch(error => {
                    setLoading(false);
                    console.error('เกิดข้อผิดพลาดในการแก้ไขข้อมูล Cargo: ', error);
                });
        }
    };

    const FormEdit = () => (
        <Box className="flex flex-col gap-5">
            <TextField
                label="Carrier Name"
                name="carrier_name"
                type='text'
                value={carrier?.carrier_name}
                onChange={handleCargoChange}
            />
            <TextField
                label="Maxcapacity"
                name="maxcapacity"
                type="number"
                value={carrier?.maxcapacity}
                onChange={handleCargoChange}
            />
            <TextField
                label="Ower"
                name="ower"
                type="text"
                value={carrier?.ower}
                onChange={handleCargoChange}
            />
            <TextField
                label="ระวาง (ช่อง)"
                name="burden"
                type="text"
                value={carrier?.burden}
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
                        Edit Cargo
                    </Typography>
                    {FormEdit()}
                </Box>
            </Modal>
        </div>
    );
}