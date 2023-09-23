import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { server } from '../../../../Constants';
import { Box, CircularProgress } from '@mui/material';
import { Carrier } from '../../../../types/Carrier.type';

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
        <div>
            <h2>Edit Crane: {carrier_name}</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="carrier_name">Crane Name:</label>
                    <input type="text" id="carrier_name" name="carrier_name" value={carrier_name} onChange={handleInputChange} />
                </div>
                <div>
                    <label htmlFor="holder">Setup Time (minutes):</label>
                    <input type="text" id="holder" name="holder" value={holder} onChange={handleInputChange} />
                </div>
                <div>
                    <label htmlFor="maxcapacity">FTS ID:</label>
                    <input type="number" id="maxcapacity" name="maxcapacity" value={maxcapacity} onChange={handleInputChange} />
                </div>
                <div>
                    <label htmlFor="burden">Setup Time (minutes):</label>
                    <input type="number" id="burden" name="burden" value={burden} onChange={handleInputChange} />
                </div>
                <button type="submit">Save</button>
                <button onClick={() => navigate('/carrier')}>กลับ</button>
            </form>
        </div>
    );
}
