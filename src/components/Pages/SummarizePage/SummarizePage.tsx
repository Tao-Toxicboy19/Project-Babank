import * as React from 'react'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'
import { Button, ButtonGroup, Card, CardContent, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Stack } from '@mui/material'
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
import { sulutionScheduelSelector } from '../../../store/slices/Solution/sollutionScheduleSlice'
import { useEffect } from 'react'
import { useAppDispatch } from '../../../store/store'
import { planAsync, planSelector, setPlans } from '../../../store/slices/planSlicec'
import { managePlansSelector } from '../../../store/slices/managePlansSlice'

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

    // console.log(planReducer.plan)

    useEffect(() => {
        if (planReducer.result.length > 0) {
            dispatch(setPlans(planReducer.result[0].id))
        }
    }, [planReducer.result, dispatch])


    return (
        <>
            <Stack direction='row' spacing={2} className='max-w-full my-3 justify-between'>
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
                    <ButtonGroup variant="text" aria-label="Basic button group">
                        {planReducer.result.map((plan) => (
                            <Button
                                disabled={planReducer.plan === plan.id}
                                key={plan.id}
                                onClick={() => dispatch(setPlans(plan.id))}
                            >
                                {plan.plan_name}
                            </Button>
                        ))}
                    </ButtonGroup>
                </Stack>
                <Box className='pr-5'>
                    <AddPlan />
                </Box>

            </Stack>
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

export function AddPlan() {
    const [open, setOpen] = React.useState(false)

    const handleClickOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    return (
        <React.Fragment>
            <Button variant="outlined" onClick={handleClickOpen}>
                เพิ่มแผน
            </Button>

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                fullScreen

            >

                <DialogTitle id="alert-dialog-title">
                    {"Use Google's location service?"}
                </DialogTitle>
                <DialogContent>
                    <EditPlan />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Disagree</Button>
                    <Button onClick={handleClose} autoFocus>
                        Agree
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment >
    )
}

function EditPlan() {
    const [open, setOpen] = React.useState(false)
    const handleClickOpen = () => setOpen(true)

    const handleClose = () => setOpen(false)

    const solutionScheduleReducer = useSelector(sulutionScheduelSelector)
    const filteredData = (solutionScheduleReducer.result).filter((item) => item.carrier_name !== null)
    let data = [filteredData[0]]
    data = data.concat(filteredData)

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
            // const rowIndex = selection[0].row
            // const selectedPresident = datav2[rowIndex + 1][0]
            // alert(`You clicked on: ${selectedPresident}`)/
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
            <EditCarrier open={open} handleClose={handleClose} />
        </Box>
    )
}

export function EditCarrier({ open, handleClose }: { open: boolean, handleClose: () => void }) {

    return (
        <React.Fragment>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Use Google's location service?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Let Google help apps determine location. This means sending anonymous
                        location data to Google, even when no apps are running.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Disagree</Button>
                    <Button onClick={handleClose} autoFocus>
                        Agree
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    )
}