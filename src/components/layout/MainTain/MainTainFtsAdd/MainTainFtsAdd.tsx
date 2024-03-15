import { CardContent, Box, InputLabel, Stack, Button, Card, TextField, FormControl, Select, MenuItem } from "@mui/material";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addMainTainFTS } from "../../../../store/slices/MainTain/FTSSlice";
import { ftsSelector } from "../../../../store/slices/FTS/ftsSlice";
import { useAppDispatch } from "../../../../store/store";
import { CLOSE, SAVE } from "../../../../Constants";
import { roleSelector } from "../../../../store/slices/auth/rolesSlice";

type Props = {}

export default function MainTainFtsAdd({ }: Props) {
    const FTSReducer = useSelector(ftsSelector)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const roleReducer = useSelector(roleSelector)
    const id = roleReducer.result?.group
    if(!id) return

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
                    const value = {
                        ...data,id
                    }
                    dispatch(addMainTainFTS(value, navigate))
                })}>
                    <Stack direction='column' spacing={3}>
                        <Box className='w-full'>
                            <InputLabel id="cr_id" className='font-kanit'>รายละเอียด</InputLabel>
                            <TextField
                                {...register('desc_FTS')}
                                id='deadline_time'
                                type='text'
                                fullWidth
                            />
                        </Box>
                        <Box className='w-full'>
                            <InputLabel id="cr_id" className='font-kanit'>เวลาหยุดทำงาน</InputLabel>
                            <TextField
                                {...register('downtime_FTS')}
                                id='downtime_FTS'
                                type='datetime-local'
                                fullWidth
                            />
                        </Box>
                        <Box className='w-full'>
                            <InputLabel id="cr_id" className='font-kanit'>เวลาเริ่มทำงาน</InputLabel>
                            <TextField
                                {...register('start_time_FTS')}
                                id='deadline_time'
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
                                    {...register('mt_FTS_id')}
                                >
                                    {(FTSReducer.result).map((items) => (
                                        <MenuItem
                                            key={items.fts_id}
                                            value={items.fts_id}
                                        >
                                            {items.FTS_name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box>
                        <Stack spacing={2} direction='row'>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                className='bg-blue-600 hover:bg-blue-700 font-kanit'
                            >
                                {SAVE}
                            </Button>
                            <Button
                                fullWidth
                                variant="outlined"
                                sx={{ mt: 3, mb: 2 }}
                                component={Link}
                                to={'/transferstation'}
                                className='font-kanit'
                            >
                                {CLOSE}
                            </Button>
                        </Stack>
                    </Stack>
                </form>
            </CardContent>
        </Card>
    )
}