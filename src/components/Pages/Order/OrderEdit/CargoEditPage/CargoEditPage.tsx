import React, { useEffect, useState } from 'react';
import { Card, CardContent, FormControl, InputLabel, MenuItem, Select, TextField, Button, Stack, Typography, Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { RootState } from '../../../../../store/store';
import { Cargo } from '../../../../../type/Cargo.type';
import { server } from '../../../../../Constants';
import { CargoItem, Orders } from '../../../../../type/Order.type';
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

            const bulk_values: any[] = [];
            cargo.forEach((item, _) => {
                const bulk_item_values: { [key: string]: number } = {}; // ใช้ object แทน array
                for (let i = 0; i < item.bulk; i++) {
                    const fieldName = `b${i + 1}`;
                    const elements = document.getElementsByName(fieldName);
                    if (elements.length > 0) {
                        const valueString = (elements[0] as HTMLInputElement).value;
                        const valueNumber = parseFloat(valueString.replace(/,/g, '')); // ลบ comma และแปลงเป็น number
                        bulk_item_values[fieldName] = valueNumber;
                    }
                }
                bulk_values.push(bulk_item_values);
            });

            const idNumber = Number(id);
            const values = {
                order_id: idNumber,
                cargo: cargoData,
                bulk_values: bulk_values,
            };
            setIsSubmitting(true);
            dispatch(updateCargoOrder(id, values, navigate, setIsSubmitting));
        } catch (error) {
            throw new Error();
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
                                    {cargo.map((item: any, index: any) => (
                                        <Box key={index}>
                                            <TextField
                                                fullWidth
                                                id="bulk"
                                                label="Bulk:"
                                                variant="outlined"
                                                type="number"
                                                className='my-5'
                                                value={item.bulk}
                                                onChange={(e) =>
                                                    handleCargoChange(index, 'bulk', Number(e.target.value))
                                                }
                                            />
                                            <Box key={index} className='grid grid-cols-4 gap-5'>
                                                {item.bulk > 0 && (
                                                    Array.from({ length: item.bulk }).map((_, i) => (
                                                        <TextField
                                                            key={i}
                                                            fullWidth
                                                            id={`bulk_${i}`}
                                                            label={`Bulk ${i + 1}:`}
                                                            variant="outlined"
                                                            type="text"
                                                            name={`b${i + 1}`}
                                                            defaultValue={(item.load / item.bulk).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                                            onChange={(e) => console.log(index, i, Number(e.target.value))}
                                                        />
                                                    ))
                                                )}
                                            </Box>
                                        </Box>
                                    ))}
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
                                        component={Link}
                                        to={'/orders'}
                                        className='font-kanit'
                                    >
                                        กลับ
                                    </Button>
                                    <Button
                                        variant="contained"
                                        className='bg-[#66BB6A] hover:bg-[#1B5E20] font-kanit'
                                        onClick={handleSubmit}
                                        disabled={isSubmitting}
                                    >
                                        ยืนยันเเก้ไข
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
