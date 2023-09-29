import { Formik, Form, Field, ErrorMessage, FormikProps } from 'formik';
import * as Yup from 'yup';
import { CargoCrane } from '../../../../types/CargoCrane.type';
import { Button, MenuItem, Select } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../store/store';
import { TextField } from 'formik-material-ui';
import { Link, useNavigate } from 'react-router-dom';
import { addCargoCrane } from '../../../../store/slices/cargocrane.slice';

type Props = {}


export default function CargoCraneCreate({ }: Props) {
    const FTSReducer = useSelector((state: RootState) => state.FTS);
    const CraneReducer = useSelector((state: RootState) => state.Crane);
    const CargoReducer = useSelector((state: RootState) => state.cargo);
    const dispatch = useDispatch<any>();
    const navigate = useNavigate();

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

    const handleSubmit = async (values: any, { setSubmitting }: any) => {
        try {
            alert(JSON.stringify(values));
            dispatch(addCargoCrane(values, navigate))
            setSubmitting(false);
        } catch (error) {
            console.error('เกิดข้อผิดพลาดในการสร้างรายการ Cargo Crane:', error);
        }
    };

    const showForm = ({ isSubmitting, handleChange, values }: FormikProps<CargoCrane>) => {
        return (
            <Form>
                <Field
                    as={Select}
                    name='FTS_id'
                    value={values.FTS_id}
                    onChange={handleChange}
                    fullWidth
                >

                    {(FTSReducer.FTS).map((items) => (
                        <MenuItem key={items.fts_id} value={items.fts_id}>
                            {items.FTS_name}
                        </MenuItem>
                    ))}
                </Field>
                <ErrorMessage name="FTS_id" component="div" />
                <Field
                    as={Select}
                    name='crane_id'
                    value={values.crane_id}
                    onChange={handleChange}
                    fullWidth
                >
                    {(CraneReducer.result).map((items: any) => (
                        <MenuItem key={items.id} value={items.id}>
                            {items.crane_name}
                        </MenuItem>
                    ))}
                </Field>
                <ErrorMessage name="crane_id" component="div" />
                <Field
                    as={Select}
                    name='category'
                    value={values.category}
                    onChange={handleChange}
                    fullWidth
                >
                    <MenuItem value='Import'>Import</MenuItem>
                    <MenuItem value='Export'>Export</MenuItem>
                </Field>
                <ErrorMessage name="category" component="div" />
                <Field
                    as={Select}
                    name='cargo_id'
                    value={values.cargo_id}
                    onChange={handleChange}
                    fullWidth
                >
                    {(CargoReducer.cargo).map((items) => (
                        <MenuItem key={items.cargo_id} value={items.cargo_id}>
                            {items.cargo_name}
                        </MenuItem>
                    ))}
                </Field>
                <ErrorMessage name="cargo_id" component="div" />
                <Field
                    component={TextField}
                    type="number"
                    name="consumption_rate"
                    fullWidth
                />
                <ErrorMessage name="consumption_rate" component="div" />
                <Field
                    component={TextField}
                    type="number"
                    name="work_rate"
                    fullWidth
                />
                <ErrorMessage name="work_rate" component="div" />
                <Button
                    type="submit"
                    disabled={isSubmitting}>
                    Create
                </Button>
                <Button component={Link} to={'/cargocrane'}>
                    กลับ
                </Button>
            </Form>
        )
    }

    return (
        <div>
            <h2>สร้างรายการ Cargo Crane</h2>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {(props: any) => showForm(props)}
            </Formik>
        </div>
    );
};
