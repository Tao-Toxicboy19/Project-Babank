import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CardContent, Stack, Button, TextField, Card, FormControlLabel, FormControl, FormLabel, Radio, RadioGroup } from '@mui/material';
import { useDispatch } from 'react-redux';
import { Carrier } from '../../../../types/Carrier.type';
import { server } from '../../../../Constants';
import { updateCarrier } from '../../../../store/slices/Carrier/carrier.edit.slice';
import { httpClient } from '../../../../utils/httpclient';

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
                const response = await httpClient.get(`${server.CARRIER}/${id}`);
                setCarrierData(response.data);
            } catch (error) {
                console.error('เกิดข้อผิดพลาดในการดึงข้อมูล FTS:', error);
            }
        };
        fetchFTSData();
    }, []);

    const handleInputChange = (event: any) => {
        const { name, value } = event.target;
        const numericValue = parseFloat(value);

        setCarrierData((prevCraneData: any) => ({
            ...prevCraneData!,
            [name]: numericValue,
        }));
    };


    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            console.log(CarrierData)
            await dispatch(updateCarrier(id, CarrierData, navigate))
            setIsSubmitting(false);
        } catch (error) {
            setIsSubmitting(false);
        }
        setIsSubmitting(true);
    };

    return (
        <Card className="w-[750px] mx-auto">
            <CardContent className="m-5">
                <form onSubmit={handleSubmit}>
                    <Stack direction='column' spacing={1}>
                        <label className="pr-5 font-kanit" htmlFor="carrier_name">ชื่อเรือ:</label>
                        <TextField
                            variant="outlined"
                            type="text"
                            id="carrier_name"
                            name="carrier_name"
                            value={CarrierData?.carrier_name}
                            onChange={handleInputChange}
                            fullWidth
                        />

                        <label className="pr-5 font-kanit" htmlFor="holder">ชื่อบริษัท:</label>
                        <TextField
                            variant="outlined"
                            type="text"
                            id="holder"
                            name="holder"
                            value={CarrierData?.holder}
                            onChange={handleInputChange}
                            fullWidth
                        />

                        <label htmlFor="maxcapacity" className='font-kanit'>ความจุสูงสุด (ตัน):</label>
                        <TextField
                            variant="outlined"
                            type="number"
                            id="maxcapacity"
                            name="maxcapacity"
                            value={CarrierData?.maxcapacity}
                            onChange={handleInputChange}
                            fullWidth
                        />

                        <label className="pr-5 font-kanit" htmlFor="burden">จำนวนระวาง:</label>
                        <TextField
                            variant="outlined"
                            type="number"
                            id="burden"
                            name="burden"
                            value={CarrierData?.burden}
                            onChange={handleInputChange}
                            fullWidth
                        />
                        <label className="pr-5 font-kanit" htmlFor="carrier_max_FTS">จำนวนทุ่นเข้าได้สูงสุด:</label>
                        <TextField
                            variant="outlined"
                            type="number"
                            id="carrier_max_FTS"
                            name="carrier_max_FTS"
                            value={CarrierData?.carrier_max_FTS}
                            onChange={handleInputChange}
                            fullWidth
                        />
                        <label className="pr-5 font-kanit" htmlFor="carrier_max_crane">จำนวนเครนเข้าได้สูงสุด:</label>
                        <TextField
                            variant="outlined"
                            type="number"
                            id="carrier_max_crane"
                            name="carrier_max_crane"
                            value={CarrierData?.carrier_max_crane}
                            onChange={handleInputChange}
                            fullWidth
                        />
                        <label className="pr-5 font-kanit" htmlFor="Width">กว้าง (เมตร):</label>
                        <TextField
                            variant="outlined"
                            type="number"
                            id="Width"
                            name="Width"
                            value={CarrierData?.Width}
                            onChange={handleInputChange}
                            fullWidth
                        />
                        <label className="pr-5 font-kanit" htmlFor="length">ยาว (เมตร):</label>
                        <TextField
                            variant="outlined"
                            type="number"
                            id="length"
                            name="length"
                            value={CarrierData?.length}
                            onChange={handleInputChange}
                            fullWidth
                        />

                        <FormControl style={{ marginTop: 16 }}>
                            <FormLabel id="demo-form-control-label-placement" className='text-md'>เครนบนเรือ</FormLabel>
                            <RadioGroup
                                row
                                name="has_crane"
                                aria-labelledby="demo-form-control-label-placement"
                                value={CarrierData?.has_crane} // กำหนดค่าเริ่มต้นจากค่าใน CarrierData
                                onChange={handleInputChange} // เมื่อผู้ใช้เลือกรายการใน RadioGroup
                            >
                                <FormControlLabel value="has" control={<Radio />} label="มี" />
                                <FormControlLabel value="no" control={<Radio />} label="ไม่มี" />
                            </RadioGroup>
                        </FormControl>



                    </Stack>
                    <Stack direction='row' spacing={2} sx={{ marginTop: 2 }}>
                        <Button
                            fullWidth
                            variant="outlined"
                            sx={{ mt: 3, mb: 2 }}
                            onClick={() => navigate('/carrier')}
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
    );
}