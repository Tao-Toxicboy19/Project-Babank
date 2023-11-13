import React, { useEffect, useState } from 'react';
import { Card, CardContent, FormControl, InputLabel, MenuItem, Select, TextField, Button, Stack, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { RootState } from '../../../../../store/store';
import { Cargo } from '../../../../../types/Cargo.type';
import { server } from '../../../../../Constants';
import { CargoItem, Orders } from '../../../../../types/Order.type';
import { httpClient } from '../../../../../utils/httpclient';
import { updateCargoOrder } from '../../../../../store/slices/Order/cargoOrder.slice';
import Loading from '../../../../layout/Loading/Loading';


const CargoEditPage: React.FC = () => {
    const { id } = useParams()
    const dispatch = useDispatch<any>()
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const navigate = useNavigate()
    const [loading, setloading] = useState<boolean>(false);
    const [cargo, setCargo] = useState<CargoItem[]>([
        { cargo_id: 0, load: 0, bulk: 0 },
    ]);
    const CargoReducer = useSelector((state: RootState) => state.cargo);

    useEffect(() => {
        const fetchCraneData = async () => {
            try {
                setloading(true)
                const response = await httpClient.get<Orders>(`${server.ORDER}/${id}`);
                setCargo(response.data.cargo_order)
                setloading(false)
            } catch (error) {
                setloading(false)
            }
        };
        fetchCraneData();
    }, [id]);



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

            const idNumber = Number(id);
            const values = {
                order_id: idNumber,
                cargo: cargoData,
            };
            setIsSubmitting(true);
            dispatch(updateCargoOrder(id, values, navigate, setIsSubmitting))
        } catch (error) {
            throw new Error()
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
        <>
            {
                loading ? (
                    <Loading />
                ) : (
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
                                        <InputLabel id="demo-simple-select-label" className='font-kanit'>เลือกทุ่น</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="FTS_id"
                                            value={item.cargo_id}
                                            label="เลือกทุ่น"
                                            onChange={(e) => handleSelectChange(e, index)}
                                        >
                                            {(CargoReducer.cargo).map((cargoItem: Cargo) => (
                                                <MenuItem className='font-kanit' key={cargoItem.cargo_id} value={cargoItem.cargo_id}>
                                                    {cargoItem.cargo_name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                    <TextField
                                        fullWidth
                                        id="load"
                                        label="Load:"
                                        variant="outlined"
                                        type="number"
                                        value={item.load}
                                        onChange={(e) =>
                                            handleCargoChange(index, 'load', Number(e.target.value))
                                        }
                                    />
                                    <TextField
                                        fullWidth
                                        id="bulk"
                                        label="Bulk:"
                                        variant="outlined"
                                        type="number"
                                        value={item.bulk}
                                        onChange={(e) =>
                                            handleCargoChange(index, 'bulk', Number(e.target.value))
                                        }
                                    />
                                    <Stack spacing={2} direction='row'>
                                        <Button
                                            onClick={() => handleRemoveCargo(index)}
                                            variant="outlined"
                                            className='font-kanit'
                                        >
                                            ลบสินค้า
                                        </Button>
                                    </Stack>
                                </Stack>
                            ))}
                            <Stack spacing={2} direction='row' className='flex justify-between mt-[16px]'>
                                <Button
                                    variant="contained"
                                    onClick={handleAddCargo}
                                    className='bg-[#1976d2] hover:bg-[#1563bc] font-kanit'
                                >
                                    เพิ่มจำนวนสินค้า
                                </Button>
                                <Stack spacing={2} direction='row'>
                                    <Button
                                        variant="outlined"
                                        onClick={handleSubmit}
                                        component={Link}
                                        to={'/orders'}
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
                )
            }
        </>
    );
};

export default CargoEditPage;
