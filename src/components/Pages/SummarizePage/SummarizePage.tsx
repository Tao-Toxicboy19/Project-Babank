import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { Button, ButtonGroup, Card, CardContent, Stack } from '@mui/material';
import RouteLayout from '../../layout/RouteLayout/RouteLayout';
import DialogLoading from '../../layout/DialogLoading/DialogLoading';
import FTSGantts from '../../layout/Gantts/FTS/FTSGantts';
import CraneGantts from '../../layout/Gantts/Crane/CraneGantt';
import { useSelector } from 'react-redux';
import SummarizaCarrier from '../../layout/SummarizaCarrier/SummarizaCarrier';
import SummarizeLayout from './SummarizeLayout/SummarizeLayout';
import FTSsingle from './FTSsingle/FTSsingle';
import { roleSelector } from '../../../store/slices/auth/rolesSlice';
import MemoryIcon from '@mui/icons-material/Memory';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

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
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function SummarizePage() {
    const [value, setValue] = React.useState(0);
    const [plan, setPlan] = React.useState<string>('hero')

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        event.preventDefault()
        setValue(newValue);
    };

    console.log(plan)
    return (
        <Card>
            <CardContent>
                {plan === 'hero' ? (
                    <HeroPlane setPlan={setPlan} />
                ) : (plan === 'AiPlan' ? (
                    <AiPlan setPlan={setPlan} value={value} handleChange={handleChange} />
                ) : (plan === 'UserPlan' ? (
                    <AiPlan setPlan={setPlan} value={value} handleChange={handleChange} />
                ) : null))}



            </CardContent>
        </Card >
    );
}

type AiPlan = {
    setPlan: React.Dispatch<React.SetStateAction<string>>
    value: number
    handleChange: (event: React.SyntheticEvent, newValue: number) => void
}

function AiPlan({ setPlan, value, handleChange }: AiPlan) {
    const rolesReducer = useSelector(roleSelector)

    return (
        <>
            <Stack direction='row' spacing={2} className='max-w-[60%] my-3'>
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
                        <DialogLoading />
                    )
                )}
                <ButtonGroup variant="text" aria-label="Basic button group">
                    <Button>A</Button>
                    <Button>B</Button>
                    <Button>C</Button>
                </ButtonGroup>

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
                    onClick={() => setPlan('AiPlan')}
                >
                    AI Plans(3)
                </Button>
                <Button
                    size="large"
                    variant="outlined"
                    startIcon={<PermIdentityIcon />}
                    onClick={() => setPlan('UserPlan')}
                >
                    User Plans(3)
                </Button>
            </Stack>
        </Box>
    )
}