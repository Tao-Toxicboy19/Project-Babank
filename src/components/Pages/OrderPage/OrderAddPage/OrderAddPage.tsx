import {
  Alert,
  Autocomplete,
  Box,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
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
import { carrierAsync, carrierSelector } from '../../../../store/slices/Carrier/carrierSlice';
import { roleSelector } from '../../../../store/slices/auth/rolesSlice';
import { useAppDispatch } from '../../../../store/store';
import { useForm, SubmitHandler, useFieldArray, useWatch } from 'react-hook-form'
import { cargoSelector } from '../../../../store/slices/Cargo/cargoSlice';
import { orderAddAsync } from '../../../../store/slices/Order/orderAddSlice';
import { orderAsync } from '../../../../store/slices/Order/orderSlice';
import { CLOSE, SAVE } from '../../../../Constants';
import React from 'react';
import { carrierAddAsync } from '../../../../store/slices/Carrier/carrierAddSlice';
import moment from 'moment';

type Props = {}

interface FormData {
  cr_id: string
  category: string
  burden: string
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
  name_of_vessel: string
  name_of_master: string
  w: string
  name_of_agent: string
  name_of_consignee: string
  name_of_stevedore: string
  port_of_discharging_cargo: string
  quantity_of_cargo: string
  name_of_owner: string
  name_of_shipper: string
  name_of_surveyots: string
  port_of_loading_cargo: string
  description_of_cargo: string
  vessel_of_readiness_tendered_and_accepted: string
}

const defaultTheme = createTheme()

function AddCarrier({ setSubmit }: { setSubmit: React.Dispatch<React.SetStateAction<boolean>> }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [open, setOpen] = useState(false)
  const rolesReducer = useSelector(roleSelector)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()

  const handleClickOpen = () => {
    setSubmit(false)
    setOpen(true)
  }

  const handleClose = () => {
    reset()
    setOpen(false)
    // setSubmit(0)
  }

  const fetch = () => dispatch(carrierAsync())

  return (
    <React.Fragment>
      <Button
        variant='outlined'
        className='w-1/4'
        type='button'
        size='small'
        onClick={handleClickOpen}
      >
        Add Carrier
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth='xl'
      >

        <form
          onSubmit={handleSubmit(async (data) => {
            setIsSubmitting(true)
            try {
              const values = {
                ...data,
                group: rolesReducer.result?.group
              }
              await dispatch(carrierAddAsync({ values, navigate, handleClose, fetch }))
              setIsSubmitting(false);
            } catch (error) {
              setIsSubmitting(false);
            }
          })}
          className='w-[750px]'
        >
          <DialogTitle id="alert-dialog-title">
            {"เพิ่มข้อมูลเรือสินค้า"}
          </DialogTitle>
          <DialogContent>
            <Box className='grid grid-cols-2 gap-x-3 mt-5'>
              <Stack
                className='w-full'
                direction='column'
                spacing={2}
              >
                <Box
                  className='w-full'
                >
                  <TextField
                    id='carrier_name'
                    type='text'
                    label='ชื่อเรือ'
                    fullWidth
                    size='small'
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
                    size='small'
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
                    size='small'
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
                    size='small'
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

              <Stack
                direction='column'
                spacing={2}
                className='w-full'
              >
                <Box>
                  <TextField
                    id='carrier_max_FTS'
                    label='จำนวนทุ่นเข้าได้สูงสุด'
                    type='number'
                    size='small'
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
                    size='small'
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
                    size='small'
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
                    size='small'
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
            </Box>
          </DialogContent>
          <DialogActions>
            <Stack
              className='w-full'
              direction='row'
              spacing={2}
            >
              <Button
                size='small'
                fullWidth
                variant="contained"
                type="submit"
                className='bg-blue-600 hover:bg-blue-700 font-kanit py-2.5'
                disabled={isSubmitting}
              >
                {SAVE}
              </Button>
              <Button
                size='small'
                type="button"
                variant='outlined'
                onClick={handleClose}
                fullWidth
              >
                {CLOSE}
              </Button>
            </Stack>
          </DialogActions>
        </form>
      </Dialog>
    </React.Fragment>
  );
}

function ShowForm() {
  const [bulk, setBulk] = useState<number>(0)
  const carrierReducer = useSelector(carrierSelector)
  const rolesReducer = useSelector(roleSelector)
  const cargoReducer = useSelector(cargoSelector)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedOption, setSelectedOption] = useState(null)
  const [submit, setSubmit] = useState<boolean>(true)
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
      burden: "",
      maxFTS: 0,
      latitude: 13.1,
      longitude: 100.8,
      deadline_time: null,
      arrival_time: null,
      penalty_rate: 0,
      reward_rate: 0,
      inputs: [{ cargo_names: '' }],
      bulkArray: [],
      name_of_vessel: '',
      name_of_master: '',
      w: '',
      name_of_agent: '',
      name_of_consignee: '',
      name_of_stevedore: '',
      port_of_discharging_cargo: '',
      quantity_of_cargo: '',
      name_of_owner: '',
      name_of_shipper: '',
      name_of_surveyots: '',
      port_of_loading_cargo: '',
      description_of_cargo: '',
      vessel_of_readiness_tendered_and_accepted: '',

    },
  })

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
    const findCarrier = await (carrierReducer.result).find(r => r.carrier_name === data.cr_id)
    const values = {
      ...data,
      cr_id: findCarrier?.cr_id,
      group: rolesReducer.result?.group,
      load: totalBulk,
      arrival_time: moment(data.arrival_time, 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD HH:mm:ss'),
      deadline_time: moment(data.deadline_time, 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD HH:mm:ss')
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
      setValue('burden', String(findMaxFts.burden))
    }
  }, [findMaxFts, cr_id, setValue])

  const handleChange = (_: any, newValue: any) => {
    setSelectedOption(newValue)
    setValue('cr_id', newValue?.cr_id || '')
  }

  const options = carrierReducer.result || []

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
              <Box
                className='flex flex-row gap-x-5'
              >
                <FormControl fullWidth>
                  <Autocomplete
                    id="demo-autocomplete"
                    options={options}
                    getOptionLabel={(option) => option.carrier_name}
                    value={selectedOption}
                    onChange={handleChange}
                    size='small'
                    noOptionsText="ไม่พบชื่อเรือ"
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="เลือกเรือ"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        {...register('cr_id', { required: true })}
                      />
                    )}
                  />
                </FormControl>

                <AddCarrier setSubmit={setSubmit} />

              </Box>
              {errors.cr_id && (
                <Alert variant="outlined" severity="error" className={`${submit ? 'mt-2' : 'hidden'}`}>
                  กรุณากรอกข้อมูล
                </Alert>
              )}
            </Box>
            <Box>
              <FormControl fullWidth>
                <InputLabel size='small' id="demo-simple-select-label">สถานะสินค้า (ขาเข้า/ขาออก)</InputLabel>
                <Select
                  size='small'
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
                <Alert variant="outlined" severity="error" className={`${submit ? 'mt-2' : 'hidden'}`}>
                  กรุณากรอกข้อมูล
                </Alert>}
            </Box>
            <Box>
              <TextField
                label='จำนวนทุ่นเข้าสูงสุด'
                id='maxFTS'
                type='number'
                size='small'
                fullWidth
                className='font-kanit'
                defaultValue={findMaxFts?.carrier_max_FTS}
                {...register('maxFTS', {
                  required: true,
                  valueAsNumber: true,
                  min: 1,
                  max: 4,
                })}
              />
              {errors.maxFTS && (
                <Alert variant="outlined" severity="error" className={`${submit ? 'mt-2' : 'hidden'}`}>
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
                size='small'
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
                size='small'
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
                <Alert variant="outlined" severity="error" className={`${submit ? 'mt-2' : 'hidden'}`}>
                  กรุณากรอกข้อมูล
                </Alert>}
            </Box>
            <Box>
              <TextField
                label='W'
                id='w'
                type='text'
                fullWidth
                size='small'
                className='font-kanit'
                {...register('w')}
              />
            </Box>
            <Box>
              <TextField
                label='NAME OF MASTER'
                id='name_of_master'
                type='text'
                fullWidth
                size='small'
                className='font-kanit'
                {...register('name_of_master')}
              />
            </Box>
            <Box>
              <TextField
                label='NAME OF AGENT'
                id='name_of_agent'
                type='text'
                fullWidth
                size='small'
                className='font-kanit'
                {...register('name_of_agent')}
              />
            </Box>
            <Box>
              <TextField
                label='NAME OF CONSIGNEE'
                id='name_of_consignee'
                type='text'
                fullWidth
                size='small'
                className='font-kanit'
                {...register('name_of_consignee')}
              />
            </Box>
            <Box>
              <TextField
                label='NAME OF STEVEDORE'
                id='name_of_stevedore'
                type='text'
                fullWidth
                size='small'
                className='font-kanit'
                {...register('name_of_stevedore')}
              />
            </Box>
            <Box>
              <TextField
                label='PORT OF DISCHARGING CARGO'
                id='port_of_discharging_cargo'
                type='text'
                fullWidth
                size='small'
                className='font-kanit'
                {...register('port_of_discharging_cargo')}
              />
            </Box>
            <Box>
              <TextField
                label='QUANTITY OF CARGO'
                id='quantity_of_cargo'
                type='text'
                fullWidth
                size='small'
                className='font-kanit'
                {...register('quantity_of_cargo')}
              />
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
                size='small'
                className='font-kanit'
                {...register('arrival_time', { required: true })}
              />
              {errors.arrival_time &&
                <Alert variant="outlined" severity="error" className={`${submit ? 'mt-2' : 'hidden'}`}>
                  กรุณากรอกข้อมูล
                </Alert>}
            </Box>

            <Box>
              <label htmlFor="deadline_time" className='font-kanit'>วัน-เวลา สิ้นสุด</label>
              <TextField
                id='deadline_time'
                type='datetime-local'
                fullWidth
                size='small'
                className='font-kanit'
                {...register('deadline_time', { required: true })}
              />
              {errors.deadline_time &&
                <Alert variant="outlined" severity="error" className={`${submit ? 'mt-2' : 'hidden'}`}>
                  กรุณากรอกข้อมูล
                </Alert>}
            </Box>
            <Box>
              <TextField
                id='penalty_rate'
                label='ค่าปรับ (บาท/วัน)'
                type='number'
                size='small'
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
                <Alert variant="outlined" severity="error" className={`${submit ? 'mt-2' : 'hidden'}`}>
                  กรุณากรอกข้อมูล
                </Alert>}
            </Box>
            <Box>
              <TextField
                id='reward_rate'
                label='รางวัล (บาท/วัน)'
                type='number'
                size='small'
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
                <Alert variant="outlined" severity="error" className={`${submit ? 'mt-2' : 'hidden'}`}>
                  กรุณากรอกข้อมูล
                </Alert>
              )}
            </Box>
            <Box>
              <TextField
                label='NAME OF VESSEL'
                id='name_of_vessel'
                type='text'
                fullWidth
                size='small'
                className='font-kanit'
                {...register('name_of_vessel')}
              />
            </Box>
            <Box>
              <TextField
                label='NAME OF OWNER'
                id='name_of_owner'
                type='text'
                fullWidth
                size='small'
                className='font-kanit'
                {...register('name_of_owner')}
              />
            </Box>
            <Box>
              <TextField
                label='NAME OF SHIPPER'
                id='name_of_shipper'
                type='text'
                fullWidth
                size='small'
                className='font-kanit'
                {...register('name_of_shipper')}
              />
            </Box>
            <Box>
              <TextField
                label='NAME OF SURVEYOTS'
                id='name_of_surveyots'
                type='text'
                fullWidth
                size='small'
                className='font-kanit'
                {...register('name_of_surveyots')}
              />
            </Box>
            <Box>
              <TextField
                label='PORT OF LOADING CARGO'
                id='port_of_loading_cargo'
                type='text'
                fullWidth
                size='small'
                className='font-kanit'
                {...register('port_of_loading_cargo')}
              />
            </Box>
            <Box>
              <TextField
                label='DESCRIPTION OF CARGO'
                id='description_of_cargo'
                type='text'
                fullWidth
                size='small'
                className='font-kanit'
                {...register('description_of_cargo')}
              />
            </Box>
            <Box>
              <TextField
                label='VESSEL OF READINESS TENDERED AND ACCEPTED'
                id='vessel_of_readiness_tendered_and_accepted'
                type='text'
                fullWidth
                size='small'
                className='font-kanit'
                {...register('vessel_of_readiness_tendered_and_accepted')}
              />
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
                <InputLabel
                  size='small'
                  id="demo-simple-select-label"
                >
                  เลือกสินค้า
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id={`inputs.${index}.cargo_names`}
                  label="เลือกสินค้า"
                  size='small'
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
                <Alert variant="outlined" severity="error" className={`${submit ? 'mt-2' : 'hidden'}`}>
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
              size='small'
              type='number'
              fullWidth
              className='font-kanit'
              defaultValue={findMaxFts?.burden}
              {...register('burden', {
                min: 0,
                max: 10,
                onChange: (e) => {
                  setBulk(+(e.target.value) || findMaxFts?.burden || 0)
                }
              })}
            />
            {errors.reward_rate &&
              <Alert variant="outlined" severity="error" className={`${submit ? 'mt-2' : 'hidden'}`}>
                กรุณากรอกข้อมูล
              </Alert>}
          </Box>
        </Stack>
        <Box className='grid grid-cols-3 gap-5'>
          <Box>
            <Button
              type="button"
              variant='outlined'
              size='small'
              onClick={() => append({ cargo_names: '' })}
            >
              เพิ่มสินค้า
            </Button>
            <span
              className='text-lg my-auto pl-2'
            >
              รวมปริมาณสินค้า (ตัน): {totalBulk}
            </span>
          </Box>
          {[...Array(bulk || findMaxFts?.burden)].map((_, index) => (
            <>
              <TextField
                key={`additional-input-${index}`}
                label={`ระวางที่ ${index + 1}`}
                type='text'
                size='small'
                fullWidth
                className='font-kanit'
                {...register(`bulkArray.${index}` as const)}
              />
              {errors.bulkArray &&
                <Alert variant="outlined" severity="error" className={`${submit ? 'mt-2' : 'hidden'}`}>
                  กรุณากรอกข้อมูล
                </Alert>}
            </>
          ))}
        </Box>

        <Stack direction='row' spacing={2} className='col-span-2 flex mt-5'>
          <Button
            type="submit"
            size='small'
            fullWidth
            variant="contained"
            className='bg-blue-600 hover:bg-blue-700 font-kanit text-lg'
            disabled={isSubmitting}
          >
            {SAVE}
          </Button>
          <Button
            fullWidth
            variant="outlined"
            type="button"
            size='small'
            onClick={() => navigate('/orders')}
            className='font-kanit text-lg'
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
          <Box className='flex justify-start my-2'>
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