import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FormControl, InputLabel, MenuItem, Select, Button, Card, CardContent, Stack } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { loadFTSsolution } from '../../../../store/slices/FTSsolution.slice';
import { RootState } from '../../../../store/store';
import SolutionSingle from './SolutionSingle'; // นำเข้าคอมโพเนนต์ SolutionSingle ของคุณ

type Props = {};

export default function FTSsingle({ }: Props) {
    const FTSsolutionSlice = useSelector((state: RootState) => state.FTSsolution);
    const [selectedValue, setSelectedValue] = useState<string>('');

    const dispatch = useDispatch<any>();
    useEffect(() => {
        dispatch(loadFTSsolution());
    }, []);

    const validationSchema = Yup.object().shape({
        selectedValue: Yup.string().required('กรุณาเลือกชื่อทุ่น')
    });

    // ฟังก์ชันเพื่อค้นหาข้อมูลที่ตรงกับ selectedValue
    const findSelectedData: any = () => {
        const selectedData = FTSsolutionSlice.result.find(item => item.FTS_name === selectedValue);
        return selectedData || {};
    };

    return (
        <>
            <Formik
                initialValues={{ selectedValue: '' }}
                validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting }) => {
                    setSelectedValue(values.selectedValue);
                    setSubmitting(false);
                }}
            >
                {({ errors, touched, isSubmitting }) => (
                    <Form>
                        <Card sx={{ maxWidth: 505 }}>
                            <CardContent>
                                <Stack direction='row' spacing={3}>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">ชื่อทุ่น</InputLabel>
                                        <Field
                                            as={Select}
                                            name="selectedValue"
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            label="Age"
                                        >
                                            {FTSsolutionSlice.result.map((item) => (
                                                <MenuItem key={item.FTS_name} value={item.FTS_name}>
                                                    {item.FTS_name}
                                                </MenuItem>
                                            ))}
                                        </Field>
                                        {touched.selectedValue && errors.selectedValue && (
                                            <div className="error">{errors.selectedValue}</div>
                                        )}
                                    </FormControl>
                                    <Button
                                        variant="outlined"
                                        type="submit"
                                        disabled={isSubmitting}
                                    >
                                        Submit
                                    </Button>
                                </Stack>

                                <SolutionSingle selectedValue={selectedValue} findSelectedData={findSelectedData} />
                            </CardContent>
                        </Card >
                    </Form>
                )}
            </Formik>
        </>
    );
}
