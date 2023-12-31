import { Alert, Box, Button, Card, CardContent, FormControl, InputLabel, MenuItem, Select, Stack, TextField, ThemeProvider, createTheme } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Titles from '../../../layout/Titles/Titles';
import { useAppDispatch } from '../../../../store/store';
import { cargoCraneAddAsync } from '../../../../store/slices/CargoCrane/cargoCraneAddSlice';
import { cargoSelector } from '../../../../store/slices/Cargo/cargoSlice';
import { ftsSelector } from '../../../../store/slices/FTS/ftsSlice';
import { craneSelector } from '../../../../store/slices/Crane/craneSlice';
import { CLOSE, SAVE } from '../../../../Constants';

type Props = {}

const defaultTheme = createTheme();

export default function CargoCraneCreate({ }: Props) {
    const FTSReducer = useSelector(ftsSelector)
    const CraneReducer = useSelector(craneSelector)
    const CargoReducer = useSelector(cargoSelector)
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const [isSubmitting, setIsSubmitting] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const showForm = () => {
        return (
            <form
                onSubmit={handleSubmit(async (data) => {
                    setIsSubmitting(true);
                    try {
                        await dispatch(cargoCraneAddAsync({ data, navigate }))
                        setIsSubmitting(false);
                    } catch (error) {
                        setIsSubmitting(false)
                    }
                    console.log(data)
                })}>
                <Box className='grid grid-cols-2 gap-5 mt-5'>
                    <Stack direction='column' spacing={4}>
                        <Box>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">เลือกทุ่น</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label="เลือกทุ่น"
                                    {...register('FTS_id', { required: true })}
                                >
                                    {(FTSReducer.result).map((items) => (
                                        <MenuItem key={items.fts_id} value={items.fts_id} className='font-kanit'>
                                            {items.FTS_name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            {errors.FTS_id &&
                                <Alert variant="outlined" severity="error" className='mt-2'>
                                    กรุณากรอกข้อมูล
                                </Alert>
                            }
                        </Box>

                        <Box>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">เลือกสินค้า</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label="เลือกสินค้า"
                                    {...register('cargo_id', { required: true })}
                                >
                                    {(CargoReducer.result).map((items) => (
                                        <MenuItem key={items.cargo_id} value={items.cargo_id} className='font-kanit'>
                                            {items.cargo_name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            {errors.crane_id &&
                                <Alert variant="outlined" severity="error" className='mt-2'>
                                    กรุณากรอกข้อมูล
                                </Alert>}
                        </Box>

                        <Box>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">เลือกเครน</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label="เลือกเครน"
                                    {...register('crane_id', { required: true })}
                                >
                                    {(CraneReducer.result).map((items) => (
                                        <MenuItem key={items.id} value={items.id} className='font-kanit'>
                                            {items.crane_name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            {errors.cargo_id &&
                                <Alert variant="outlined" severity="error" className='mt-2'>
                                    กรุณากรอกข้อมูล
                                </Alert>}
                        </Box>

                    </Stack>

                    <Stack direction='column' spacing={4}>

                        <Box>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">สถานะสินค้า (ขาเข้า/ขาออก)</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label="สถานะสินค้า (ขาเข้า/ขาออก)"
                                    {...register('category', { required: true })}
                                >
                                    <MenuItem value='import' className='font-kanit'>Import</MenuItem>
                                    <MenuItem value='export' className='font-kanit'>Export</MenuItem>
                                </Select>
                            </FormControl>
                            {errors.category &&
                                <Alert variant="outlined" severity="error" className='mt-2'>
                                    กรุณากรอกข้อมูล
                                </Alert>}
                        </Box>

                        <Box>
                            <TextField
                                id='consumption_rate'
                                label='อัตราการขนถ่ายสินค้า (ตัน/ชม.)'
                                type='number'
                                fullWidth
                                className='font-kanit'
                                {...register('consumption_rate', { required: true, valueAsNumber: true })}
                            />
                            {errors.consumption_rate &&
                                <Alert variant="outlined" severity="error" className='mt-2'>
                                    กรุณากรอกข้อมูล
                                </Alert>}
                        </Box>

                        <Box>
                            <TextField
                                id='work_rate'
                                label='อัตราการใช้น้ำมัน (ลิตร/ตัน)'
                                type='number'
                                fullWidth
                                className='font-kanit'
                                {...register('work_rate', { required: true, valueAsNumber: true })}
                            />
                            {errors.work_rate &&
                                <Alert variant="outlined" severity="error" className='mt-2'>
                                    กรุณากรอกข้อมูล
                                </Alert>}
                        </Box>
                    </Stack>

                    <Stack direction='row' spacing={2} className='col-span-2 flex'>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            className='bg-blue-600 hover:bg-blue-700 font-kanit text-lg py-3'
                            disabled={isSubmitting}
                        >
                            {SAVE}
                        </Button>
                        <Button
                            fullWidth
                            variant="outlined"
                            onClick={() => navigate('/cargocrane')}
                            className='font-kanit text-lg py-3'
                        >
                            {CLOSE}
                        </Button>
                    </Stack>
                </Box>
            </form >
        )
    }

    return (
        <ThemeProvider theme={defaultTheme}>
            <Card className='min-h-[90vh]'>
                <CardContent>
                    <Box className='flex justify-start'>
                        <Titles title='ข้อมูลสินค้าและเครน' title2='เพิ่มข้อมูล' />
                    </Box>
                    <Box>
                        {showForm()}
                    </Box>
                </CardContent>
            </Card>
        </ThemeProvider >
    )
}