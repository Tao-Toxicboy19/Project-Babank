import React, { useState } from 'react'
import { Button, Box, Fab, Dialog, DialogContent, DialogTitle, Slide, Tooltip, Card, CardContent, Typography, TextField } from '@mui/material'
import { TransitionProps } from '@mui/material/transitions';
import axios from 'axios';
import { server } from '../../../../Constants';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AddIcon from '@mui/icons-material/Add';
import DoneIcon from '@mui/icons-material/Done';

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
            <>
                <Box className="mt-[-15px] text-lg text-bold">
                    <h2>เพิ่มข้อมูลสินค้า</h2>
                </Box>
                <Box className="flex justify-between mt-5">
                    <TextField
                        variant="outlined"
                        type="text"
                        label="ชื่อสินค้า"
                        fullWidth
                        value={newCargoName}
                        onChange={(e) => setNewCargoName(e.target.value)}
                    />

                    <Button
                        variant="contained"
                        type="submit"
                        startIcon={<AddIcon />}
                        className='bg-sky-600 hover:bg-sky-800 mx-5 my-3 h-full'
                        onClick={handleAddCargo}
                    >
                        เพิ่ม
                    </Button>
                </Box>

                <Box className="m-5">
                    <Typography>
                        รายการสินค้าทั้งหมด
                    </Typography>
                </Box>
                <Box className="w-full">
                    {cargoNames.map((cargoName, index) => (
                        <Box key={index} className="flex justify-between">
                            <Typography className='flex items-center' variant='h6'>
                                {cargoName}
                            </Typography>
                            <Button
                                variant="contained"
                                type="submit"
                                startIcon={<DeleteForeverIcon />}
                                className="mx-5 my-3 bg-red-800 hover:bg-red-950 flex"
                                onClick={() => handleRemoveCargo(index)}>
                                ลบ
                            </Button>
                        </Box>
                    ))}
                </Box>

                <Button
                    variant="contained"
                    type="submit"
                    startIcon={<DoneIcon />}
                    className="bg-emerald-600 hover:bg-green-800 mt-5"
                    fullWidth
                    onClick={handleSubmit}>บันทึกข้อมูล
                </Button>

            </>
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
                fullWidth
            >
                <DialogTitle>{"เพิ่มสินค้า"}</DialogTitle>
                <Card>
                    <CardContent className="">
                        <DialogContent>
                            {showForm()}
                        </DialogContent>
                    </CardContent>
                </Card>
            </Dialog>
        </div>
    )
}