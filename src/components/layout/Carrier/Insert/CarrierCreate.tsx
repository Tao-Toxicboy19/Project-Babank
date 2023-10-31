import { Box, Button, Card, CardContent, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Stack, TextField, ThemeProvider, Typography, createTheme } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addCarrier } from '../../../../store/slices/Carrier/carrier.slice';

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
        <Box>
          <TextField
            id='carrier_name'
            type='text'
            label='ชื่อเรือ'
            fullWidth
            className='font-kanit'
            {...register('carrier_name', { required: true })}
          />
          {errors.carrier_name && <p>Last name is required.</p>}
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
          {errors.holder && <p>Last name is required.</p>}
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
          {errors.maxcapacity && <p>Last name is required.</p>}
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
          {errors.burden && <p>Last name is required.</p>}
        </Box>

        <Box>
          <TextField
            id='carrier_max_FTS'
            label='จำนวนทุ่นเข้าได้สูงสุด'
            type='number'
            fullWidth
            className='font-kanit'
            {...register('carrier_max_FTS', { required: true, valueAsNumber: true })}
          />
          {errors.carrier_max_FTS && <p>Last name is required.</p>}
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
          {errors.carrier_max_crane && <p>Last name is required.</p>}
        </Box>

        <label className="pl-2 font-kanit" htmlFor="Width">กว้าง (เมตร)</label>
        <TextField
          id='Width'
          type='number'
          fullWidth
          className='font-kanit'
          {...register('Width', { required: true, valueAsNumber: true })}
        />
        {errors.Width && <p>Last name is required.</p>}

        <label className="pl-2 font-kanit" htmlFor="length">ยาว (เมตร)</label>
        <TextField
          id='length'
          type='number'
          fullWidth
          className='font-kanit'
          {...register('length', { required: true, valueAsNumber: true })}
        />
        {errors.length && <p>Last name is required.</p>}

        <FormControl style={{ marginTop: 16 }}>
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
        <Stack direction='row' spacing={2} sx={{ marginTop: 2 }}>
          <Button
            fullWidth
            variant="outlined"
            sx={{ mt: 3, mb: 2 }}
            onClick={() => navigate('/carrier')}
            className='font-kanit'
          >
            กลับ
          </Button>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            className='bg-[#1976D2] hover:bg-[#1563BC] font-kanit'
            disabled={isSubmitting}
          >
            เพิ่มทุ่น
          </Button>
        </Stack>
      </form >
    )
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box className="flex justify-center items-center">
        <Card>
          <CardContent>
            <Box className='flex justify-center'>
              <Typography component="h1" variant="h5" className='flex justify-center font-kanit'>
                เพิ่มเรือ
              </Typography>
            </Box>
            {showForm()}
          </CardContent>
        </Card>
      </Box>
    </ThemeProvider >
  )
}