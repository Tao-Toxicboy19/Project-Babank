import { Alert, Box, Button, Card, CardContent, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Stack, TextField, ThemeProvider, createTheme } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Titles from '../../../layout/Titles/Titles';
import { useAppDispatch } from '../../../../store/store';
import { carrierAddAsync } from '../../../../store/slices/Carrier/carrierAddSlice';
import { CLOSE, SAVE } from '../../../../Constants';

type Props = {}

const defaultTheme = createTheme();

function ShowFrom() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  return (
    <form
      onSubmit={handleSubmit(async (data) => {
        setIsSubmitting(true);
        try {
          const values = {
            ...data,
          }
          await dispatch(carrierAddAsync({ values, navigate }));
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
              {...register('maxcapacity', {
                required: true,
                valueAsNumber: true,
                min: 0
              })}
            />
            {errors.maxcapacity &&
              <Alert variant="outlined" severity="error" className='mt-2'>
                {errors.maxcapacity.type === 'min' && 'ไม่สามารถกรอกค่าต่ำกว่า 0 ได้'}
                {errors.maxcapacity.type !== 'min' && 'กรุณากรอกข้อมูล'}
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
              {...register('burden', {
                required: true,
                valueAsNumber: true,
                min: 2,
                max: 12
              })}
            />
            {errors.burden && (
              <Alert variant="outlined" severity="error" className='mt-2'>
                {errors.burden.type === 'min' && 'ต้องไม่น้อยกว่า 2 ระวาง'}
                {errors.burden.type === 'max' && `ต้องไม่เกิน 12 ระวาง`}
                {errors.burden.type !== 'min' && errors.burden.type !== 'max' && 'กรุณากรอกข้อมูล'}
              </Alert>
            )}
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
              {...register('carrier_max_FTS', {
                required: true,
                valueAsNumber: true,
                min: 0
              })}
            />
            {errors.carrier_max_FTS &&
              <Alert variant="outlined" severity="error" className='mt-2'>
                {errors.carrier_max_FTS.type === 'min' && 'ไม่สามารถกรอกค่าต่ำกว่า 0 ได้'}
                {errors.carrier_max_FTS.type !== 'min' && 'กรุณากรอกข้อมูล'}
              </Alert>}
          </Box>

          <Box>
            <TextField
              id='carrier_max_crane'
              label='จำนวนเครนเข้าได้สูงสุด'
              type='number'
              fullWidth
              className='font-kanit'
              {...register('carrier_max_crane', {
                required: true,
                valueAsNumber: true,
                min: 0
              })}
            />
            {errors.carrier_max_crane &&
              <Alert variant="outlined" severity="error" className='mt-2'>
                {errors.carrier_max_crane.type === 'min' && 'ไม่สามารถกรอกค่าต่ำกว่า 0 ได้'}
                {errors.carrier_max_crane.type !== 'min' && 'กรุณากรอกข้อมูล'}
              </Alert>}
          </Box>

          <Box>
            <TextField
              id='Width'
              label='กว้าง (เมตร)'
              type='number'
              fullWidth
              className='font-kanit'
              {...register('Width', {
                required: true,
                valueAsNumber: true,
                min: 0
              })}
            />
            {errors.Width &&
              <Alert variant="outlined" severity="error" className='mt-2'>
                {errors.Width.type === 'min' && 'ไม่สามารถกรอกค่าต่ำกว่า 0 ได้'}
                {errors.Width.type !== 'min' && 'กรุณากรอกข้อมูล'}
              </Alert>}
          </Box>

          <Box>
            <TextField
              id='length'
              label='ยาว (เมตร)'
              type='number'
              fullWidth
              className='font-kanit'
              {...register('length', {
                required: true,
                valueAsNumber: true,
                min: 0
              })}
            />
            {errors.length &&
              <Alert variant="outlined" severity="error" className='mt-2'>
                {errors.length.type === 'min' && 'ไม่สามารถกรอกค่าต่ำกว่า 0 ได้'}
                {errors.length.type !== 'min' && 'กรุณากรอกข้อมูล'}
              </Alert>}
          </Box>

        </Stack>

        <Box className='col-span-2 flex justify-start my-3'>
          <FormControl>
            <FormLabel id="demo-form-control-label-placement" className='text-md'>เครนบนเรือ</FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-form-control-label-placement"
              defaultValue="no"
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
            className='bg-blue-600 hover:bg-blue-700 font-kanit text-lg py-3'
            disabled={isSubmitting}
          >
            {SAVE}
          </Button>
          <Button
            fullWidth
            variant="outlined"
            onClick={() => navigate('/carrier')}
            className='font-kanit text-lg py-3'
          >
            {CLOSE}
          </Button>
        </Stack>
      </Box>
    </form >
  )
}

export default function CarrierAdd({ }: Props) {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Card className='min-h-[90vh]'>
        <CardContent>
          <Box className='flex justify-start'>
            <Titles title='เรือสินค้า' title2='เพิ่มข้อมูลเรือสินค้า' />
          </Box>
          <Box>
            <ShowFrom />
          </Box>
        </CardContent>
      </Card>
    </ThemeProvider >
  )
}