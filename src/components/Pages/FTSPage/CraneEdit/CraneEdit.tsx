import { Button, Box, Select, MenuItem, FormControl, InputLabel, createTheme, Card, ThemeProvider, CardContent, Typography, Stack } from '@mui/material'
import { Field, Form, Formik, FormikProps } from 'formik';
import { TextField } from 'formik-material-ui';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../store/store';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FTS } from '../../../../types/FloatingCrane.type';
import { Crane } from '../../../../types/crane.type';
import { getCraneById, updateCrane } from '../../../../store/slices/crane.edit.slice';
import { useEffect } from 'react';

type Props = {}

const defaultTheme = createTheme();

export default function CraneEdit({ }: Props) {
    const { id } = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch<any>();
    const CraneSlice = useSelector((state: RootState) => state.Crane);
    const FTSSlice = useSelector((state: RootState) => state.FTS);

    useEffect(() => {
        dispatch(getCraneById(id))
    }, [dispatch, id]);

    const handleSubmit = async (values: any, { isSubmitting }: any) => {
        dispatch(updateCrane(values, navigate, id))
        isSubmitting(false)
    }

    const showForm = ({ values, isSubmitting, handleChange }: FormikProps<Crane>) => {
        return (
            <Form>
                <Field
                    component={TextField}
                    style={{ marginTop: 16 }}
                    name='crane_name'
                    id='crane_name'
                    type='text'
                    label='ชื่อเครน'
                    fullWidth
                />
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">ชื่อ</InputLabel>
                    <Field
                        as={Select}
                        name='FTS_id'
                        label='ชื่อ'
                        value={values.FTS_id}
                        onChange={(e: any) => {
                            const selectedFTS = (FTSSlice.FTS).find(
                                (item) => item.fts_id === e.target.value
                            );
                            if (selectedFTS) {
                                handleChange({
                                    target: {
                                        name: 'FTS_id',
                                        value: selectedFTS.fts_id,
                                    },
                                });
                            }
                        }}
                        fullWidth
                    >
                        {(FTSSlice.FTS).map((item: FTS) => (
                            <MenuItem key={item.fts_id} value={item.fts_id}>
                                {item.FTS_name}
                            </MenuItem>
                        ))}
                    </Field>
                </FormControl>
                <Field
                    component={TextField}
                    style={{ marginTop: 16 }}
                    name='setuptime_crane'
                    id='setuptime_crane'
                    type='number'
                    label='เวลาเตรียมความพร้อม (นาที)'
                    fullWidth
                />
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
                        เพิ่มเครน
                    </Button>
                </Stack>
            </Form>
        )
    }

    const initialValues: Crane = {
        crane_id: 0, crane_name: '', FTS_id: 0, setuptime_crane: 0,
    }

    return (
        <ThemeProvider theme={defaultTheme}>
            <Box className="flex justify-center items-center">
                <Card>
                    <CardContent>
                        <Box className='flex justify-between'>
                            <Typography component="h1" variant="h5">
                                แก้ไขเครน
                            </Typography>
                            <Button variant="outlined" component={Link} to="/transferstation/create">เพิ่มทุ่น</Button>
                        </Box>
                        <Formik
                            onSubmit={handleSubmit}
                            initialValues={CraneSlice.result ? CraneSlice.result : initialValues}
                        >
                            {(props: any) => showForm(props)}
                        </Formik>
                    </CardContent>
                </Card>
            </Box>
        </ThemeProvider >
    )
}