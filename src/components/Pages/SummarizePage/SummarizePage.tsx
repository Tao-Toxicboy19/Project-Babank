import * as React from 'react'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'
import { Button, ButtonGroup, Card, CardContent, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, IconButton, InputLabel, MenuItem, Select, Stack, TextField, Typography } from '@mui/material'
import RouteLayout from '../../layout/RouteLayout/RouteLayout'
import DialogLoading from '../../layout/DialogLoading/DialogLoading'
import FTSGantts from '../../layout/Gantts/FTS/FTSGantts'
import CraneGantts from '../../layout/Gantts/Crane/CraneGantt'
import { useSelector } from 'react-redux'
import SummarizaCarrier from '../../layout/SummarizaCarrier/SummarizaCarrier'
import SummarizeLayout from './SummarizeLayout/SummarizeLayout'
import FTSsingle from './FTSsingle/FTSsingle'
import { roleSelector } from '../../../store/slices/auth/rolesSlice'
import MemoryIcon from '@mui/icons-material/Memory'
import PermIdentityIcon from '@mui/icons-material/PermIdentity'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { Chart } from "react-google-charts"
import { setAdd, setAddEdit, setCount, setNameCarrier, setRemove, sulutionScheduelAsync, sulutionScheduelSelector } from '../../../store/slices/Solution/sollutionScheduleSlice'
import { useEffect, useState } from 'react'
import { useAppDispatch } from '../../../store/store'
import { planAsync, planSelector, setPlans } from '../../../store/slices/planSlicec'
import { managePlansSelector } from '../../../store/slices/managePlansSlice'
import { useForm } from 'react-hook-form'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import dayjs, { Dayjs } from 'dayjs'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import AddIcon from '@mui/icons-material/Add'
import { v4 as uuidv4 } from 'uuid'
import axios from 'axios'

dayjs.locale('th')

interface TabPanelProps {
    children?: React.ReactNode
    index: number
    value: number
}

function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    {children}
                </Box>
            )}
        </div>
    )
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    }
}

export default function SummarizePage() {
    const [value, setValue] = React.useState(0)
    const [plan, setPlan] = React.useState<string>('hero')
    const dispatch = useAppDispatch()
    const planReducer = useSelector(planSelector)
    const rolesReducer = useSelector(roleSelector)
    const id = rolesReducer.result?.group
    if (!id) return
    const managePlansReducer = useSelector(managePlansSelector)
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        event.preventDefault()
        setValue(newValue)
    }

    useEffect(() => {
        dispatch(planAsync(id))
    }, [])

    useEffect(() => {
        dispatch(planAsync(id))
    }, [managePlansReducer.result])

    console.log(planReducer.planAi)
    useEffect(() => {
        dispatch(sulutionScheduelAsync(planReducer.plan))
    }, [planReducer.plan])

    return (
        <Card>
            <CardContent>
                {plan === 'hero' ? (
                    <HeroPlane setPlan={setPlan} />
                ) : (plan === 'Auto Plan' ? (
                    <AiPlan setPlan={setPlan} value={value} handleChange={handleChange} plan={plan} />
                ) : (plan === 'Customize' ? (
                    <AiPlan setPlan={setPlan} value={value} handleChange={handleChange} plan={plan} />
                ) : null))}

            </CardContent>
        </Card >
    )
}

type AiPlan = {
    setPlan: React.Dispatch<React.SetStateAction<string>>
    value: number
    handleChange: (event: React.SyntheticEvent, newValue: number) => void
    plan: string
}

