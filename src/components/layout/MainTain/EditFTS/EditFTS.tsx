import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { httpClient } from '../../../../utils/httpclient';
import { server } from '../../../../Constants';
import { Box, Button, Card, CardContent, InputLabel, Stack, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { updateMainTainFTS } from '../../../../store/slices/MainTain/FTSEditSlice';
import { useDispatch } from 'react-redux';


export default function EditFTS() {
    const { id } = useParams();
    const dispatch = useDispatch<any>()
    const [isSubmitting, _] = useState(false);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        desc_FTS: '',
        downtime_FTS: '',
        start_time_FTS: '',
    });
    const {
        register,
        handleSubmit,
        formState: { },
    } = useForm();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await httpClient.get(`${server.MAINTAIN_FTS_URL}/${id}`);
                const data = result.data;
                console.log(result.data)
                setFormData(data); // อัปเดตสถานะ formData ด้วยข้อมูลจาก API
            } catch (error) {
                // จัดการข้อผิดพลาดที่เกิดขึ้นที่นี่
            }
        }

        fetchData();
    }, [id]);

    const handleChange = (e: any) => {
        const name = e.target.name;
        let value = e.target.value;

        // ถ้าฟิลด์เป็น "downtime_FTS" ให้แปลงค่าให้กลายเป็นวันเวลา Date object
        if (name === 'downtime_FTS') {
            value = new Date(value);
        }

        setFormData({
            ...formData,
            [name]: value,
        });
    }

    function convertDateTimeFormat(dateTime: any) {
        const date = new Date(dateTime);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const seconds = date.getSeconds().toString().padStart(2, '0');

        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }


    return (
        <>
            <Card className='max-w-[750px] mx-auto'>
                <CardContent>
                    <form onSubmit={handleSubmit((data: any) => {
                        if (data.downtime_FTS) {
                            data.downtime_FTS = convertDateTimeFormat(data.downtime_FTS);
                        } else {
                            data.downtime_FTS = '';
                        }
                        if (data.start_time_FTS) {
                            data.start_time_FTS = convertDateTimeFormat(data.start_time_FTS);
                        } else {
                            data.start_time_FTS = '';
                        }

                        dispatch(updateMainTainFTS(id, data, navigate));
                    })}>
                        <Box className='w-full'>
                            <InputLabel id="cr_id" className='font-kanit'>วัน-เวลา สิ้นสุด</InputLabel>
                            <TextField
                                {...register('desc_FTS')}
                                id='deadline_time'
                                type='text'
                                value={formData.desc_FTS}
                                onChange={handleChange}
                                fullWidth
                            />
                        </Box>
                        <Box className='w-full'>
                            <InputLabel id="cr_id" className='font-kanit'>วัน-เวลา มาถึง</InputLabel>
                            <TextField
                                {...register('downtime_FTS')}
                                id='arrival_time'
                                type='datetime-local'
                                onChange={handleChange}
                                fullWidth
                            />
                        </Box>
                        <Box className='w-full'>
                            <InputLabel id="cr_id" className='font-kanit'>วัน-เวลา สิ้นสุด</InputLabel>
                            <TextField
                                {...register('start_time_FTS')}
                                id='deadline_time'
                                type='datetime-local'
                                onChange={handleChange}
                                fullWidth
                            />
                        </Box>
                        <Stack spacing={2} direction='row' className='mt-2'>
                            <Button
                                fullWidth
                                variant="outlined"
                                sx={{ mt: 3, mb: 2 }}
                                component={Link}
                                to={'/transferstation'}
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
        </>
    );
}
