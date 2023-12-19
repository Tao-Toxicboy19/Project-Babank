import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { CLOSE, EDIT, server } from '../../../../Constants';
import { Box, Button, Card, CardContent, Stack, TextField, ThemeProvider, createTheme } from '@mui/material';
import Loading from '../../../layout/Loading/Loading';
import { useForm } from 'react-hook-form';
import Titles from '../../../layout/Titles/Titles';
import { useAppDispatch } from '../../../../store/store';
import { ftsEditAsync } from '../../../../store/slices/FTS/ftsEditSlice';

type Props = {
};

const defaultTheme = createTheme()

export default function FTSEditPage({ }: Props) {
  const [FTSData, setFTSData] = useState<any>();
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
  } = useForm();

  const fetchFTSData = async () => {
    try {
      const response = await axios.get(`${server.FLOATING}/${id}`);
      setFTSData(response.data);
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    fetchFTSData();
  }, []);

  const submitting = () => setIsSubmitting(false)

  const showForm = () => {
    return (
      <form
        onSubmit={handleSubmit(async (data) => {
          setIsSubmitting(true);
          try {
            await dispatch(ftsEditAsync({ id, data, submitting, navigate }))
            navigate('/transferstation')
          } catch (error) {
            setIsSubmitting(false);
            throw error;
          }
        })}>
        <Box className='mt-5'>
          <Stack direction='column' spacing={4}>
            <Box>
              <TextField
                variant="outlined"
                type="text"
                label='ชื่อทุ่น'
                className='font-kanit'
                id="FTS_name"
                {...register('FTS_name', { required: true })}
                defaultValue={FTSData.FTS_name}
                fullWidth
              />
            </Box>

            <Box>
              <TextField
                variant="outlined"
                type="number"
                label='ละติจูด'
                id="lat"
                className='font-kanit'
                {...register('lat', { required: true, valueAsNumber: true })}
                defaultValue={FTSData.lat}
                fullWidth
              />
            </Box>

            <Box>
              <TextField
                variant="outlined"
                type="number"
                label='ลองติจูด'
                id="lng"
                className='font-kanit'
                {...register('lng', { required: true, valueAsNumber: true })}
                defaultValue={FTSData.lng}
                fullWidth
              />
            </Box>
            <Box>
              <TextField
                variant="outlined"
                type="number"
                label='เวลาเตรียมการ (นาที)'
                id="setuptime_FTS"
                className='font-kanit'
                {...register('setuptime_FTS', { required: true, valueAsNumber: true })}
                defaultValue={FTSData.setuptime_FTS}
                fullWidth
              />
            </Box>
            <Box>
              <TextField
                variant="outlined"
                type="number"
                label='ความเร็ว'
                id="speed"
                className='font-kanit'
                {...register('speed', { required: true, valueAsNumber: true })}
                defaultValue={FTSData.speed}
                fullWidth
              />
            </Box>
          </Stack>


          <Stack direction='row' spacing={2} className='col-span-2 flex mt-5'>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              className='bg-blue-600 hover:bg-blue-700 font-kanit text-lg py-3'
              disabled={isSubmitting}
            >
              {EDIT}
            </Button>
            <Button
              fullWidth
              variant="outlined"
              onClick={() => navigate('/transferstation')}
              className='font-kanit text-lg py-3'
            >
              {CLOSE}
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
          {FTSData === undefined ? (
            <Loading />
          ) : (
            <>
              <Box className='flex justify-start'>
                <Titles title='ทุ่น' title2='แก้ไขข้อมูล' />
              </Box>
              <Box>
                {showForm()}
              </Box>
            </>
          )}
        </CardContent>
      </Card>
    </ThemeProvider >
  );
}
