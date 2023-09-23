import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { server } from '../../../../Constants';
import { Box, Button, Card, CardContent, CircularProgress, FormControl, InputLabel, MenuItem, Select, Stack, TextField } from '@mui/material';
import { Crane } from '../../../../types/crane.type';
import SaveIcon from '@mui/icons-material/Save';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { RootState } from '../../../../store/store';
import { useSelector } from 'react-redux';
import { FTS } from '../../../../types/FloatingCrane.type';

type Props = {};

export default function CraneEditPage({ }: Props) {
    const [craneData, setCraneData] = useState<Crane | null>(null);
    const { id } = useParams();
    const navigate = useNavigate()
    const FTSSlice = useSelector((state: RootState) => state.FTS);


    useEffect(() => {
        const fetchCraneData = async () => {
            try {
                const response = await axios.get(`${server.CRANE}/${id}`);
                setCraneData(response.data);
            } catch (error) {
                console.error('เกิดข้อผิดพลาดในการดึงข้อมูล Crane:', error);
            }
        };
        fetchCraneData();
    }, [id]);

    const handleSelectChange = (event: any) => {
        const value = event.target.value as number;
        setCraneData((prevCraneData: any) => ({
            ...prevCraneData!,
            FTS_id: value,
        }));
    };


    const handleInputChange = (event: any) => {
        const { name, value } = event.target;

        setCraneData((prevCraneData: any) => ({
            ...prevCraneData!,
            [name]: value,
        }));
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            await axios.put(`${server.CRANE}/${id}`, craneData);
            alert('บันทึกข้อมูลเรียบร้อยแล้ว');
            navigate('/transferstation')
        } catch (error) {
            console.error('เกิดข้อผิดพลาดในการอัปเดตข้อมูล Crane:', error);
        }
    };


    if (!craneData) {
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

    const { crane_name, FTS_id, setuptime_crane } = craneData;

    return (
        <div>
            <Card>
                <CardContent className="m-8">
                    <form onSubmit={handleSubmit}>
                        <Stack direction='column' spacing={1}>
                            <label className="pr-5" htmlFor="FTS_name">ชื่อทุ่น:</label>
                            <TextField
                                variant="outlined"
                                type="text"
                                id="crane_name"
                                name="crane_name"
                                value={crane_name}
                                onChange={handleInputChange}
                                fullWidth
                            />

                            <label className="pr-5" htmlFor="lat">เลือกทุ่น</label>
                            <TextField
                                variant="outlined"
                                type="number"
                                id="FTS_id"
                                name="FTS_id"
                                value={FTS_id}
                                onChange={handleInputChange}
                                fullWidth
                            />

                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Age</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="FTS_id"
                                    value={FTS_id}
                                    label="Age"
                                    onChange={handleSelectChange}
                                >
                                    {(FTSSlice.FTS).map((item: FTS) => (
                                        <MenuItem key={item.fts_id} value={item.fts_id}>
                                            {item.FTS_name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                            <label htmlFor="lng">ลองติจูด:</label>
                            <TextField
                                variant="outlined"
                                type="number"
                                id="setuptime_crane"
                                name="setuptime_crane"
                                value={setuptime_crane}
                                onChange={handleInputChange}
                                fullWidth
                            />

                        </Stack>
                        <Stack direction='row' spacing={1} className="flex justify-end mt-10">
                            <Button
                                className="bg-red-400 rounded-lg py-2 px-6 hover:bg-red-800"
                                variant="contained"
                                startIcon={<ArrowBackIosIcon />}
                                onClick={() => navigate('/transferstation')}>
                                กลับ
                            </Button>

                            <Button
                                className="bg-green-500 rounded-lg py-2 px-6 hover:bg-green-900"
                                variant="contained"
                                startIcon={<SaveIcon />}
                                type="submit" >
                                บันทึก
                            </Button>
                        </Stack>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}