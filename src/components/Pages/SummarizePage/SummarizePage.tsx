import * as React from 'react'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'
import { Button, ButtonGroup, Card, CardContent, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, InputLabel, MenuItem, Select, Stack, TextField, Typography } from '@mui/material'
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
import { format, parse } from 'date-fns'
import { sulutionScheduelAsync, sulutionScheduelSelector } from '../../../store/slices/Solution/sollutionScheduleSlice'
import { useEffect, useState } from 'react'
import { useAppDispatch } from '../../../store/store'
import { planAsync, planSelector, setPlans } from '../../../store/slices/planSlicec'
import { managePlansSelector } from '../../../store/slices/managePlansSlice'
import { useForm } from 'react-hook-form'

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
    }, [managePlansReducer.result])


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
                                    console.log(data)
                                    handleClickOpen()
                                })}
                                component='form'
                                direction='column'
                                spacing={2}
                            >
                                <Typography variant="h6" component="h2">
                                    สร้างแผน
                                </Typography>
                                <TextField
                                    id='plan_name'
                                    type='text'
                                    label='ชื่อแผน'
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
                                        แก้ไขแผน
                                    </Button>
                                </Box>
                                <AddPlan open={open} handleClose={handleClose} />
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
                    Auto Plan(3)
                </Button>
                <Button
                    size="large"
                    variant="outlined"
                    startIcon={<PermIdentityIcon />}
                    onClick={() => setPlan('Customize')}
                >
                    Customize(3)
                </Button>
            </Stack>
        </Box>
    )
}

export function AddPlan({ open, handleClose }: { open: boolean, handleClose: () => void }) {


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
                    <Button onClick={handleClose}>Disagree</Button>
                    <Button
                        onClick={handleClose}
                        autoFocus
                    >
                        Agree
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment >
    )
}

type Plan = {
    id: number
    carrier: string | Date | null
    FTS: string | Date | null
    start_date: any
    end_date: any
}

function EditPlan() {
    const [open, setOpen] = React.useState(false)
    const [plan, setPlan] = useState<Plan>()
    const solutionScheduleReducer = useSelector(sulutionScheduelSelector)

    const handleClickOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    let data = [solutionScheduleReducer.chars[0]]
    data = data.concat(solutionScheduleReducer.chars)

    const datav2 = data.map((item) => {
        const parsedStartDate = parse(item.arrivaltime, "M/d/yyyy, h:mm:ss a", new Date())
        const parsedEndDate = parse(item.exittime, "M/d/yyyy, h:mm:ss a", new Date())

        const formattedStartDate = format(parsedStartDate, "yyyy, M, d HH:mm:ss")
        const formattedEndDate = format(parsedEndDate, "yyyy, M, d HH:mm:ss")

        return [
            item.carrier_name,
            item.FTS_name,
            new Date(formattedStartDate),
            new Date(formattedEndDate),
        ]
    })

    const handleChartClick = ({ chartWrapper }: any) => {
        const selection = chartWrapper.getChart().getSelection()
        if (selection.length === 1) {
            const rowIndex = selection[0].row
            const selectedCarrier = datav2[rowIndex + 1][0]
            const selectedFTSName = datav2[rowIndex + 1][1]
            const selectedStartDate = datav2[rowIndex + 1][2]
            const selectedEndDate = datav2[rowIndex + 1][3]
            setPlan({
                id: rowIndex,
                carrier: selectedCarrier,
                FTS: selectedFTSName,
                start_date: selectedStartDate,
                end_date: selectedEndDate,
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
            />
            <EditCarrier open={open} handleClose={handleClose} plan={plan} />
        </Box>
    )
}

export function EditCarrier({ open, handleClose, plan }: { open: boolean, handleClose: () => void, plan: Plan | undefined }) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()
    const solutionScheduleReducer = useSelector(sulutionScheduelSelector)

    return (
        <React.Fragment>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"แก้ไขแผน"}
                </DialogTitle>
                <DialogContent>
                    <form
                        onSubmit={handleSubmit((data) => {
                            console.log(data)
                        })}
                    >
                        <FormControl fullWidth>
                            <InputLabel
                                size='small'
                                id="demo-simple-select-label"
                            >
                                เลือกเรือ
                            </InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id={`carrier_name`}
                                label="เลือกสินค้า"
                                size='small'
                                {...register(`carrier_name`, {
                                    required: true
                                })}
                            >
                                {(solutionScheduleReducer.chars).map((items, index) => (
                                    <MenuItem key={index} value={plan?.id} className='font-kanit'>
                                        {items.carrier_name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <Button onClick={handleClose}>Disagree</Button>
                        <Button
                            type='submit'
                            autoFocus
                        >
                            Agree
                        </Button>
                        {/* <TextField
                        id='plan_name'
                        type='text'
                        label='ชื่อแผน'
                        fullWidth
                        size='small'
                        defaultValue={plan?.carrier}
                        className='font-kanit'
                        error={errors.plan_name && true}
                        helperText={errors.plan_name && "กรอกชื่อแผน"}
                        {...register('plan_name', { required: true })}
                    /> */}
                        {/* <DialogContentText id="alert-dialog-description">
                        {JSON.stringify(plan)}
                    </DialogContentText> */}
                    </form>
                </DialogContent>
                {/* <DialogActions>
                    <Button onClick={handleClose}>Disagree</Button>
                    <Button onClick={handleClose} autoFocus>
                        Agree
                    </Button>
                </DialogActions> */}
            </Dialog>
        </React.Fragment>
    )
}


// {
//     'user_group': 3,
//         'solution_id': 55, // ที่จะ save ใหม่
//             'plan': [
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