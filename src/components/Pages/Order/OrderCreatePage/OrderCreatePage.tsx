import { Formik, Form, Field, FormikProps, FieldArray } from 'formik';
import { Box, Button, Card, CardContent, InputLabel, MenuItem, Select, Stack } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../store/store';
import { TextField } from 'formik-material-ui';
import { Link, useNavigate } from 'react-router-dom';
import { Orders } from '../../../../types/Order.type';
import { addOrder } from '../../../../store/slices/order.slice';
import * as Yup from 'yup';

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
  const CarrierReducer = useSelector((state: RootState) => state.carrier);
  const dispatch = useDispatch<any>();
  const navigate = useNavigate()

  const validationSchema = Yup.object().shape({
    cr_id: Yup.number().required('กรุณาเลือกทุ่น'),
    cargo_order: Yup.array().of(
      Yup.object().shape({
        cargo_id: Yup.number().required('กรุณาเลือกสินค้า'),
        order_id: Yup.number().required('กรุณากรอก order_id'),
        load: Yup.number().required('กรุณากรอกปริมาณสินค้า'),
        bulk: Yup.number().required('กรุณากรอกจำนวนระวาง'),
      })
    ),
    category: Yup.string().required('กรุณาเลือกสถานะสินค้า'),
    maxFTS: Yup.number().required('กรุณากรอกจำนวนทุ่นเข้าสูงสุด'),
    arrival_time: Yup.string().required('กรุณาเลือกวัน-เวลามาถึง'),
    deadline_time: Yup.string().required('กรุณาเลือกวัน-เวลาสิ้นสุด'),
    latitude: Yup.number().required('กรุณากรอกละติจูด'),
    longitude: Yup.number().required('กรุณากรอกลองจิจูด'),
    penalty_rate: Yup.number().required('กรุณากรอกค่าปรับ'),
    reward_rate: Yup.number().required('กรุณากรอกรางวัล'),
  });

  const handleSubmit = async (values: any, { setSubmitting }: any) => {
    const formattedValues = {
      ...values,
      arrival_time: new Date(values.arrival_time).toISOString(),
      deadline_time: new Date(values.deadline_time).toISOString(),
      latitude: parseFloat(values.latitude),
      longitude: parseFloat(values.longitude),
    };
    try {
      dispatch(addOrder(formattedValues, navigate))
      setSubmitting(false);
    } catch (error) {
      console.error('เกิดข้อผิดพลาดในการสร้างรายการ Cargo Crane:', error);
    }
  };

  const showForm = ({ isSubmitting, handleChange, values }: FormikProps<Orders>) => {
    return (
      <Form>
        <Stack spacing={2} direction='column'>
          <Box>
            <InputLabel id="cr_id">เลือกทุ่น</InputLabel>
            <Field
              as={Select}
              name='cr_id'
              id="cr_id"
              onChange={handleChange}
              fullWidth
            >
              {(CarrierReducer.carrier).map((items) => (
                <MenuItem key={items.cr_id} value={items.cr_id}>
                  {items.carrier_name}
                </MenuItem>
              ))}
            </Field>
          </Box>
          <Box className=''>
            <FieldArray
              name="cargo_order"
              render={arrayHelpers => (
                <Box className="m-5">
                  {values.cargo_order.map((cargo, index) => (
                    <Box key={cargo.order_id}>

                      <Stack spacing={2} direction='column'>
                        <Box>
                          <InputLabel id="order_id">เลือกสินค้า</InputLabel>
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
                        </Box>
                        <Box>
                          <InputLabel id="order_id">order_id</InputLabel>
                          <Field
                            component={TextField}
                            type="number"
                            name={`cargo_order[${index}].order_id`}
                            fullWidth
                          />
                        </Box>

                        <Stack spacing={2} direction='row'>
                          <Box className='w-full'>
                            <InputLabel id="order_id">ปริมาณสินค้า (ตัน)</InputLabel>
                            <Field
                              component={TextField}
                              type="number"
                              name={`cargo_order[${index}].load`}
                              fullWidth
                            />
                          </Box>
                          <Box className='w-full'>
                            <InputLabel id="order_id">จำนวนระวาง</InputLabel>
                            <Field
                              component={TextField}
                              type="number"
                              name={`cargo_order[${index}].bulk`}
                              fullWidth
                            />
                          </Box>
                        </Stack>
                      </Stack>
                      <Stack spacing={2} direction='row' className='flex justify-end my-3'>
                        <Button
                          variant="outlined"
                          type="button"
                          onClick={() => arrayHelpers.remove(index)}
                        >
                          ลบสินค้า
                        </Button>
                        <Button
                          variant="contained"
                          type="button"
                          className='bg-[#1976D2] hover:bg-[#1563BC]'
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
                          เพิ่มสินค้า
                        </Button>
                      </Stack>
                    </Box>
                  ))}

                </Box>
              )}
            />
          </Box>

          <Stack spacing={2} direction='row' >
            <Box className='w-full'>
              <InputLabel id="demo-simple-select-label">สถานะสินค้า (ขาเข้า/ขาออก)</InputLabel>
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
            </Box>
            <Box className='w-full'>
              <InputLabel id="demo-simple-select-label">จำนวนทุ่นเข้าสูงสุด</InputLabel>
              <Field
                component={TextField}
                type="number"
                name="maxFTS"
                id="maxFTS"
                fullWidth
              />
            </Box>
          </Stack>
          <Stack spacing={2} direction='row'>
            <Box className='w-full'>
              <InputLabel id="demo-simple-select-label">วัน-เวลา มาถึง</InputLabel>
              <Field
                component={TextField}
                name='arrival_time'
                type='datetime-local'
                fullWidth
              />
            </Box>
            <Box className='w-full'>
              <InputLabel id="demo-simple-select-label">วัน-เวลา สิ้นสุด</InputLabel>
              <Field
                component={TextField}
                name='deadline_time'
                type='datetime-local'
                fullWidth
              />
            </Box>
          </Stack>
          <Stack spacing={2} direction='row'>
            <Box className='w-full'>
              <InputLabel id="demo-simple-select-label">ละติจูด</InputLabel>
              <Field
                component={TextField}
                name="latitude"
                id="latitude"
                fullWidth
              />
            </Box>
            <Box className='w-full'>
              <InputLabel id="demo-simple-select-label">ลองจิจูด</InputLabel>
              <Field
                component={TextField}
                type="number"
                name="longitude"
                id="longitude"
                fullWidth
              />
            </Box>
          </Stack>

          <Stack spacing={2} direction='row'>
            <Box className='w-full'>
              <InputLabel id="demo-simple-select-label">ค่าปรับ (บาท)</InputLabel>
              <Field
                component={TextField}
                type="number"
                name="penalty_rate"
                id="penalty_rate"
                fullWidth
              />
            </Box>
            <Box className='w-full'>
              <InputLabel id="demo-simple-select-label">รางวัล (บาท)</InputLabel>
              <Field
                component={TextField}
                type="number"
                name="reward_rate"
                id="reward_rate"
                fullWidth
              />
            </Box>
          </Stack>

          <Stack spacing={2} direction='row'>
            <Button
              fullWidth
              variant="outlined"
              sx={{ mt: 3, mb: 2 }}
              component={Link}
              to={'/orders'}
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
              เพิ่มทุ่น
            </Button>
          </Stack>
        </Stack>
      </Form >
    )
  }

  return (
    <Card sx={{ maxWidth: 950, marginX: 'auto' }}>
      <CardContent>
        <Formik
          validationSchema={validationSchema}
          initialValues={initialValues}
          onSubmit={handleSubmit}
        >
          {(props: any) => showForm(props)}
        </Formik>
      </CardContent>
    </Card>
  );
};