function AiPlan({ setPlan, value, handleChange, plan }: AiPlan) {
    const rolesReducer = useSelector(roleSelector)
    // const SolutionscheduleReducer = useSelector(sulutionScheduelSelector)
    const dispatch = useAppDispatch()
    const planReducer = useSelector(planSelector)
    const [open, setOpen] = React.useState(false)
    const [planName, setPlanName] = useState<string>('')
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const handleClickOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }


    // console.log(planReducer.plan)

    useEffect(() => {
        if (planReducer.planAi.length > 0) {
            dispatch(setPlans(planReducer.planAi[0].id))
        }
    }, [planReducer.planAi, dispatch])

    return (
        <>
            <Stack direction='row' spacing={2}>
                <Button
                    startIcon={<ArrowBackIcon />}
                    onClick={() => setPlan('hero')}
                >
                    กลับ
                </Button>

                {rolesReducer.result && (
                    rolesReducer.result.role === 'Viewer' ? (
                        <></>
                    ) : rolesReducer.result.role === 'Contributor' ? (
                        <></>
                    ) : (
                        <DialogLoading plan={plan} />
                    )
                )}
                {plan !== 'Customize' &&
                    <ButtonGroup variant="text" aria-label="Basic button group">
                        {plan === 'Customize' ? (
                            planReducer.planUser.map((plan) => (
                                <Button
                                    disabled={planReducer.plan === plan.id}
                                    key={plan.id}
                                    onClick={() => dispatch(setPlans(plan.id))}
                                >
                                    {plan.plan_name}
                                </Button>
                            ))
                        ) : (
                            planReducer.planAi.map((plan) => (
                                <Button
                                    disabled={planReducer.plan === plan.id}
                                    key={plan.id}
                                    onClick={() => dispatch(setPlans(plan.id))}
                                >
                                    {plan.plan_name}
                                </Button>
                            ))
                        )}
                    </ButtonGroup>
                }
            </Stack>

            {plan === 'Customize' ? (
                <Box
                    className='min-h-[80vh]'
                >
                    <Card
                        className='max-w-lg mx-auto items-center'
                    >
                        <CardContent>
                            <Stack
                                onSubmit={handleSubmit((data) => {
                                    setPlanName(data.plan_name)
                                    handleClickOpen()
                                })}
                                component='form'
                                direction='column'
                                spacing={2}
                            >
                                <Typography variant="h6" component="h2">
                                    การปรับแก้แผนเอง
                                </Typography>
                                <TextField
                                    id='plan_name'
                                    type='text'
                                    label='ชื่อแผนใหม่'
                                    fullWidth
                                    size='small'
                                    className='font-kanit'
                                    error={errors.plan_name && true}
                                    helperText={errors.plan_name && "กรอกชื่อแผน"}
                                    {...register('plan_name', { required: true })}
                                />
                                <Box
                                    className='grid grid-cols-4 gap-2 mt-2'
                                >
                                    {planReducer.planAi.map((plan) => (
                                        <Button
                                            key={plan.id}

                                            variant='outlined'
                                            disabled={planReducer.plan === plan.id}
                                            onClick={() => dispatch(setPlans(plan.id))}
                                        >
                                            {plan.plan_name}
                                        </Button>
                                    ))}
                                </Box>
                                <Box className='w-full flex justify-end'>
                                    <Button
                                        type='submit'
                                        className='w-24 bg-blue-500'
                                        size='small'
                                        variant='contained'
                                    >
                                        ปรับแผน
                                    </Button>
                                </Box>
                                <AddPlan open={open} handleClose={handleClose} planName={planName} />
                            </Stack>
                        </CardContent>
                    </Card>
                </Box>

            ) : (
                <Card className='bg-[#ffffff]/75 min-h-[80vh]'>
                    <Box sx={{ width: '100%' }}>
                        <Box
                            sx={{ borderBottom: 1, borderColor: 'divider' }}
                            className='flex'
                        >
                            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                                <Tab label="สรุปภาพรวมต้นทุน" className="font-kanit" {...a11yProps(0)} />
                                <Tab label="สรุปต้นทุนทุ่น" className="font-kanit" {...a11yProps(1)} />
                                <Tab label="สรุปต้นทุนเรือ" className="font-kanit" {...a11yProps(2)} />
                                <Tab label="สรุปเเผนการจัดทุ่น" className="font-kanit" {...a11yProps(3)} />
                                <Tab label="สรุปตารางเวลาเเบบทุ่น" className="font-kanit" {...a11yProps(4)} />
                                <Tab label="สรุปตารางเวลาเเบบเรือสินค้า" className="font-kanit" {...a11yProps(5)} />
                            </Tabs>
                        </Box>
                        <CustomTabPanel value={value} index={0}>
                            <SummarizeLayout />
                        </CustomTabPanel>
                        <CustomTabPanel value={value} index={1}>
                            <FTSsingle />
                        </CustomTabPanel>
                        <CustomTabPanel value={value} index={2}>
                            <SummarizaCarrier />
                        </CustomTabPanel>
                        <CustomTabPanel value={value} index={3}>
                            <RouteLayout />
                        </CustomTabPanel>
                        <CustomTabPanel value={value} index={4}>
                            <Box>
                                <FTSGantts />
                            </Box>
                        </CustomTabPanel>
                        <CustomTabPanel value={value} index={5}>
                            <Box>
                                <CraneGantts />
                            </Box>
                        </CustomTabPanel>
                    </Box>
                </Card>
            )}
        </>
    )
}


function HeroPlane({ setPlan }: { setPlan: React.Dispatch<React.SetStateAction<string>> }) {
    const planReducer = useSelector(planSelector)

    return (
        <Box
            className='flex justify-center items-center h-[84vh]'
        >
            <Stack direction="row" spacing={2}>
                <Button
                    size="large"
                    variant="outlined"
                    startIcon={<MemoryIcon />}
                    onClick={() => setPlan('Auto Plan')}
                >
                    {`Auto Plan${planReducer.planAi.length !== 0 ? `(${planReducer.planAi.length})` : ''}`}
                </Button>
                <Button
                    size="large"
                    variant="outlined"
                    startIcon={<PermIdentityIcon />}
                    onClick={() => setPlan('Customize')}
                >
                    {`Customize${planReducer.planUser.length !== 0 ? `(${planReducer.planUser.length})` : ''}`}
                </Button>
            </Stack>
        </Box>
    )
}

