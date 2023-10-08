import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { server } from '../../../../Constants';
import { Box, Button, Card, CardContent, FormControl, MenuItem, Select, Stack, TextField } from '@mui/material';
import { Crane } from '../../../../types/crane.type';
import { RootState } from '../../../../store/store';
import { useSelector } from 'react-redux';
import { FTS } from '../../../../types/FloatingCrane.type';
import { toast } from 'react-toastify';
import { CargoCrane } from '../../../../types/CargoCrane.type';
import { Cargo } from '../../../../types/Cargo.type';
import { httpClient } from '../../../../utlis/httpclient';
import Loading from '../../../layout/Loading/Loading';

type Props = {};

export default function CraneEditPage({ }: Props) {
    const [Cargocrane, setsetCargocrane] = useState<CargoCrane | null>(null)
    const { id } = useParams();
    const navigate = useNavigate()
    const FTSReducer = useSelector((state: RootState) => state.FTS);
    const CraneReducer = useSelector((state: RootState) => state.Crane);
    const CargoReducer = useSelector((state: RootState) => state.cargo);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const fetchCraneData = async () => {
            try {
                const response = await httpClient.get(`${server.CARGOCRANE}/${id}`);
                console.log(response.data)
                setsetCargocrane(response.data);
            } catch (error) {
                console.error('เกิดข้อผิดพลาดในการดึงข้อมูล Crane:', error);
            }
        };
        fetchCraneData();
    }, [id]);

    const handleSelectChangeFTS = (event: any) => {
        const value = event.target.value as number;
        setsetCargocrane((prevCraneData: any) => ({
            ...prevCraneData!,
            FTS_id: value,
        }));
    };

    const handleSelectChangeCrane = (event: any) => {
        const value = event.target.value as number;
        setsetCargocrane((prevCraneData: any) => ({
            ...prevCraneData!,
            crane_id: value,
        }));
    };

    const handleSelectChangeCargo = (event: any) => {
        const value = event.target.value as number;
        setsetCargocrane((prevCraneData: any) => ({
            ...prevCraneData!,
            cargo_id: value,
        }));
    };

    const handleSelectChangeCategory = (event: any) => {
        const value = event.target.value as number;
        setsetCargocrane((prevCraneData: any) => ({
            ...prevCraneData!,
            category: value,
        }));
    };

    const handleInputChange = (event: any) => {
        const { name, value } = event.target;
        const numericValue = parseFloat(value);

        setsetCargocrane((prevCraneData: any) => ({
            ...prevCraneData!,
            [name]: numericValue,
        }));
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsSubmitting(true);

        try {
            console.log(Cargocrane)
            await httpClient.put(`${server.CARGOCRANE}/${id}`, Cargocrane);
            setIsSubmitting(false);
            toast.success('แก้ไขเครนรรีนยร้อย');
            navigate('/cargocrane')
        } catch (error) {
            setIsSubmitting(false);
            console.error('เกิดข้อผิดพลาดในการอัปเดตข้อมูล Crane:', error);
        }
    };

    if (!Cargocrane) {
        return (
            <Loading />
        );
    }

    const { crane_id, cargo_id, FTS_id, consumption_rate, work_rate, category, } = Cargocrane
    return (
        <Card className="max-w-[720px] mx-auto">
            <CardContent className="m-4">
                <form onSubmit={handleSubmit}>
                    <Stack direction='column' spacing={2}>
                        <Box>
                            <label htmlFor="work_rate" className='font-kanit'>เลือกทุ่น:</label>
                            <FormControl fullWidth>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="FTS_id"
                                    value={FTS_id}
                                    onChange={handleSelectChangeFTS}
                                >
                                    {(FTSReducer.FTS).map((item: FTS) => (
                                        <MenuItem className='font-kanit' key={item.fts_id} value={item.fts_id}>
                                            {item.FTS_name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box>
                        <Box>
                            <label htmlFor="work_rate" className='font-kanit'>เลือกเครน:</label>
                            <FormControl fullWidth>
                                <Select
                                    labelId="crane_id"
                                    id="crane_id"
                                    value={crane_id}
                                    onChange={handleSelectChangeCrane}
                                >
                                    {(CraneReducer.result).map((item: Crane) => (
                                        <MenuItem className='font-kanit' key={item.id} value={item.id}>
                                            {item.crane_name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box>
                        <Box>
                            <label htmlFor="work_rate" className='font-kanit'>ชื่อสินค้า:</label>
                            <FormControl fullWidth>
                                <Select
                                    labelId="cargo_id"
                                    id="cargo_id"
                                    value={cargo_id}
                                    onChange={handleSelectChangeCargo}
                                >
                                    {(CargoReducer.cargo).map((item: Cargo) => (
                                        <MenuItem className='font-kanit' key={item.cargo_id} value={item.cargo_id}>
                                            {item.cargo_name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box>
                        <Box>
                            <label htmlFor="work_rate" className='font-kanit'>สถานะสินค้า (ขาเข้า/ขาออก):</label>
                            <FormControl fullWidth>
                                <Select
                                    name='category'
                                    value={category}
                                    onChange={handleSelectChangeCategory}
                                    fullWidth
                                >
                                    <MenuItem value='import' className='font-kanit'>Import</MenuItem>
                                    <MenuItem value='Export' className='font-kanit'>Export</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                        <Box>
                            <label className="pr-5 font-kanit" htmlFor="consumption_rate" >ชื่อเครน:</label>
                            <TextField
                                variant="outlined"
                                type="number"
                                id="consumption_rate"
                                name="consumption_rate"
                                value={consumption_rate}
                                onChange={handleInputChange}
                                fullWidth
                                className='font-kanit'
                            />
                        </Box>
                        <Box>
                            <label htmlFor="work_rate" className='font-kanit'>เวลาเตรียมการ:</label>
                            <TextField
                                variant="outlined"
                                type="number"
                                id="work_rate"
                                name="work_rate"
                                value={work_rate}
                                onChange={handleInputChange}
                                fullWidth
                                className='font-kanit'
                            />
                        </Box>
                        <Stack spacing={2} direction='row'>
                            <Button
                                fullWidth
                                variant="outlined"
                                sx={{ mt: 3, mb: 2 }}
                                component={Link}
                                to={'/cargocrane'}
                                className='font-kanit'
                            >
                                กลับ
                            </Button>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                className='bg-[#1976D2] hover:bg-[#1563BC] font-kanit'
                                disabled={isSubmitting}
                            >
                                เพิ่มสินค้า
                            </Button>
                        </Stack>
                    </Stack>
                </form>
            </CardContent>
        </Card>
    );
}