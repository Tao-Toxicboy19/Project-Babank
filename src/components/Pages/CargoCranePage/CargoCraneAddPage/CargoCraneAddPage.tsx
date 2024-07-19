import { Alert, Box, Button, Card, CardContent, FormControl, InputLabel, MenuItem, Select, Stack, TextField, ThemeProvider, createTheme } from '@mui/material';
import { useFieldArray, useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Titles from '../../../layout/Titles/Titles';
import { useAppDispatch } from '../../../../store/store';
import { cargoCraneAddAsync } from '../../../../store/slices/CargoCrane/cargoCraneAddSlice';
import { cargoSelector } from '../../../../store/slices/Cargo/cargoSlice';
import { ftsSelector } from '../../../../store/slices/FTS/ftsSlice';
import { CLOSE, SAVE } from '../../../../Constants';
import { cargoCraneAsync } from '../../../../store/slices/CargoCrane/cargoCraneSlice';
import { craneSelector } from '../../../../store/slices/Crane/craneSlice';

type Props = {}

const defaultTheme = createTheme()


export default function CargoCraneCreate({ }: Props) {
    const FTSReducer = useSelector(ftsSelector)
    const CargoReducer = useSelector(cargoSelector)
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const [isSubmitting, setIsSubmitting] = useState(false)

    const {
        register,
        handleSubmit,
        setValue,
        control,
        watch,
        formState: { errors },
    } = useForm<any>({
        defaultValues: {
            inputs: [{
                crane_id: null
            }],
        },
    });
    const { fields, append } = useFieldArray({
        control,
        name: 'inputs',
    });

    useEffect(() => {
        dispatch(cargoCraneAsync())
    }, [])

    const [cranes, setCranes] = useState<any[]>([])
    const craneReducer = useSelector(craneSelector)

    useEffect(() => {
        setCranes(craneReducer.result.filter(i => i.FTS_id === watch('FTS_id')))
    }, [watch('FTS_id')])

    console.log(cranes)

    const showForm = () => {
        return (
            <form
                onSubmit={handleSubmit(async (data) => {
                    setIsSubmitting(true);
                    try {
                        console.log(data)
                        await dispatch(cargoCraneAddAsync({ data, navigate }))
                        setIsSubmitting(false);
                    } catch (error) {
                        setIsSubmitting(false)
                    }
                })}>
                <Box className='grid grid-cols-2 gap-5 mt-5'>
                    <Box>
                        <FormControl fullWidth>
                            <InputLabel
                                size='small'
                                id="demo-simple-select-label"
                            >
                                เลือกทุ่น
                            </InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                size='small'
                                label="เลือกทุ่น"
                                {...register('FTS_id', { required: true })}
                                onChange={(e) => setValue('FTS_id', e.target.value)}
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
                            <InputLabel
                                size='small'
                                id="demo-simple-select-label"
                            >
                                สถานะสินค้า (ขาเข้า/ขาออก)
                            </InputLabel>
                            <Select
                                size='small'
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
                </Box>

                {fields.map((_, index) => (
                    <Box key={index} className='my-5 grid grid-cols-2 gap-5'>
                        <Box>
                            <FormControl fullWidth>
                                <InputLabel
                                    size='small'
                                    id="demo-simple-select-label"
                                >
                                    เลือกเครน
                                </InputLabel>
                                <Select
                                    size='small'
                                    labelId="demo-simple-select-label"
                                    id={`inputs.${index}.crane_name`}
                                    label="เลือกเครน"
                                    {...register(`inputs.${index}.crane_id`, { required: true })}
                                >
                                    {(cranes).map((items) => (
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

                        <Box>
                            <FormControl fullWidth>
                                <InputLabel
                                    size='small'
                                    id="demo-simple-select-label"
                                >
                                    เลือกสินค้า
                                </InputLabel>
                                <Select
                                    size='small'
                                    labelId="demo-simple-select-label"
                                    id={`inputs.${index}.cargo_id`}
                                    label="เลือกสินค้า"
                                    {...register(`inputs.${index}.cargo_id`, { required: true })}
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
                            <TextField
                                size='small'
                                id={`inputs.${index}.consumption_rate`}
                                label='อัตราการขนถ่ายสินค้า (ตัน/ชม.)'
                                type='text'
                                fullWidth
                                defaultValue={0}
                                className='font-kanit'
                                {...register(`inputs.${index}.consumption_rate`, { required: true })}
                            />
                            {errors.consumption_rate &&
                                <Alert variant="outlined" severity="error" className='mt-2'>
                                    กรุณากรอกข้อมูล
                                </Alert>}
                        </Box>

                        <Box>
                            <TextField
                                size='small'
                                id={`inputs.${index}.work_rate`}
                                label='อัตราการใช้น้ำมัน (ลิตร/ตัน)'
                                type='text'
                                defaultValue={0}
                                fullWidth
                                className='font-kanit'
                                {...register(`inputs.${index}.work_rate`, { required: true })}
                            />
                            {errors.work_rate &&
                                <Alert variant="outlined" severity="error" className='mt-2'>
                                    กรุณากรอกข้อมูล
                                </Alert>}
                        </Box>
                    </Box>
                ))}
                <Stack direction='row' spacing={2} className='col-span-2 flex'>
                    <Button
                        size='small'
                        type="submit"
                        fullWidth
                        variant="contained"
                        className='bg-blue-600 hover:bg-blue-700 font-kanit text-lg'
                        disabled={isSubmitting}
                    >
                        {SAVE}
                    </Button>
                    <Button
                        size='small'
                        fullWidth
                        variant="outlined"
                        onClick={() => navigate('/cargocrane')}
                        className='font-kanit text-lg'
                    >
                        {CLOSE}
                    </Button>
                </Stack>
            </form >
        )
    }

    return (
        <ThemeProvider theme={defaultTheme}>
            <Card className='min-h-[90vh]'>
                <CardContent>
                    <Box className='flex justify-between'>
                        <Titles title='ข้อมูลสินค้าและเครน' title2='เพิ่มข้อมูล' />
                        <Button
                            onClick={() => append({})}
                        >
                            add
                        </Button>
                    </Box>
                    <Box>
                        {showForm()}
                    </Box>
                </CardContent>
            </Card>
        </ThemeProvider >
    )
}