export function AddPlan({ open, handleClose }: { open: boolean, handleClose: () => void, planName: string }) {
    const solutionScheduleReducer = useSelector(sulutionScheduelSelector)
    const roleReducer = useSelector(roleSelector)
    const group = roleReducer.result?.group
    if (!group) return
    // _planName

    const handleSubmit = async () => {
        try {

            // const result = {
            //     Group: group,
            //     started_at: new Date(),
            //     ended_at: new Date(),
            //     plan_name: planName,
            //     plan_type: 'user'
            // }
            // const res = await httpClient.post('plan', result)
            const payload = {
                user_group: group,
                solution_id: 71,
                plan: solutionScheduleReducer.edit.reduce((acc: any[], curr) => {
                    const existingOrder = acc.find(order => order.order_id === curr.order_id)
                    const startDate = new Date(curr.arrivaltime);
                    const mysqlDateFormat = startDate.toISOString().slice(0, 19).replace('T', ' ');

                    const ftsData = {
                        fts_id: curr.FTS_id,
                        fts_name: curr.FTS_name,
                        start_date: mysqlDateFormat
                    }

                    if (existingOrder) {
                        existingOrder.FTS.push(ftsData)
                    } else {
                        acc.push({
                            order_id: curr.order_id,
                            FTS: [ftsData]
                        })
                    }

                    return acc
                }, [])
            }
            // console.log()
            console.log(payload)
            const res = await axios.post('http://154.49.243.54:5011/update', payload)
            console.log(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <React.Fragment>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                fullScreen

            >

                <DialogTitle id="alert-dialog-title"
                    className='flex justify-center'
                >
                    {"แก้ไขแผน"}
                </DialogTitle>
                <DialogContent>
                    <EditPlan />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>ยกเลิก</Button>
                    <Button
                        onClick={handleSubmit}
                        autoFocus
                    >
                        ยืนยัน
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment >
    )
}

type Plan = {
    id: number
    order_id: number
    carrier_id: number
    carrier_name: string | null
    FTS_name: string
    FTS_id: number
    start_date: any
    end_date: any
    uuid: string | undefined
}

function EditPlan() {
    const [open, setOpen] = React.useState(false)
    const [plan, setPlan] = useState<Plan>()
    const solutionScheduleReducer = useSelector(sulutionScheduelSelector)

    const handleClickOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    let data = [solutionScheduleReducer.edit[0]]
    data = data.concat(solutionScheduleReducer.edit)

    const datav2 = data.map((item) => {
        // const parsedStartDate = parse(item.arrivaltime, "M/d/yyyy, h:mm:ss a", new Date())
        // const parsedEndDate = parse(item.exittime, "M/d/yyyy, h:mm:ss a", new Date())

        // const formattedStartDate = format(parsedStartDate, "yyyy, M, d HH:mm:ss")
        // const formattedEndDate = format(parsedEndDate, "yyyy, M, d HH:mm:ss")
        return [
            item.carrier_name,
            item.FTS_name,
            new Date(item.arrivaltime),
            new Date(item.exittime)
        ]
    })

    const handleChartClick = ({ chartWrapper }: any) => {
        const selection = chartWrapper.getChart().getSelection()
        if (selection.length === 1) {
            const rowIndex = selection[0].row
            setPlan({
                id: rowIndex,
                order_id: data[rowIndex + 1].order_id,
                carrier_name: data[rowIndex + 1].carrier_name,
                carrier_id: data[rowIndex + 1].carrier_id,
                FTS_name: data[rowIndex + 1].FTS_name,
                FTS_id: data[rowIndex + 1].FTS_id,
                start_date: data[rowIndex + 1].arrivaltime,
                end_date: data[rowIndex + 1].exittime,
                uuid: data[rowIndex + 1].uuid
            })
            handleClickOpen()
        }
    }



    return (
        <Box className="flex justify-center">
            <Chart
                chartType="Timeline"
                data={datav2}
                width="100%"
                height="800px"
                options={{}}
                graph_id="TimelineChart"
                chartEvents={[
                    {
                        eventName: "select",
                        callback: handleChartClick,
                    },
                ]}
            >
            </Chart>
            <EditCarrier open={open} handleClose={handleClose} plan={plan} />
        </Box>
    )
}

export function EditCarrier({ open, handleClose, plan }: { open: boolean, handleClose: () => void, plan: Plan | undefined }) {
    const solutionScheduleReducer = useSelector(sulutionScheduelSelector)
    const [_started, setStarted] = React.useState<Dayjs | null>(plan?.start_date)
    // const [ended, setEnded] = React.useState<Dayjs | null>(plan?.end_date)
    const {
        register,
        handleSubmit,
        formState: { },
    } = useForm()
    const dispatch = useAppDispatch()
    const uniqueNames = Array.from(new Set(solutionScheduleReducer.edit.map(item => item.FTS_name)))

    useEffect(() => {
        if (plan?.carrier_id) {
            dispatch(setCount(plan.carrier_id))
        }
    }, [plan?.carrier_id, solutionScheduleReducer.edit])

    return (
        <React.Fragment>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                maxWidth='xl'
            >
                <DialogTitle id="alert-dialog-title">
                    <Box className='flex justify-between'>
                        {`ปรับเปลี่ยนทุ่น ${plan?.carrier_name}`}
                        <IconButton
                            onClick={() => {
                                dispatch(setAdd({
                                    ...solutionScheduleReducer.count[0],
                                    FTS_name: "",
                                    uuid: uuidv4()
                                }))
                            }}
                        >
                            <AddIcon />
                        </IconButton>
                    </Box>
                </DialogTitle>
                <DialogContent>
                    <Stack
                        spacing={2}
                        component='form'
                        onSubmit={handleSubmit((_) => {
                            solutionScheduleReducer.count.map((countItem) => {
                                const isExist = solutionScheduleReducer.edit.some((editItem) => {
                                    return editItem.order_id === plan?.order_id && editItem.FTS_id === countItem.FTS_id
                                })
                                if (!isExist) {
                                    dispatch(setAddEdit(countItem))
                                }
                            })
                            handleClose()
                        })}
                    >
                        {Array.from({ length: solutionScheduleReducer.count.length }, (_, index) => (
                            <Stack key={index} direction='row' spacing={2}>
                                <FormControl
                                    className='w-72 pt-2'
                                >
                                    <InputLabel
                                        size='small'
                                        id="demo-simple-select-label"
                                        className='pt-2'
                                    >
                                        เปลี่ยนทุ่น
                                    </InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id={`carrier_id`}
                                        label="เปลี่ยนทุ่น"
                                        size='small'
                                        defaultValue={solutionScheduleReducer.count[index].FTS_name}
                                        {...register(`carrier_id`, {
                                            required: true
                                        })}
                                        onChange={(event) => {
                                            const newValue = event.target.value
                                            const result = solutionScheduleReducer.edit.find((s) => s.FTS_name === newValue)
                                            let value = {
                                                fts_id: result?.FTS_id,
                                                fts_name: result?.FTS_name,
                                                uuid: solutionScheduleReducer.count[index].uuid
                                            }
                                            dispatch(setNameCarrier(value))
                                        }}
                                    >
                                        {uniqueNames.map((name, index) => {
                                            return (
                                                <MenuItem key={index} value={name} className='font-kanit'>
                                                    {name}
                                                </MenuItem>
                                            )
                                        })}
                                    </Select>
                                </FormControl>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoContainer components={['DatePicker']}>
                                        <DatePicker
                                            className='w-full'
                                            defaultValue={dayjs(plan?.start_date)}
                                            label="ทุ่นเข้า"
                                            slotProps={{ textField: { size: 'small' } }}
                                            onChange={(newValue) => setStarted(newValue)}
                                        />
                                    </DemoContainer>
                                </LocalizationProvider>
                                <Button
                                    onClick={() => {
                                        dispatch(setRemove(solutionScheduleReducer.count[index].uuid))
                                    }}
                                >
                                    remove
                                </Button>
                            </Stack>
                        ))}

                        <Stack direction='row' spacing={2} className='flex justify-end'>
                            <Button onClick={handleClose}>
                                ยกเลิก
                            </Button>
                            <Button
                                type='submit'
                                autoFocus
                            >
                                ยืนยัน
                            </Button>
                        </Stack>
                    </Stack>
                </DialogContent>
            </Dialog>
        </React.Fragment >
    )
}

// {
//     'user_group': 3,
//     'solution_id': 55, // ที่จะ save ใหม่
//          'plan': [
//                 {
//                     'order_id': 50,
//                     'FTS': [
//                         {
//                             'fts_id': 2,
//                             'start_date': xxx
//                         },
//                         {
//                             'fts_id': 3,
//                             'start_date': xxx
//                         }
//                     ]
//                 },
//                 {
//                     'order_id': 51,
//                     'FTS': [
//                         {
//                             'fts_id': 6,
//                             'start_date': xxx
//                         },
//                         {
//                             'fts_id': 7,
//                             'start_date': xxx
//                         }
//                     ]
//                 },
//             ]
// }