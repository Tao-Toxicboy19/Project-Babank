import { Box, Button, Card, CardContent, CircularProgress, FormControl, InputLabel, MenuItem, Select, Stack, TextField } from "@mui/material"
import { SAVE, CLOSE } from "../../../../Constants"
import { useForm } from "react-hook-form"
import { useSelector } from "react-redux"
import { Link, useNavigate, useParams } from "react-router-dom"
import { ftsSelector } from "../../../../store/slices/FTS/ftsSlice"
import { roleSelector } from "../../../../store/slices/auth/rolesSlice"
import { useAppDispatch } from "../../../../store/store"
import { useEffect, useState } from "react"
import { httpClient } from "../../../../utils/httpclient"
import { MainTainFTS } from "../../../../type/mainTain.type"
import { updateMainTainFTS } from "../../../../store/slices/MainTain/FTSSlice"

type Props = {}

export default function MainTainFtsEdit({ }: Props) {
    const FTSReducer = useSelector(ftsSelector)
    const ftsId = useParams()
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const roleReducer = useSelector(roleSelector)
    const [data, setData] = useState<MainTainFTS | undefined>()
    const id = roleReducer.result?.group
    if (!id) return

    const {
        register,
        handleSubmit,
        formState: { },
    } = useForm()

    const fetch = async () => {
        try {
            const response = await httpClient.get(`maintain_fts/get/${ftsId.id}`)
            setData(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetch()
    }, [])

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

                {data === undefined ? (
                    <Box className='h-[500px] flex justify-center items-center'>
                        <CircularProgress />
                    </Box>
                ) : (
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
                            ...data, id
                        }
                        dispatch(updateMainTainFTS(value, navigate, Number(ftsId.id)))
                    })}>
                        <Stack direction='column' spacing={3}>
                            <Box className='w-full'>
                                <InputLabel id="name_edit" className='font-kanit'>ชื่อ</InputLabel>
                                <TextField
                                    {...register('name_edit')}
                                    id='name_edit'
                                    type='text'
                                    defaultValue={data?.name}
                                    fullWidth
                                />
                            </Box>
                            <Box className='w-full'>
                                <InputLabel id="cr_id" className='font-kanit'>รายละเอียด</InputLabel>
                                <TextField
                                    {...register('desc_FTS')}
                                    id='deadline_time'
                                    type='text'
                                    defaultValue={data?.desc_FTS}
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
                                    defaultValue={data.downtime_FTS}
                                />
                            </Box>
                            <Box className='w-full'>
                                <InputLabel id="cr_id" className='font-kanit'>เวลาเริ่มทำงาน</InputLabel>
                                <TextField
                                    {...register('start_time_FTS')}
                                    id='deadline_time'
                                    type='datetime-local'
                                    defaultValue={data.start_time_FTS}
                                    fullWidth
                                />
                            </Box>
                            <Stack direction='row' spacing={2}>
                                <Box className='w-full'>
                                    <InputLabel id="cr_id" className='font-kanit'>เลือกทุ่น</InputLabel>
                                    <FormControl fullWidth>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            {...register('mt_FTS_id')}
                                            defaultValue={data.mt_FTS_id}
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
                                <Box className='w-full'>
                                    <InputLabel id="cr_id" className='font-kanit'>แจ้งเตือนก่อนกี่วัน</InputLabel>
                                    <TextField
                                        {...register('noti_day')}
                                        id='noti_day'
                                        defaultValue={data.noti_day}
                                        type='text'
                                        fullWidth
                                    />
                                </Box>
                            </Stack>
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
                )}
            </CardContent>
        </Card>
    )
}