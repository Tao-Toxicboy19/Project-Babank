import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { server } from '../../../../Constants';
import { Box, Button, Card, CardContent, CircularProgress, FormControl, InputLabel, MenuItem, Select, Stack, TextField } from '@mui/material';
import { Crane } from '../../../../types/crane.type';
import SaveIcon from '@mui/icons-material/Save';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { RootState } from '../../../../store/store';
import { useSelector } from 'react-redux';
import { FTS } from '../../../../types/FloatingCrane.type';
import { toast } from 'react-toastify';
import { CargoCrane } from '../../../../types/CargoCrane.type';
import { Cargo } from '../../../../types/Cargo.type';
import { httpClient } from '../../../../utlis/httpclient';

type Props = {};

export default function CraneEditPage({ }: Props) {
    const [Cargocrane, setsetCargocrane] = useState<CargoCrane | null>(null)
    const { id } = useParams();
    const navigate = useNavigate()
    const FTSReducer = useSelector((state: RootState) => state.FTS);
    const CraneReducer = useSelector((state: RootState) => state.Crane);
    const CargoReducer = useSelector((state: RootState) => state.cargo);

    useEffect(() => {
        const fetchCraneData = async () => {
            try {
                const response = await httpClient.get(`${server.CARGOCRANE}/${id}`);
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


    const handleInputChange = (event: any) => {
        const { name, value } = event.target;

        setsetCargocrane((prevCraneData: any) => ({
            ...prevCraneData!,
            [name]: value,
        }));
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            await httpClient.put(`${server.CARGOCRANE}/${id}`, Cargocrane);
            console.log(Cargocrane)
            toast.success('แก้ไขเครนรรีนยร้อย');
            navigate('/cargocrane')
        } catch (error) {
            console.error('เกิดข้อผิดพลาดในการอัปเดตข้อมูล Crane:', error);
        }
    };


    if (!Cargocrane) {
        return (
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100%',
                }}
            >
                <CircularProgress />
            </Box>
        );
    }

    const { crane_id, cargo_id, FTS_id, consumption_rate, work_rate, category, } = Cargocrane
    return (
        <div>
            <Card className="max-w-[720px] mx-auto">
                <CardContent className="m-4">
                    <form onSubmit={handleSubmit}>
                        <Stack direction='column' spacing={3}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">เลือกทุ่น</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="FTS_id"
                                    value={FTS_id}
                                    label="เลือกทุ่น"
                                    onChange={handleSelectChangeFTS}
                                >
                                    {(FTSReducer.FTS).map((item: FTS) => (
                                        <MenuItem key={item.fts_id} value={item.fts_id}>
                                            {item.FTS_name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">เลือกทุ่น</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="FTS_id"
                                    value={crane_id}
                                    label="เลือกทุ่น"
                                    onChange={handleSelectChangeCrane}
                                >
                                    {(CraneReducer.result).map((item: Crane) => (
                                        <MenuItem key={item.id} value={item.id}>
                                            {item.crane_name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">เลือกทุ่น</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="FTS_id"
                                    value={cargo_id}
                                    label="เลือกทุ่น"
                                    onChange={handleSelectChangeCargo}
                                >
                                    {(CargoReducer.cargo).map((item: Cargo) => (
                                        <MenuItem key={item.cargo_id} value={item.cargo_id}>
                                            {item.cargo_name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">จำนวนเครน</InputLabel>
                                <Select
                                    name='category'
                                    label='จำนวนเครน'
                                    value={category}
                                    onChange={handleInputChange}
                                    fullWidth
                                >
                                    <MenuItem value='Import'>Import</MenuItem>
                                    <MenuItem value='Export'>Export</MenuItem>
                                </Select>
                            </FormControl>
                            <Box>
                                <label className="pr-5" htmlFor="consumption_rate">ชื่อเครน:</label>
                                <TextField
                                    variant="outlined"
                                    type="text"
                                    id="consumption_rate"
                                    name="consumption_rate"
                                    value={consumption_rate}
                                    onChange={handleInputChange}
                                    fullWidth
                                />
                            </Box>
                            <Box>
                                <label htmlFor="work_rate">เวลาเตรียมการ:</label>
                                <TextField
                                    variant="outlined"
                                    type="number"
                                    id="work_rate"
                                    name="work_rate"
                                    value={work_rate}
                                    onChange={handleInputChange}
                                    fullWidth
                                />
                            </Box>
                        </Stack>
                        <Stack direction='row' spacing={1} className='mt-5'>
                            <Button
                                className="bg-red-400 rounded-lg py-2 px-6 hover:bg-red-800"
                                fullWidth
                                variant="contained"
                                startIcon={<ArrowBackIosIcon />}
                                onClick={() => navigate('/cargocrane')}>
                                กลับ
                            </Button>

                            <Button
                                className="bg-green-500 rounded-lg py-2 px-6 hover:bg-green-900"
                                fullWidth
                                variant="contained"
                                startIcon={<SaveIcon />}
                                type="submit" >
                                บันทึก
                            </Button>
                        </Stack>
                    </form>
                </CardContent>
            </Card>
        </div >
    );
}