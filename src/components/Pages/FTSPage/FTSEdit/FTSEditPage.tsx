import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { server } from '../../../../Constants';
import { Box, CircularProgress } from '@mui/material';
import { FTS } from '../../../../types/FloatingCrane.type';

type Props = {
};

export default function FTSEditPage({ }: Props) {
  const [FTSData, setFTSData] = useState<FTS | null>(null);
  const { id } = useParams()
  const navigate = useNavigate()

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

    // ตัวอย่างการอัปเดต state
    setFTSData((prevFTSData: any) => ({
      ...prevFTSData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await axios.put(`${server.FLOATING}/${id}`, FTSData);
      alert('บันทึกข้อมูลเรียบร้อยแล้ว');
      navigate('/transferstation')
    } catch (error) {
      console.error('เกิดข้อผิดพลาดในการอัปเดตข้อมูล FTS:', error);
    }
  };

  if (!FTSData) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%"
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  const { FTS_name, lat, lng, setuptime_FTS, speed } = FTSData;

  return (
    <div>
      <h2>Edit FTS: {FTS_name}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="FTS_name">FTS Name:</label>
          <input type="text" id="FTS_name" name="FTS_name" value={FTS_name} onChange={handleInputChange} />
        </div>
        <div>
          <label htmlFor="lat">Latitude:</label>
          <input type="number" id="lat" name="lat" value={lat} onChange={handleInputChange} />
        </div>
        <div>
          <label htmlFor="lng">Longitude:</label>
          <input type="number" id="lng" name="lng" value={lng} onChange={handleInputChange} />
        </div>
        <div>
          <label htmlFor="setuptime_FTS">Setup Time (minutes):</label>
          <input type="number" id="setuptime_FTS" name="setuptime_FTS" value={setuptime_FTS} onChange={handleInputChange} />
        </div>
        <div>
          <label htmlFor="speed">Speed:</label>
          <input type="number" id="speed" name="speed" value={speed} onChange={handleInputChange} />
        </div>
        <button type="submit">Save</button>
        <button onClick={() => navigate('/transferstation')}>กลับ</button>
      </form>
    </div>
  );
}
