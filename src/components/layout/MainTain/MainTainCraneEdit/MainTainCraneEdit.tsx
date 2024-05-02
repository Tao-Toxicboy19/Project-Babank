import { Box, Button, Card, CardContent, CircularProgress, FormControl, InputLabel, MenuItem, Select, Stack, TextField, Typography } from "@mui/material"
import { useForm } from "react-hook-form"
import { useSelector } from "react-redux"
import { Link, useNavigate, useParams } from "react-router-dom"
import { SAVE, CLOSE } from "../../../../Constants"
import { craneSelector } from "../../../../store/slices/Crane/craneSlice"
import { updateMainTainCrane } from "../../../../store/slices/MainTain/CraneSlice"
import { roleSelector } from "../../../../store/slices/auth/rolesSlice"
import { useAppDispatch } from "../../../../store/store"
import { useEffect, useState } from "react"
import { httpClient } from "../../../../utils/httpclient"
import { MainTain } from "../../../../type/mainTain.type"

type Props = {}

export default function MainTainCraneEdit({ }: Props) {
    const craneReducer = useSelector(craneSelector)
    const dispatch = useAppDispatch()
    const craneId = useParams()
    const navigate = useNavigate()
    const roleReducer = useSelector(roleSelector)
    const id = roleReducer.result?.group
    if (!id) return
    const [data, setData] = useState<MainTain | undefined>()

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

    const fetch = async () => {
        try {
            const response = await httpClient.get(`maintain_crane/get/${craneId.id}`)
            setData(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetch()
    }, [])

    return (
        <Card className='max-w-[750px] mx-auto'>
            <CardContent>
                {data === undefined ? (
                    <Box className='h-[500px] flex justify-center items-center'>
                        <CircularProgress />
                    </Box>
                ) : (
                    <>
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
                            const value = {
                                ...data, id
                            }
                            dispatch(updateMainTainCrane(value, navigate,Number(craneId.id)))
                        })}>
                            <Stack direction='column' spacing={3}>
                                <Box className='w-full'>
                                    <InputLabel id="cr_id" className='font-kanit'>รายละเอียด</InputLabel>
                                    <TextField
                                        {...register('desc')}
                                        id='desc'
                                        type='text'
                                        fullWidth
                                        defaultValue={data.desc}
                                    />
                                </Box>
                                <Box className='w-full'>
                                    <InputLabel id="cr_id" className='font-kanit'>เวลาหยุดทำงาน</InputLabel>
                                    <TextField
                                        {...register('downtime')}
                                        id='downtime'
                                        type='datetime-local'
                                        fullWidth
                                        defaultValue={data.downtime}
                                    />
                                </Box>
                                <Box className='w-full'>
                                    <InputLabel id="cr_id" className='font-kanit'>เวลาเริ่มทำงาน</InputLabel>
                                    <TextField
                                        {...register('start_time')}
                                        id='start_time'
                                        type='datetime-local'
                                        fullWidth
                                        defaultValue={data.start_time}
                                    />
                                </Box>
                                <Stack direction='row' spacing={2}>
                                    <Box className='w-full'>
                                        <InputLabel id="cr_id" className='font-kanit'>เลือกเครน</InputLabel>
                                        <FormControl fullWidth>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                {...register('mt_crane_id')}
                                                defaultValue={data.maintain_crane_id}
                                            >
                                                {(craneReducer.result).map((items) => (
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
                    </>
                )}
            </CardContent>
        </Card>
    )
}