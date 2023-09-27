import { Field, Form, Formik, FormikProps } from "formik"
import { CargoCrane } from "../../../../types/CargoCrane.type"
import { Button, MenuItem, Select } from "@mui/material"
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import { loadCrane } from "../../../../store/slices/crane.slice";
import { useEffect } from "react";
import { TextField } from "formik-material-ui";
import { addCargoCrane } from "../../../../store/slices/cargocrane.slice";
import { useNavigate } from "react-router-dom";

type Props = {}

export default function CargoCraneCreate({ }: Props) {
    const FTSReducer = useSelector((state: RootState) => state.FTS);
    const CargoReducer = useSelector((state: RootState) => state.cargo);
    const CraneReducer = useSelector((state: RootState) => state.Crane);
    const dispatch = useDispatch<any>();
    const naviagte = useNavigate();

    useEffect(() => {
        dispatch(loadCrane())
    }, []);

    const handleSubmit = (values: any, { setSubmitting }: any) => {
        // dispatch(addCargoCrane(values, naviagte))
        alert(JSON.stringify(values))
        setSubmitting(false)
    }

    const showForm = ({ values, handleChange }: FormikProps<CargoCrane>) => {
        return (
            <Form>
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
                <Field
                    component={TextField}
                    name='consumption_rate'
                    type='number'
                    fullWidth
                />
                <Field
                    component={TextField}
                    name='work_rate'
                    type='work_rate'
                    fullWidth
                />
                <Button type="submit" variant="outlined">
                    Submit
                </Button>
            </Form >
        )
    }

    const initialValues: CargoCrane = {
        crane_id: 0,
        cargo_id: 0,
        FTS_id: 0,
        consumption_rate: 0,
        work_rate: 0,
        category: '',
    }

    return (
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
            {(props: any) => showForm(props)}
        </Formik>
    )
}