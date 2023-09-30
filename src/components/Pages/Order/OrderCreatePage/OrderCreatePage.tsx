import { Formik, Form, Field, FormikProps, FieldArray } from 'formik';
import { Button, MenuItem, Select } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../store/store';
import { TextField } from 'formik-material-ui';
import { Link, useNavigate } from 'react-router-dom';
import { Orders } from '../../../../types/Order.type';

type Props = {}

const initialValues: Orders = {
  or_id: 0,
  cr_id: 0,
  category: '',
  arrival_time: '',
  deadline_time: '',
  latitude: 0,
  longitude: 0,
  maxFTS: 0,
  penalty_rate: 0,
  reward_rate: 0,
  carrier: {
    cr_id: 0,
    carrier_name: '',
    holder: '',
    maxcapacity: 0,
    burden: 0,
  },
  cargo_order: [
    {
      order_id: 0,
      cargo_id: 0,
      load: 0,
      bulk: 0,
      cargo: {
        cargo_id: 0,
        cargo_name: '',
      },
    },
  ],
};

export default function CargoCraneCreate({ }: Props) {
  const CargoReducer = useSelector((state: RootState) => state.cargo);

  const handleSubmit = async (values: any, { setSubmitting }: any) => {
    try {
      console.log(values);
      setSubmitting(false);
    } catch (error) {
      console.error('เกิดข้อผิดพลาดในการสร้างรายการ Cargo Crane:', error);
    }
  };

  const showForm = ({ isSubmitting, handleChange, values }: FormikProps<Orders>) => {
    return (
      <Form>
        <Field
          component={TextField}
          type="number"
          name="cr_id"
          id="cr_id"
          fullWidth
        />
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
          name='arrival_time'
          type='datetime-local'
          label='วัน-เวลา มาถึง'
          fullWidth
        />
        <Field
          component={TextField}
          name='deadline_time'
          type='datetime-local'
          label='วัน-เวลา มาถึง'
          fullWidth
        />
        <Field
          component={TextField}
          name="latitude"
          label="Latitude"
          id="latitude"
          fullWidth
        />
        <Field
          component={TextField}
          type="number"
          name="longitude"
          id="longitude"
          fullWidth
        />
        <Field
          component={TextField}
          type="number"
          name="maxFTS"
          id="maxFTS"
          fullWidth
        />
        <Field
          component={TextField}
          type="number"
          name="penalty_rate"
          id="penalty_rate"
          fullWidth
        />
        <Field
          component={TextField}
          type="number"
          name="reward_rate"
          id="reward_rate"
          fullWidth
        />
        <FieldArray
          name="cargo_order"
          render={arrayHelpers => (
            <div>
              {values.cargo_order.map((cargo, index) => (
                <div key={cargo.order_id}>
                  <Field
                    component={TextField}
                    type="number"
                    name={`cargo_order[${index}].order_id`}
                    label="Cargo ID"
                    fullWidth
                  />
                  <Field
                    component={TextField}
                    type="number"
                    name={`cargo_order[${index}].cargo_id`}
                    label="Cargo ID"
                    fullWidth
                  />
                  <Field
                    component={TextField}
                    type="number"
                    name={`cargo_order[${index}].load`}
                    label="Load"
                    fullWidth
                  />
                  <Field
                    component={TextField}
                    type="number"
                    name={`cargo_order[${index}].bulk`}
                    label="Bulk"
                    fullWidth
                  />
                  <Field
                    as={Select}
                    name={`cargo_order[${index}].cargo_id`}
                    onChange={handleChange}
                    fullWidth
                  >
                    {(CargoReducer.cargo).map((items) => (
                      <MenuItem key={items.cargo_id} value={items.cargo_id}>
                        {items.cargo_name}
                      </MenuItem>
                    ))}
                  </Field>
                  <Button
                    type="button"
                    onClick={() => arrayHelpers.remove(index)}
                  >
                    Remove
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                onClick={() => arrayHelpers.push({
                  cargo_id: 0,
                  load: 0,
                  bulk: 0,
                  cargo: {
                    cargo_id: 0,
                    cargo_name: '',
                  },
                })}
              >
                Add Cargo
              </Button>
            </div>
          )}
        />
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
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
    >
      {(props: any) => showForm(props)}
    </Formik>
  );
};
