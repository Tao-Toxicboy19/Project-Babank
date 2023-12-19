import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  ThemeProvider,
  createTheme
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Titles from '../../../layout/Titles/Titles';
import { carrierSelector } from '../../../../store/slices/Carrier/carrierSlice';
import { roleSelector } from '../../../../store/slices/auth/rolesSlice';
import { useAppDispatch } from '../../../../store/store';
import { useForm, SubmitHandler, useFieldArray, useWatch } from 'react-hook-form'
import { cargoSelector } from '../../../../store/slices/Cargo/cargoSlice';
import { orderAddAsync } from '../../../../store/slices/Order/orderAddSlice';
import { orderAsync } from '../../../../store/slices/Order/orderSlice';
import { CLOSE, SAVE } from '../../../../Constants';

type Props = {}

interface FormData {
  cr_id: string
  category: string
  burden: number
  maxFTS: number
  latitude: number | null
  longitude: number | null
  deadline_time: string | null | Date
  arrival_time: string | null | Date
  penalty_rate: number | null
  reward_rate: number | null
  inputs: {
    cargo_names: string
  }[]
  bulk: number
  bulkArray: number[]
}

const defaultTheme = createTheme();

function ShowForm() {
  const [bulk, setBulk] = useState<number>(0)
  const carrierReducer = useSelector(carrierSelector)
  const rolesReducer = useSelector(roleSelector)
  const cargoReducer = useSelector(cargoSelector)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      cr_id: "",
      category: "",
      burden: 0,
      maxFTS: 0,
      latitude: 13.1,
      longitude: 100.8,
      deadline_time: null,
      arrival_time: null,
      penalty_rate: 0,
      reward_rate: 0,
      inputs: [{ cargo_names: '' }],
      bulkArray: [],
    },
  })

  const filteredCarrier = (carrierReducer.result).filter((group) => group.group === rolesReducer.result?.group)

  const bulkArray = watch('bulkArray', []);

  const totalBulk = bulkArray.reduce((acc, value) => {
    const parsedValue = +(value)
    return !isNaN(parsedValue) ? acc + parsedValue : acc;
  }, 0)

  const { fields, append } = useFieldArray({
    control,
    name: 'inputs',
  })
  const fetch = () => dispatch(orderAsync())
  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setIsSubmitting(true)
    const values = {
      ...data,
      group: rolesReducer.result?.group,
      load: totalBulk
    }
    try {
      await dispatch(orderAddAsync({ values, navigate, fetch }))
      setIsSubmitting(false)
    } catch (error) {
      setIsSubmitting(false)
    }
  }

  const cr_id = useWatch({ control, name: 'cr_id' })
  const findMaxFts = carrierReducer.result.find((result) => result.cr_id === +cr_id)

  useEffect(() => {
    if (findMaxFts) {
      setValue('maxFTS', findMaxFts.carrier_max_FTS)
      setValue('burden', findMaxFts.burden)
    }
  }, [findMaxFts, cr_id, setValue])


  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack
        direction='column'
        spacing={2}
        className='w-full'
      >

        <Stack
          direction='row'
          spacing={2}
          className='w-full'
        >
          <Stack
            direction='column'
            spacing={2}
            className='w-full'
          >
            <Box>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">เลือกเรือ</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="เลือกเรือ"
                  {...register('cr_id', { required: true })}
                  onChange={(e: any) => {
                    setValue('cr_id', e.target.value)
                  }}
                >
                  {(filteredCarrier).map((items) => (
                    <MenuItem key={items.cr_id} value={items.cr_id} className='font-kanit'>
                      {items.carrier_name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              {errors.cr_id && (
                <Alert variant="outlined" severity="error" className='mt-2'>
                  กรุณากรอกข้อมูล
                </Alert>
              )}
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
                  <MenuItem value='import' className='font-kanit'>import</MenuItem>
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
                defaultValue={findMaxFts?.carrier_max_FTS}
                {...register('maxFTS', {
                  required: true,
                  valueAsNumber: true,
                  min: 1,
                  max: 15,
                })}
              />
              {errors.maxFTS && (
                <Alert variant="outlined" severity="error" className='mt-2'>
                  {errors.maxFTS.type === 'min' && 'กรุณากรอกค่าที่มากกว่าหรือเท่ากับ 0'}
                  {errors.maxFTS.type === 'max' && `ทุ่นสามารถเข้าได้สูงสุดแค่ ${findMaxFts?.carrier_max_FTS} ทุ่น`}
                  {errors.maxFTS.type !== 'min' && errors.maxFTS.type !== 'max' && 'กรุณากรอกข้อมูล'}
                </Alert>
              )}
            </Box>
            <Box>
              <TextField
                id='latitude'
                label='ละติจูด'
                type='text'
                fullWidth
                className='font-kanit'
                {...register('latitude', {
                  required: true,
                  pattern: {
                    value: /^[0-9]*\.?[0-9]*$/,
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
                type='text'
                fullWidth
                className='font-kanit'
                {...register('longitude', {
                  required: true,
                  pattern: {
                    value: /^[0-9]*\.?[0-9]*$/,
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
          <Stack
            direction='column'
            spacing={2}
            className='w-full'
          >
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
                {...register('penalty_rate', {
                  valueAsNumber: true,
                  min: {
                    value: 0,
                    message: 'ต้องไม่ต่ำกว่า 0',
                  },
                })}
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
                {...register('reward_rate', {
                  valueAsNumber: true,
                  min: {
                    value: 0,
                    message: 'ต้องไม่ต่ำกว่า 0',
                  },
                })}
                helperText={errors.reward_rate?.message || ''}
              />
              {errors.reward_rate && !errors.reward_rate.message && (
                <Alert variant="outlined" severity="error" className='mt-2'>
                  กรุณากรอกข้อมูล
                </Alert>
              )}
            </Box>

          </Stack>
        </Stack>

        <Stack
          direction='row'
          spacing={2}
          className='w-full'
        >
          {fields.map((_, index) => (
            <Box key={index}
              className='w-full'
            >
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">เลือกสินค้า</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id={`inputs.${index}.cargo_names`}
                  label="เลือกสินค้า"
                  {...register(`inputs.${index}.cargo_names` as const, {
                    required: true
                  })}
                >
                  {(cargoReducer.result).map((items) => (
                    <MenuItem key={items.cargo_id} value={items.cargo_id} className='font-kanit'>
                      {items.cargo_name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              {errors?.inputs?.[index]?.cargo_names && (
                <Alert variant="outlined" severity="error" className='mt-2'>
                  กรุณากรอกข้อมูล
                </Alert>
              )}
            </Box>
          ))}
          <Box
            className='w-full'
          >
            <TextField
              label='จำนวนระวาง'
              id='burden'
              type='number'
              fullWidth
              className='font-kanit'
              defaultValue={findMaxFts?.burden}
              {...register('burden', {
                min: 0,
                max: 20,
                onChange: (e) => {
                  setBulk(+(e.target.value) || findMaxFts?.burden || 0)
                }
              })}
            />
            {errors.reward_rate &&
              <Alert variant="outlined" severity="error" className='mt-2'>
                กรุณากรอกข้อมูล
              </Alert>}
          </Box>
        </Stack>
        <Box className='grid grid-cols-3 gap-5'>
          <Box>
            <Button
              type="button"
              variant='outlined'
              onClick={() => append({ cargo_names: '' })}
            >
              เพิ่มสินค้า
            </Button>
            <span
              className='text-xl my-auto pl-2'
            >
              รวมปริมาณสินค้า (ตัน): {totalBulk}
            </span>
          </Box>
          {[...Array(bulk || findMaxFts?.burden)].map((_, index) => (
            <>
              <TextField
                key={`additional-input-${index}`}
                label={`ระวางที่ ${index + 1}`}
                type='number'
                fullWidth
                className='font-kanit'
                {...register(`bulkArray.${index}` as const)}
              />
              {errors.bulkArray &&
                <Alert variant="outlined" severity="error" className='mt-2'>
                  กรุณากรอกข้อมูล
                </Alert>}
            </>
          ))}
        </Box>

        <Stack direction='row' spacing={2} className='col-span-2 flex mt-5'>
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
            onClick={() => navigate('/orders')}
            className='font-kanit text-lg py-3'
          >
            {CLOSE}
          </Button>
        </Stack>
      </Stack>
    </form>
  );
}

export default function OrderAddPage({ }: Props) {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Card className='min-h-[90vh]'>
        <CardContent>
          <Box className='flex justify-start'>
            <Titles title='รายการขนถ่ายสินค้า' title2='เพิ่มข้อมูล' />
          </Box>
          <Box>
            <ShowForm />
          </Box>
        </CardContent>
      </Card>
    </ThemeProvider >
  )
}