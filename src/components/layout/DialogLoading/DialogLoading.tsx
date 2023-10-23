import Button from '@mui/material/Button';
import { useForm } from 'react-hook-form';
import { Stack, TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { ManagePlans } from '../../../store/slices/managePlansSlice';
import { RootState } from '../../../store/store';
import LoadingButton from '@mui/lab/LoadingButton';


export default function DialogLoading() {
    const ManagePlansReducer = useSelector((state: RootState) => state.manMgePlanReducer);
    const dispatch = useDispatch<any>();
    const {
        register,
        handleSubmit,
        formState: { },
    } = useForm();


    return (

        <>
            <form
                onSubmit={handleSubmit((data) => {
                    // เพิ่มค่าเวลาปัจจุบันเข้าไปในข้อมูล
                    data.currenttime = new Date().toISOString();

                    console.log(data);
                    dispatch(ManagePlans(data));
                })}
            >
                <Stack direction='row' spacing={2}>
                    <TextField
                        type='datetime-local'
                        fullWidth
                        {...register('date')}
                    />
                    <TextField
                        type='number'
                        label='เวลาประมวณผล (นาที)'
                        fullWidth
                        {...register('computetime')}
                    />
                </Stack>
                {ManagePlansReducer.loading ? (
                    <LoadingButton
                        loading
                        variant="outlined"
                        className='bg-blue-200 hover-bg-blue-300 flex items-center mt-2 font-kanit text-xl'
                        fullWidth
                    >
                        Submit
                    </LoadingButton>
                ) : (
                    <Button
                        type='submit'
                        fullWidth
                        variant="contained"
                        className='bg-blue-600 hover-bg-blue-700 flex items-center mt-2 font-kanit text-xl'
                    >
                        จัดเเผนการย้ายทุ่น
                    </Button>
                )}
            </form>
        </>
    );
}