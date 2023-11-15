import { Alert, Box, Button, Card, CardContent, FormControl, InputLabel, MenuItem, Select, Stack, TextField, ThemeProvider, createTheme } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Titles from '../../Titles/Titles';
import { RootState } from '../../../../store/store';
import { format } from 'date-fns';
import { addOrder } from '../../../../store/slices/Order/order.slice';

type Props = {}

const defaultTheme = createTheme();

export default function OrderCreatePage({ }: Props) {
  const navigate = useNavigate()
  const CarrierReducer = useSelector((state: RootState) => state.carrier);
  const dispatch = useDispatch<any>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const showForm = () => {
    return (
      <form
        onSubmit={handleSubmit(async (data) => {
          setIsSubmitting(true);
          const formattedValues = {
            ...data,
            latitude: parseFloat(data.latitude),
            longitude: parseFloat(data.longitude),
            arrival_time: format(new Date(data.arrival_time), 'yyyy-MM-dd HH:mm:ss'),
            deadline_time: format(new Date(data.deadline_time), 'yyyy-MM-dd HH:mm:ss'),
          };
          try {
            await dispatch(addOrder(formattedValues, navigate))
            setIsSubmitting(false);
          } catch (error) {
            setIsSubmitting(false);
          }
        })}>
        <Box className='grid grid-cols-2 gap-x-5 mt-5'>
          <Stack direction='column' spacing={4}>
            <Box>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">เลือกเรือ</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="เลือกเรือ"
                  {...register('cr_id', { required: true })}
                >
                  {(CarrierReducer.carrier).map((items) => (
                    <MenuItem key={items.cr_id} value={items.cr_id} className='font-kanit'>
                      {items.carrier_name}
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
                <InputLabel id="demo-simple-select-label">สถานะสินค้า (ขาเข้า/ขาออก)</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="สถานะสินค้า (ขาเข้า/ขาออก)"
                  {...register('category', { required: true })}
                >
                  <MenuItem value='Import' className='font-kanit'>import</MenuItem>
                  <MenuItem value='export' className='font-kanit'>export</MenuItem>
                </Select>
              </FormControl>
              {errors.category &&
                <Alert variant="outlined" severity="error" className='mt-2'>
                  กรุณากรอกข้อมูล
                </Alert>}
            </Box>

            <Box>
              <TextField
                label='จำนวนทุ่นเข้าสูงสุด'
                id='maxFTS'
                type='number'
                fullWidth
                className='font-kanit'
                {...register('maxFTS', { required: true, valueAsNumber: true })}
              />
              {errors.maxFTS &&
                <Alert variant="outlined" severity="error" className='mt-2'>
                  กรุณากรอกข้อมูล
                </Alert>}
            </Box>

            <Box>
              <TextField
                id='latitude'
                label='ละติจูด'
                type='text' // Change type to text
                fullWidth
                className='font-kanit'
                {...register('latitude', {
                  required: true,
                  pattern: {
                    value: /^[0-9]*\.?[0-9]*$/, // Regular expression for numeric input with optional decimal
                    message: 'กรุณากรอกตัวเลขที่ถูกต้อง'
                  },
                })}
              />
              {errors.latitude &&
                <Alert variant="outlined" severity="error" className='mt-2'>
                  กรุณากรอกข้อมูล
                </Alert>}
            </Box>

            <Box>
              <TextField
                id='longitude'
                label='ลองจิจูด'
                type='text' // Change type to text
                fullWidth
                className='font-kanit'
                {...register('longitude', {
                  required: true,
                  pattern: {
                    value: /^[0-9]*\.?[0-9]*$/, // Regular expression for numeric input with optional decimal
                    message: 'กรุณากรอกตัวเลขที่ถูกต้อง'
                  },
                })}
              />
              {errors.longitude &&
                <Alert variant="outlined" severity="error" className='mt-2'>
                  กรุณากรอกข้อมูล
                </Alert>}
            </Box>
          </Stack>

          <Stack direction='column' spacing={4}>
            <Box>
              <label htmlFor="deadline_time" className='font-kanit'>วัน-เวลา มาถึง</label>
              <TextField
                id='arrival_time'
                type='datetime-local'
                fullWidth
                className='font-kanit'
                {...register('arrival_time', { required: true })}
              />
              {errors.arrival_time &&
                <Alert variant="outlined" severity="error" className='mt-2'>
                  กรุณากรอกข้อมูล
                </Alert>}
            </Box>

            <Box>
              <label htmlFor="deadline_time" className='font-kanit'>วัน-เวลา สิ้นสุด</label>
              <TextField
                id='deadline_time'
                type='datetime-local'
                fullWidth
                className='font-kanit'
                {...register('deadline_time', { required: true })}
              />
              {errors.deadline_time &&
                <Alert variant="outlined" severity="error" className='mt-2'>
                  กรุณากรอกข้อมูล
                </Alert>}
            </Box>

            <Box>
              <TextField
                id='penalty_rate'
                label='ค่าปรับ (บาท/วัน)'
                type='number'
                fullWidth
                className='font-kanit'
                {...register('penalty_rate', { required: true, valueAsNumber: true })}
              />
              {errors.penalty_rate &&
                <Alert variant="outlined" severity="error" className='mt-2'>
                  กรุณากรอกข้อมูล
                </Alert>}
            </Box>

            <Box>
              <TextField
                id='reward_rate'
                label='รางวัล (บาท/วัน)'
                type='number'
                fullWidth
                className='font-kanit'
                {...register('reward_rate', { required: true, valueAsNumber: true })}
              />
              {errors.reward_rate &&
                <Alert variant="outlined" severity="error" className='mt-2'>
                  กรุณากรอกข้อมูล
                </Alert>}
            </Box>

          </Stack>
          <Stack direction='row' spacing={2} className='col-span-2 flex mt-5'>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              className='bg-[#1976D2] hover:bg-[#1563BC] font-kanit text-lg py-3'
              disabled={isSubmitting}
            >
              เพิ่มทุ่น
            </Button>
            <Button
              fullWidth
              variant="outlined"
              onClick={() => navigate('/orders')}
              className='font-kanit text-lg py-3'
            >
              กลับ
            </Button>
          </Stack>
        </Box>
      </form >
    )
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Card className='min-h-[90vh]'>
        <CardContent>
          <Box className='flex justify-start'>
            <Titles title='รายการขนถ่ายสินค้า' title2='เพิ่มข้อมูล' title3='เพิ่มสินค้า' />
          </Box>
          <Box>
            {showForm()}
          </Box>
        </CardContent>
      </Card>
    </ThemeProvider >
  )
}