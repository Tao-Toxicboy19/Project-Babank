import { Button, Box, Select, MenuItem, FormControl, InputLabel, createTheme, Card, ThemeProvider, CardContent, Typography, Stack } from '@mui/material'
import { Field, Form, Formik, FormikProps } from 'formik';
import { TextField } from 'formik-material-ui';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../store/store';
import { Link, useNavigate } from 'react-router-dom';
import { FTS } from '../../../../types/FloatingCrane.type';
import { Crane } from '../../../../types/crane.type';
import { addCrane } from '../../../../store/slices/crane.edit.slice';

type Props = {}

const defaultTheme = createTheme();

export default function CraneCreatePage({ }: Props) {
    const navigate = useNavigate()
    const dispatch = useDispatch<any>();
    const FTSSlice = useSelector((state: RootState) => state.FTS);

    const handleSubmit = async (values: any, { isSubmitting }: any) => {
        dispatch(addCrane(values, navigate))
        isSubmitting(false)
    }

    const showForm = ({ values, isSubmitting, handleChange }: FormikProps<Crane>) => {
        return (
            <Form className="w-[750px]">
                <Field
                    component={TextField}
                    style={{ marginTop: 16 }}
                    name='crane_name'
                    id='crane_name'
                    type='text'
                    label='ชื่อเครน'
                    fullWidth
                />
                <FormControl
                    style={{ marginTop: 16 }}
                    fullWidth
                >
                    <InputLabel id="demo-simple-select-label">เลือกทุ่น</InputLabel>
                    <Field
                        as={Select}
                        name='FTS_id'
                        label='จำนวนเครน'
                        value={values.FTS_id}
                        onChange={handleChange}
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
                        <Box className=" w-full flex justify-between gap-x-2">
                            {/* <Typography className="flex justify-center w-full items-center">
                  เพิ่มทุ่น
                </Typography> */}
                            <Button fullWidth variant="contained" component={Link} to="/transferstation/create" >เพิ่มทุ่น</Button>

                            <Button fullWidth variant="contained" disabled>เพิ่มเครน</Button>

                        </Box>
                        <Formik
                            onSubmit={handleSubmit}
                            initialValues={initialValues}
                        >
                            {(props: any) => showForm(props)}
                        </Formik>
                    </CardContent>
                </Card>
            </Box>
        </ThemeProvider >
    )
}