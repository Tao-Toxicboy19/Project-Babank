import { Alert, Box, Button, Card, CardContent, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Stack, TextField, ThemeProvider, createTheme } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addCarrier } from '../../../../store/slices/Carrier/carrier.slice';
import Titles from '../../Titles/Titles';

type Props = {}

const defaultTheme = createTheme();

export default function CarrierCreate({ }: Props) {
  const navigate = useNavigate()
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
          try {
            await dispatch(addCarrier(data, navigate));
            setIsSubmitting(false);
          } catch (error) {
            setIsSubmitting(false);
          }
        })}>
        <Box className='grid grid-cols-2 gap-x-5 mt-5'>
          <Stack direction='column' spacing={4}>
            <Box>
              <TextField
                id='carrier_name'
                type='text'
                label='ชื่อเรือ'
                fullWidth
                className='font-kanit'
                {...register('carrier_name', { required: true })}
              />
              {errors.carrier_name &&
                <Alert variant="outlined" severity="error" className='mt-2'>
                  กรุณากรอกข้อมูล
                </Alert>
              }
            </Box>

            <Box>
              <TextField
                label='ชื่อบริษัท'
                id='holder'
                type='text'
                fullWidth
                className='font-kanit'
                {...register('holder', { required: true })}
              />
              {errors.holder &&
                <Alert variant="outlined" severity="error" className='mt-2'>
                  กรุณากรอกข้อมูล
                </Alert>}
            </Box>

            <Box>
              <TextField
                label='ความจุสูงสุด (ตัน)'
                id='maxcapacity'
                type='number'
                fullWidth
                className='font-kanit'
                {...register('maxcapacity', { required: true, valueAsNumber: true },)}
              />
              {errors.maxcapacity &&
                <Alert variant="outlined" severity="error" className='mt-2'>
                  กรุณากรอกข้อมูล
                </Alert>}
            </Box>

            <Box>
              <TextField
                id='burden'
                label='จำนวนระวาง'
                type='number'
                fullWidth
                className='font-kanit'
                {...register('burden', { required: true, valueAsNumber: true })}
              />
              {errors.burden &&
                <Alert variant="outlined" severity="error" className='mt-2'>
                  กรุณากรอกข้อมูล
                </Alert>}
            </Box>
          </Stack>

          <Stack direction='column' spacing={4}>
            <Box>
              <TextField
                id='carrier_max_FTS'
                label='จำนวนทุ่นเข้าได้สูงสุด'
                type='number'
                fullWidth
                className='font-kanit'
                {...register('carrier_max_FTS', { required: true, valueAsNumber: true })}
              />
              {errors.carrier_max_FTS &&
                <Alert variant="outlined" severity="error" className='mt-2'>
                  กรุณากรอกข้อมูล
                </Alert>}
            </Box>

            <Box>
              <TextField
                id='carrier_max_crane'
                label='จำนวนเครนเข้าได้สูงสุด'
                type='number'
                fullWidth
                className='font-kanit'
                {...register('carrier_max_crane', { required: true, valueAsNumber: true })}
              />
              {errors.carrier_max_crane &&
                <Alert variant="outlined" severity="error" className='mt-2'>
                  กรุณากรอกข้อมูล
                </Alert>}
            </Box>

            <Box>
              <TextField
                id='Width'
                label='กว้าง (เมตร)'
                type='number'
                fullWidth
                className='font-kanit'
                {...register('Width', { required: true, valueAsNumber: true })}
              />
              {errors.Width &&
                <Alert variant="outlined" severity="error" className='mt-2'>
                  กรุณากรอกข้อมูล
                </Alert>}
            </Box>

            <Box>
              <TextField
                id='length'
                label='ยาว (เมตร)'
                type='number'
                fullWidth
                className='font-kanit'
                {...register('length', { required: true, valueAsNumber: true })}
              />
              {errors.length &&
                <Alert variant="outlined" severity="error" className='mt-2'>
                  กรุณากรอกข้อมูล
                </Alert>}
            </Box>

          </Stack>

          <Box className='col-span-2 flex justify-start my-3'>
            <FormControl>
              <FormLabel id="demo-form-control-label-placement" className='text-md'>เครนบนเรือ</FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-form-control-label-placement"
                defaultValue="has"
                {...register('has_crane')}
              >
                <FormControlLabel value="has" control={<Radio />} label="มี" />
                <FormControlLabel value="no" control={<Radio />} label="ไม่มี" />
              </RadioGroup>
            </FormControl>
          </Box>
          <Stack direction='row' spacing={2} className='col-span-2 flex'>
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
              onClick={() => navigate('/carrier')}
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
            <Titles title='เรือสินค้า' title2='เพิ่มข้อมูลเรือสินค้า' />
          </Box>
          <Box>
            {showForm()}
          </Box>
        </CardContent>
      </Card>
    </ThemeProvider >
  )
}