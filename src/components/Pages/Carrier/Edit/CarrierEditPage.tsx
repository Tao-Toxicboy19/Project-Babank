import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { server } from '../../../../Constants';
import { Box, Button, Card, CardContent, CircularProgress, Stack, TextField } from '@mui/material';
import { Carrier } from '../../../../types/Carrier.type';
import SaveIcon from '@mui/icons-material/Save';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

type Props = {};

export default function CarrierEditPage({ }: Props) {
    const [Carrier, setCarrier] = useState<Carrier | null>(null);
    const { id } = useParams();
    const navigate = useNavigate()

    useEffect(() => {
        const fetchCarrier = async () => {
            try {
                const response = await axios.get(`${server.CARRIER}/${id}`);
                setCarrier(response.data);
            } catch (error) {
                console.error('เกิดข้อผิดพลาดในการดึงข้อมูล Crane:', error);
            }
        };
        fetchCarrier();
    }, [id]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;

        setCarrier((prevCarrier: Carrier | null) => ({
            ...prevCarrier!,
            [name]: value,
        }));
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            await axios.put(`${server.CARRIER}/${id}`, Carrier);
            alert('บันทึกข้อมูลเรียบร้อยแล้ว');
            navigate('/carrier')
        } catch (error) {
            console.error('เกิดข้อผิดพลาดในการอัปเดตข้อมูล Crane:', error);
        }
    };

    if (!Carrier) {
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

    const { carrier_name, maxcapacity, holder, burden } = Carrier;

    return (
        <Card className='m-5 max-w-[750px] mx-auto'>
            <CardContent>
                <Box className="m-5">
                    <h2>แก้ไขเรือ: {carrier_name}</h2>
                </Box>

                <form onSubmit={handleSubmit}>

                    <Stack direction='column' spacing={1} >
                        <label htmlFor="carrier_name">ชื่อเรือ:</label>
                        <TextField variant="outlined" type="text" id="carrier_name" name="carrier_name" value={carrier_name} onChange={handleInputChange} />

                        <label htmlFor="holder">เวลาเตรียมการ (minutes):</label>
                        <TextField variant="outlined" type="text" id="holder" name="holder" value={holder} onChange={handleInputChange} />

                        <label htmlFor="maxcapacity">ความจุสูงสุด:</label>
                        <TextField variant="outlined" type="number" id="maxcapacity" name="maxcapacity" value={maxcapacity} onChange={handleInputChange} />

                        <label htmlFor="burden">เวลาเตรียมการ (นาที):</label>
                        <TextField variant="outlined" type="number" id="burden" name="burden" value={burden} onChange={handleInputChange} />

                    </Stack>

                    <Stack direction='row' spacing={1} className="flex mx-auto justify-between max-w-[720px] mt-5">
                        <Button
                            onClick={() => navigate('/carrier')}
                            variant="contained"
                            fullWidth
                            className='bg-red-500 hover:bg-red-800'
                            startIcon={<ArrowBackIosIcon />}
                        >
                            กลับ
                        </Button>

                        <Button
                            type="submit"
                            variant="contained"
                            fullWidth
                            className='bg-emerald-600 hover:bg-emerald-800'
                            startIcon={<SaveIcon />}
                        >
                            บันทึก
                        </Button>

                    </Stack>

                </form>

            </CardContent>

        </Card>

    );
}
