import { Formik, Form, Field, FormikProps } from 'formik';
import * as Yup from 'yup';
import { CargoCrane } from '../../../../types/CargoCrane.type';
import { Box, Button, Card, CardContent, MenuItem, Select, Stack } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../store/store';
import { TextField } from 'formik-material-ui';
import { Link, useNavigate } from 'react-router-dom';
import { addCargoCrane } from '../../../../store/slices/cargocrane.slice';
import { useState } from 'react';

type Props = {}


export default function CargoCraneCreate({ }: Props) {
    const FTSReducer = useSelector((state: RootState) => state.FTS);
    const CraneReducer = useSelector((state: RootState) => state.Crane);
    const CargoReducer = useSelector((state: RootState) => state.cargo);
    const dispatch = useDispatch<any>();
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);


    const initialValues: any = {
        crane_id: 0,
        cargo_id: 0,
        FTS_id: 0,
        consumption_rate: 0,
        work_rate: 0,
        category: '',
    };

    const validationSchema = Yup.object({
        crane_id: Yup.number().required('กรุณากรอก Crane ID'),
        cargo_id: Yup.number().required('กรุณากรอก Cargo ID'),
        FTS_id: Yup.number().required('กรุณากรอก FTS ID'),
        consumption_rate: Yup.number().required('กรุณากรอก Consumption Rate'),
        work_rate: Yup.number().required('กรุณากรอก Work Rate'),
        category: Yup.string().required('กรุณากรอก Category'),
    });

    const handleSubmit = async (values: any) => {
        setIsSubmitting(true);
        try {
            await dispatch(addCargoCrane(values, navigate))
            setIsSubmitting(false);
        } catch (error) {
            setIsSubmitting(false)
        }
    };

    const showForm = ({ handleChange, values }: FormikProps<CargoCrane>) => {
        return (
            <Form>
                <Stack spacing={2}>
                    <Box>
                        <label htmlFor="FTS_id" className='font-kanit'>เลือกทุ่น:</label>
                        <Field
                            as={Select}
                            name='FTS_id'
                            value={values.FTS_id}
                            onChange={handleChange}
                            fullWidth
                        >

                            {(FTSReducer.FTS).map((items) => (
                                <MenuItem key={items.fts_id} value={items.fts_id} className='font-kanit'>
                                    {items.FTS_name}
                                </MenuItem>
                            ))}
                        </Field>
                    </Box>
                    <Box>
                        <label htmlFor="crane_id" className='font-kanit'>เลือกเครน:</label>
                        <Field
                            as={Select}
                            name='crane_id'
                            value={values.crane_id}
                            onChange={handleChange}
                            fullWidth
                        >
                            {(CraneReducer.result).map((items: any) => (
                                <MenuItem className='font-kanit' key={items.id} value={items.id}>
                                    {items.crane_name}
                                </MenuItem>
                            ))}
                        </Field>
                    </Box>
                    <Box>
                        <label htmlFor="category" className='font-kanit'>เลือกสินค้า:</label>
                        <Field
                            as={Select}
                            name='cargo_id'
                            value={values.cargo_id}
                            onChange={handleChange}
                            fullWidth
                        >
                            {(CargoReducer.cargo).map((items) => (
                                <MenuItem className='font-kanit' key={items.cargo_id} value={items.cargo_id}>
                                    {items.cargo_name}
                                </MenuItem>
                            ))}
                        </Field>
                    </Box>
                    <Box>
                        <label htmlFor="category" className='font-kanit'>สถานะสินค้า (ขาเข้า/ขาออก):</label>
                        <Field
                            as={Select}
                            name='category'
                            value={values.category}
                            onChange={handleChange}
                            fullWidth
                        >
                            <MenuItem value='Import' className='font-kanit'>Import</MenuItem>
                            <MenuItem value='Export' className='font-kanit'>Export</MenuItem>
                        </Field>
                    </Box>
                    <Box>
                        <label htmlFor="category" className='font-kanit'>อัตราการขนถ่ายสินค้า (ตัน/ชม.):</label>
                        <Field
                            component={TextField}
                            type="number"
                            name="consumption_rate"
                            fullWidth
                        />
                    </Box>
                    <Box>
                        <label htmlFor="category" className='font-kanit'>อัตราการใช้น้ำมัน (ลิตร/ตัน):</label>
                        <Field
                            component={TextField}
                            type="number"
                            name="work_rate"
                            fullWidth
                        />
                    </Box>
                    <Stack spacing={2} direction='row'>
                        <Button
                            fullWidth
                            variant="outlined"
                            sx={{ mt: 3, mb: 2 }}
                            component={Link}
                            to={'/cargocrane'}
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
                            เพิ่มสินค้า
                        </Button>
                    </Stack>
                </Stack>
            </Form>
        )
    }

    return (
        <Card sx={{ maxWidth: 750, marginX: 'auto' }}>
            <CardContent>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {(props: any) => showForm(props)}
                </Formik>
            </CardContent>
        </Card>
    );
};
