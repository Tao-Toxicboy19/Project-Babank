import { CardContent, Box, InputLabel, Stack, Button, Card, TextField, FormControl, Select, MenuItem, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { RootState } from "../../../../store/store";
import { addMainTainCrane } from "../../../../store/slices/MainTain/CraneSlice";

type Props = {}

export default function CreateCrane({ }: Props) {
    const MainTainCraneReducer = useSelector((state: RootState) => state.Crane.result);
    const dispatch = useDispatch<any>()
    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
        formState: { },
    } = useForm();

    function convertDateTimeFormat(dateTime: any) {
        const date = new Date(dateTime);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const seconds = date.getSeconds().toString().padStart(2, '0');

        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }

    return (
        <Card className='max-w-[750px] mx-auto'>
            <CardContent>
                <Typography className="flex justify-center text-2xl font-kanit">ข้อมูลซ่อมบำรุงเครน</Typography>
                <form onSubmit={handleSubmit((data) => {
                    if (data.downtime_FTS) {
                        data.downtime_FTS = convertDateTimeFormat(data.downtime_FTS);
                    } else {
                        data.downtime_FTS = '';
                    }
                    if (data.start_time_FTS) {
                        data.start_time_FTS = convertDateTimeFormat(data.start_time_FTS);
                    } else {
                        data.start_time_FTS = '';
                    }
                    dispatch(addMainTainCrane(data, navigate))
                })}>
                    <Stack direction='column' spacing={3}>
                        <Box className='w-full'>
                            <InputLabel id="cr_id" className='font-kanit'>รายละเอียด</InputLabel>
                            <TextField
                                {...register('desc')}
                                id='desc'
                                type='text'
                                fullWidth
                            />
                        </Box>
                        <Box className='w-full'>
                            <InputLabel id="cr_id" className='font-kanit'>เวลาหยุดทำงาน</InputLabel>
                            <TextField
                                {...register('downtime')}
                                id='downtime'
                                type='datetime-local'
                                fullWidth
                            />
                        </Box>
                        <Box className='w-full'>
                            <InputLabel id="cr_id" className='font-kanit'>เวลาเริ่มทำงาน</InputLabel>
                            <TextField
                                {...register('start_time')}
                                id='start_time'
                                type='datetime-local'
                                fullWidth
                            />
                        </Box>
                        <Box>
                            <InputLabel id="cr_id" className='font-kanit'>เลือกทุ่น</InputLabel>
                            <FormControl fullWidth>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    {...register('mt_crane_id')}
                                >
                                    {MainTainCraneReducer.map((items) => (
                                        <MenuItem
                                            key={items.id}
                                            value={items.id}
                                        >
                                            {items.crane_name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box>
                        <Stack spacing={2} direction='row'>
                            <Button
                                fullWidth
                                variant="outlined"
                                sx={{ mt: 3, mb: 2 }}
                                component={Link}
                                to={'/transferstation'}
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
                            // disabled={isSubmitting}
                            >
                                บันทึก
                            </Button>
                        </Stack>
                    </Stack>
                </form>
            </CardContent>
        </Card>
    )
}