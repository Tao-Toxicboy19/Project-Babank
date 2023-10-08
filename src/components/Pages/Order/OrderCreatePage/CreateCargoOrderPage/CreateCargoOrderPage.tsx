import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Button, Card, CardContent, FormControl, MenuItem, Select, Stack, TextField, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../../store/store';
import { Cargo } from '../../../../../types/Cargo.type';
import { Link, useNavigate } from 'react-router-dom';
import { server } from '../../../../../Constants';
import { addCargoOrder } from '../../../../../store/slices/cargoOrder.slice';
import { CargoItem } from '../../../../../types/Order.type';

const CargoOrderForm: React.FC = () => {
    const [order_id, setOrderId] = useState<number>(0);
    const dispatch = useDispatch<any>();
    const navigate = useNavigate()
    const [cargo, setCargo] = useState<CargoItem[]>([
        { cargo_id: 0, load: 0, bulk: 0 },
    ]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const CargoReducer = useSelector((state: RootState) => state.cargo);

    useEffect(() => {
        axios.get(server.CARGOORDER_URL)
            .then((res) => {
                setOrderId(res.data.lastCargoOrderId);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const handleAddCargo = () => {
        setCargo([...cargo, { cargo_id: 0, load: 0, bulk: 0 }]);
    };

    const handleRemoveCargo = (index: number) => {
        const updatedCargo = [...cargo];
        updatedCargo.splice(index, 1);
        setCargo(updatedCargo);
    };

    const handleCargoChange = (
        index: number,
        field: keyof CargoItem,
        value: number
    ) => {
        const updatedCargo = [...cargo];
        updatedCargo[index][field] = value;
        setCargo(updatedCargo);
    };

    const handleSubmit = async () => {
        try {
            const cargoData = cargo.map((item) => ({
                cargo_id: item.cargo_id,
                load: item.load,
                bulk: item.bulk,
            }));

            const values = {
                order_id,
                cargo: cargoData,
            };
            setIsSubmitting(true);
            dispatch(addCargoOrder(values, navigate, setIsSubmitting))
        } catch (error) {
            console.error(error);
        }
    };

    const handleSelectChange = (event: any, index: number) => {
        const value = event.target.value as number;
        setCargo((prevCargoData: any) => {
            const updatedCargo = [...prevCargoData];
            updatedCargo[index].cargo_id = value;
            return updatedCargo;
        });
    };

    return (
        <Card sx={{ maxWidth: 750, marginX: 'auto' }}>
            <CardContent>
                {cargo.map((item, index) => (
                    <Stack key={index} spacing={2} direction='column'>
                        <Typography
                            variant='h6'
                            component='h1'
                            className='flex justify-center font-kanit'
                        >
                            สินค้าที่ {index + 1}
                        </Typography>
                        <FormControl fullWidth>
                            <label htmlFor="cargo_id" className='font-kanit'>เลือกสินค้า:</label>
                            <Select
                                labelId="demo-simple-select-label"
                                id="cargo_id"
                                value={item.cargo_id}
                                onChange={(e) => handleSelectChange(e, index)}
                            >
                                {(CargoReducer.cargo).map((cargoItem: Cargo) => (
                                    <MenuItem className='font-kanit' key={cargoItem.cargo_id} value={cargoItem.cargo_id}>
                                        {cargoItem.cargo_name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <Box>
                            <label htmlFor="cargo_id" className='font-kanit'>ปริมาณสินค้า (ตัน):</label>
                            <TextField
                                fullWidth
                                id="load"
                                variant="outlined"
                                type="number"
                                value={item.load}
                                onChange={(e) =>
                                    handleCargoChange(index, 'load', Number(e.target.value))
                                }
                            />
                        </Box>
                        <Box>
                            <label htmlFor="cargo_id" className='font-kanit'>จำนวนระวาง:</label>
                            <TextField
                                fullWidth
                                id="bulk"
                                variant="outlined"
                                type="number"
                                value={item.bulk}
                                onChange={(e) =>
                                    handleCargoChange(index, 'bulk', Number(e.target.value))
                                }
                            />
                        </Box>
                        <Stack spacing={2} direction='row'>

                            <Button
                                className='font-kanit'
                                onClick={
                                    () => handleRemoveCargo(index)
                                }
                                variant="outlined"
                            >
                                ลบสินค้า
                            </Button>
                        </Stack>
                    </Stack>
                ))}
                <Stack spacing={2} direction='row' className='flex justify-between mt-[16px] font-kanit'>
                    <Button
                        variant="contained"
                        onClick={handleAddCargo}
                        className='bg-[#1976d2] hover:bg-[#1563bc]'
                    >
                        เพิ่มจำนวนสินค้า
                    </Button>
                    <Stack spacing={2} direction='row'>
                        <Button
                            variant="outlined"
                            onClick={handleSubmit}
                            component={Link}
                            to={'/orders/create'}
                            className='font-kanit'
                        >
                            กลับ
                        </Button>
                        <Button
                            variant="contained"
                            className='bg-[#1976d2] hover:bg-[#1563bc] font-kanit'
                            onClick={handleSubmit}
                            disabled={isSubmitting}
                        >
                            เพิ่มสินค้า
                        </Button>
                    </Stack>
                </Stack>
            </CardContent>
        </Card>
    );
};

export default CargoOrderForm;
