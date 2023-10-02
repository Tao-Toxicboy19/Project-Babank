import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { server } from '../../../../Constants';
import { Button, Card, CardContent, Stack, TextField } from '@mui/material';
import { FTS } from '../../../../types/FloatingCrane.type';
import { toast } from 'react-toastify';
import Loading from '../../../layout/Loading/Loading';

type Props = {
};

export default function FTSEditPage({ }: Props) {
  const [FTSData, setFTSData] = useState<FTS | null>(null);
  const { id } = useParams()
  const navigate = useNavigate()
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchFTSData = async () => {
      try {
        const response = await axios.get(`${server.FLOATING}/${id}`);
        setFTSData(response.data);
      } catch (error) {
        console.error('เกิดข้อผิดพลาดในการดึงข้อมูล FTS:', error);
      }
    };
    fetchFTSData();
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFTSData((prevFTSData: any) => ({
      ...prevFTSData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      await axios.put(`${server.FLOATING}/${id}`, FTSData);
      setIsSubmitting(false);
      toast.success('แก้ไขทุ่นเรียบร้อย');
      navigate('/transferstation')
    } catch (error) {
      console.error('เกิดข้อผิดพลาดในการอัปเดตข้อมูล FTS:', error);
      setIsSubmitting(false);
    }
  };

  if (!FTSData) {
    return (
      <Loading />
    );
  }

  const { FTS_name, lat, lng, setuptime_FTS, speed } = FTSData;

  return (
    <Card className="w-[750px] mx-auto">
      <CardContent className="m-8">
        <form onSubmit={handleSubmit}>
          <Stack direction='column' spacing={1}>
            <label className="pr-5" htmlFor="FTS_name">ชื่อทุ่น:</label>
            <TextField
              variant="outlined"
              type="text"
              id="FTS_name"
              name="FTS_name"
              value={FTS_name}
              onChange={handleInputChange}
              fullWidth
            />

            <label className="pr-5" htmlFor="lat">ละติจูด:</label>
            <TextField
              variant="outlined"
              type="number"
              id="lat"
              name="lat"
              value={lat}
              onChange={handleInputChange}
              fullWidth
            />

            <label htmlFor="lng">ลองติจูด:</label>
            <TextField
              variant="outlined"
              type="number"
              id="lng"
              name="lng"
              value={lng}
              onChange={handleInputChange}
              fullWidth
            />

            <label className="pr-5" htmlFor="setuptime_FTS">เวลาเตรียมการ (นาที):</label>
            <TextField
              variant="outlined"
              type="number"
              id="setuptime_FTS"
              name="setuptime_FTS"
              value={setuptime_FTS}
              onChange={handleInputChange}
              fullWidth
            />

            <label className="pr-5" htmlFor="speed">ความเร็ว:</label>
            <TextField
              variant="outlined"
              type="number"
              id="speed"
              name="speed"
              value={speed}
              onChange={handleInputChange}
              fullWidth
            />

          </Stack>
          <Stack direction='row' spacing={2} sx={{ marginTop: 2 }}>
            <Button
              fullWidth
              variant="outlined"
              sx={{ mt: 3, mb: 2 }}
              onClick={() => navigate('/transferstation')}
            >
              กลับ
            </Button>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              className='bg-[#1976D2] hover:bg-[#1563BC]'
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
