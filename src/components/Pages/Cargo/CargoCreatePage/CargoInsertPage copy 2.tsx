import React, { useState } from 'react';
import axios from 'axios';
import { server } from '../../../../Constants';

const CargoCreatePage: React.FC = () => {
    const [cargoNames, setCargoNames] = useState<string[]>([]);
    const [newCargoName, setNewCargoName] = useState<string>('');

    const handleAddCargo = () => {
        if (newCargoName.trim() !== '') {
            setCargoNames([...cargoNames, newCargoName]);
            setNewCargoName('');
        }
    };

    const handleRemoveCargo = (index: number) => {
        const updatedCargoNames = [...cargoNames];
        updatedCargoNames.splice(index, 1);
        setCargoNames(updatedCargoNames);
    };

    const handleSubmit = async () => {
        try {
            // ส่งข้อมูลสินค้าไปยัง API
            await axios.post(`${server.CARGO}`, { cargo_names: cargoNames });

            // เมื่อสำเร็จในการโพสต์ข้อมูล
            alert('เพิ่มข้อมูลสินค้าสำเร็จ');
            setCargoNames([]);
            setNewCargoName('');
        } catch (error) {
            console.error('เกิดข้อผิดพลาดในการโพสต์ข้อมูลสินค้า:', error);
            alert('เกิดข้อผิดพลาดในการโพสต์ข้อมูลสินค้า');
        }
    };

    return (
        <div>
            <h2>เพิ่มข้อมูลสินค้า</h2>
            <div>
                <input
                    type="text"
                    placeholder="ชื่อสินค้าใหม่"
                    value={newCargoName}
                    onChange={(e) => setNewCargoName(e.target.value)}
                />
                <button onClick={handleAddCargo}>เพิ่ม</button>
            </div>
            <ul>
                {cargoNames.map((cargoName, index) => (
                    <li key={index}>
                        {cargoName}
                        <button onClick={() => handleRemoveCargo(index)}>ลบ</button>
                    </li>
                ))}
            </ul>
            <button onClick={handleSubmit}>บันทึกข้อมูล</button>
        </div>
    );
};

export default CargoCreatePage;
