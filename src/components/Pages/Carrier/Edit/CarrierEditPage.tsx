import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { server } from '../../../../Constants';
import SaveIcon from '@mui/icons-material/Save';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Carrier } from '../../../../types/Carrier.type';
import { CardContent, Stack, Button, TextField, Card } from '@mui/material';
import { useDispatch } from 'react-redux';
import { updateCarrier } from '../../../../store/slices/carrier.edit.slice';

type Props = {};

export default function CarrierEditPage({ }: Props) {
    const [CarrierData, setCarrierData] = useState<Carrier | null>(null);
    const { id } = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch<any>();
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const fetchFTSData = async () => {
            try {
                const response = await axios.get(`${server.CARRIER}/${id}`);
                setCarrierData(response.data);
            } catch (error) {
                console.error('เกิดข้อผิดพลาดในการดึงข้อมูล FTS:', error);
            }
        };
        fetchFTSData();
    }, []);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;

        setCarrierData((prevFTSData: any) => ({
            ...prevFTSData,
            [name]: value,
        }));
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            await dispatch(updateCarrier(id, CarrierData, navigate))
            setIsSubmitting(false);
        } catch (error) {
            setIsSubmitting(false);
        }
        setIsSubmitting(true);
    };

    return (
        <Card className="w-[750px] mx-auto">
            <CardContent className="m-8">
                <form onSubmit={handleSubmit}>
                    <Stack direction='column' spacing={1}>
                        <label className="pr-5" htmlFor="carrier_name">ชื่อเรือ:</label>
                        <TextField
                            variant="outlined"
                            type="text"
                            id="carrier_name"
                            name="carrier_name"
                            value={CarrierData?.carrier_name}
                            onChange={handleInputChange}
                            fullWidth
                        />

                        <label className="pr-5" htmlFor="holder">ชื่อบริษัท:</label>
                        <TextField
                            variant="outlined"
                            type="text"
                            id="holder"
                            name="holder"
                            value={CarrierData?.holder}
                            onChange={handleInputChange}
                            fullWidth
                        />

                        <label htmlFor="maxcapacity">ความจุสูงสุด (ตัน):</label>
                        <TextField
                            variant="outlined"
                            type="number"
                            id="maxcapacity"
                            name="maxcapacity"
                            value={CarrierData?.maxcapacity}
                            onChange={handleInputChange}
                            fullWidth
                        />

                        <label className="pr-5" htmlFor="burden">จำนวนระวาง:</label>
                        <TextField
                            variant="outlined"
                            type="number"
                            id="burden"
                            name="burden"
                            value={CarrierData?.burden}
                            onChange={handleInputChange}
                            fullWidth
                        />
                    </Stack>
                    <Stack direction='row' spacing={1} className="flex justify-between mt-10">
                        <Button
                            className="bg-red-400 rounded-lg py-2 px-6 hover:bg-red-800"
                            variant="contained"
                            fullWidth
                            startIcon={<ArrowBackIosIcon />}
                            onClick={() => navigate('/transferstation')}>
                            กลับ
                        </Button>

                        <Button
                            className="bg-green-500 rounded-lg py-2 px-6 hover:bg-green-900"
                            variant="contained"
                            fullWidth
                            startIcon={<SaveIcon />}
                            type="submit"
                            disabled={isSubmitting}
                        >
                            บันทึก
                        </Button>
                    </Stack>
                </form>
            </CardContent>
        </Card>
    );
}