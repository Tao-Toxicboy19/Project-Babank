import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { server } from '../../../../Constants';
import { Box, Button, Card, CardContent, FormControl, InputLabel, MenuItem, Select, Stack, TextField } from '@mui/material';
import { Crane } from '../../../../types/crane.type';
import { RootState } from '../../../../store/store';
import { useSelector } from 'react-redux';
import { FTS } from '../../../../types/FloatingCrane.type';
import { toast } from 'react-toastify';
import { httpClient } from '../../../../utils/httpclient';
import Loading from '../../../layout/Loading/Loading';

type Props = {};

export default function CraneEditPage({ }: Props) {
    const [craneData, setCraneData] = useState<Crane | null>(null);
    const { id } = useParams();
    const navigate = useNavigate()
    const FTSSlice = useSelector((state: RootState) => state.FTS);
    const [isSubmitting, setIsSubmitting] = useState(false);

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
        setIsSubmitting(true);

        try {
            await httpClient.put(`${server.CRANE}/${id}`, craneData);
            setIsSubmitting(false);
            toast.success('แก้ไขเครนรรีนยร้อย');
            navigate('/transferstation')
        } catch (error) {
            console.error('เกิดข้อผิดพลาดในการอัปเดตข้อมูล Crane:', error);
            setIsSubmitting(false);
        }
    };


    if (!craneData) {
        return (
            <Loading />
        );
    }

    const { crane_name, FTS_id, setuptime_crane } = craneData;

    return (
        <div>
            <Card className="max-w-[720px] mx-auto">
                <CardContent className="m-4">
                    <form onSubmit={handleSubmit}>
                        <Stack direction='column' spacing={3}>
                            <Box>
                                <label className="pr-5 font-kanit" htmlFor="FTS_name">ชื่อเครน:</label>
                                <TextField
                                    variant="outlined"
                                    type="text"
                                    className='font-kanit'
                                    id="crane_name"
                                    name="crane_name"
                                    value={crane_name}
                                    onChange={handleInputChange}
                                    fullWidth
                                />
                            </Box>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label" className='font-kanit'>เลือกทุ่น</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="FTS_id"
                                    value={FTS_id}
                                    className='font-kanit'
                                    label="เลือกทุ่น"
                                    onChange={handleSelectChange}
                                >
                                    {(FTSSlice.FTS).map((item: FTS) => (
                                        <MenuItem key={item.fts_id} value={item.fts_id}>
                                            {item.FTS_name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <Box>
                                <label htmlFor="lng" className='font-kanit'>เวลาเตรียมการ:</label>
                                <TextField
                                    variant="outlined"
                                    type="number"
                                    id="setuptime_crane"
                                    className='font-kanit'
                                    name="setuptime_crane"
                                    value={setuptime_crane}
                                    onChange={handleInputChange}
                                    fullWidth
                                />
                            </Box>
                        </Stack>
                        <Stack direction='row' spacing={2} sx={{ marginTop: 2 }}>
                            <Button
                                fullWidth
                                variant="outlined"
                                sx={{ mt: 3, mb: 2 }}
                                onClick={() => navigate('/transferstation')}
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
                                บันทึก
                            </Button>
                        </Stack>
                    </form>
                </CardContent>
            </Card>
        </div >
    );
}