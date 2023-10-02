import { Formik, Form, Field, FormikProps } from 'formik';
import { Box, Button, Card, CardContent, MenuItem, Select, Stack } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../store/store';
import { TextField } from 'formik-material-ui';
import { Link, useNavigate } from 'react-router-dom';
import { Orders } from '../../../../types/Order.type';
import { addOrder } from '../../../../store/slices/order.slice';
import * as Yup from 'yup';

type Props = {}

const initialValues: any = {
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
};

export default function CargoCraneCreate({ }: Props) {
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

  const handleSubmit = async (values: any, { isSubmitting }: any) => {
    const formattedValues = {
      ...values,
      arrival_time: new Date(values.arrival_time).toISOString(),
      deadline_time: new Date(values.deadline_time).toISOString(),
      latitude: parseFloat(values.latitude),
      longitude: parseFloat(values.longitude),
    };
    try {
      console.log(formattedValues);
      dispatch(addOrder(formattedValues, navigate))
      isSubmitting(false);
    } catch (error) {
      console.error('เกิดข้อผิดพลาดในการสร้างรายการ Cargo Crane:', error);
    }
  };

  const showForm = ({ isSubmitting, handleChange, values }: FormikProps<Orders>) => {
    return (
      <Form>
        <Stack spacing={2} direction='column'>
          <Box>
            <label htmlFor="cr_id">เลือกเรือ:</label>
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
          <Stack spacing={2} direction='row' >
            <Box className='w-full'>
              <label htmlFor="category">สถานะสินค้า (ขาเข้า/ขาออก):</label>
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
              <label htmlFor="maxFTS">จำนวนทุ่นเข้าสูงสุด:</label>
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
              <label htmlFor="arrival_time">วัน-เวลา มาถึง:</label>
              <Field
                component={TextField}
                name='arrival_time'
                type='datetime-local'
                fullWidth
              />
            </Box>
            <Box className='w-full'>
              <label htmlFor="deadline_time">วัน-เวลา สิ้นสุด:</label>
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
              <label htmlFor="latitude">ละติจูด:</label>
              <Field
                component={TextField}
                name="latitude"
                id="latitude"
                fullWidth
              />
            </Box>
            <Box className='w-full'>
              <label htmlFor="longitude">ลองจิจูด:</label>
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
              <label htmlFor="longitude">ค่าปรับ (บาท):</label>
              <Field
                component={TextField}
                type="number"
                name="penalty_rate"
                id="penalty_rate"
                fullWidth
              />
            </Box>
            <Box className='w-full'>
              <label htmlFor="longitude">รางวัล (บาท):</label>
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
              // component={Link} to={'/orders/create/cargo'}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              className='bg-[#1976D2] hover:bg-[#1563BC]'
              disabled={isSubmitting}
            >
              เพิ่มสินค้า
            </Button>
          </Stack>
        </Stack>
      </Form >
    )
  }

  return (
    <Card sx={{ maxWidth: 750, marginX: 'auto' }}>
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
