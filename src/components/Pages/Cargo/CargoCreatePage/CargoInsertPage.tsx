import React, { useState } from 'react'
import AddIcon from '@mui/icons-material/Add';
import { btnColor } from '../../../../style/Styles'
import { Cargo } from '../../../../types/Cargo.type';
import { Button, Box, Select, MenuItem, FormControl, InputLabel, Fab, Dialog, DialogContent, DialogTitle, Slide, Tooltip } from '@mui/material'
import { Field, Form, Formik, FormikProps } from 'formik';
import { TextField } from 'formik-material-ui';
import { useDispatch } from 'react-redux';
import { TransitionProps } from '@mui/material/transitions';
import axios from 'axios';
import { server } from '../../../../Constants';
import { addCargo } from '../../../../store/slices/cargo.slice';

type Props = {}

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function CargoCreate({ }: Props) {
    const [open, setOpen] = React.useState(false);
    const dispatch = useDispatch<any>();
    const [cargoNames, setCargoNames] = useState<string[]>([]);
    const [newCargoName, setNewCargoName] = useState<string>('');

    const handleClose = () => setOpen(false);
    // const handleSubmit = (values: any, { setSubmitting }: any) => {
    //     dispatch(addCargo(values, setOpen))
    //     dispatch(setInsertCargo(values))
    //     alert(JSON.stringify(values))
    //     setSubmitting(false);
    // };

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
            // dispatch(addCargo(cargoNames,))
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

    const showForm = () => {
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
        )
    }

    return (
        <div>
            <Tooltip title="เพิ่มสินค้า">
                <Fab
                    color="primary"
                    aria-label="add"
                    size='small'
                    className='bg-blue-500 hover:bg-blue-700'
                    onClick={() => setOpen(true)}>
                    <AddIcon />
                </Fab>
            </Tooltip>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
                maxWidth="lg"
                fullWidth
            >
                <DialogTitle>{"เพิ่มสินค้า"}</DialogTitle>
                <DialogContent>
                    {showForm()}
                </DialogContent>
            </Dialog>
        </div>
    )
}