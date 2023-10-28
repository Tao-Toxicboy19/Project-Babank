import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Card, CardContent, Stack } from '@mui/material';
import SummarizeLayout from '../../layout/SummarizeLayout/SummarizeLayout';
import RouteLayout from '../../layout/RouteLayout/RouteLayout';
import FTSsingle from '../../layout/FTSsingle/FTSsingle';
import DialogLoading from '../../layout/DialogLoading/DialogLoading';
import FTSGantts from '../../layout/Gantts/FTS/FTSGantts';
import CraneGantts from '../../layout/Gantts/Crane/CraneGantt';

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
                    <Typography>{children}</Typography>
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
    // const currentYear = new Date().getFullYear();
    // const [selectedYear, setSelectedYear] = React.useState(currentYear);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        event.preventDefault()
        setValue(newValue);
    };

    return (
        <Card>
            <CardContent>
                <Stack direction='row' spacing={2} className='max-w-[60%] my-3'>
                    <DialogLoading />
                    {/* <FormControl fullWidth className="bg-[#fff]">
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            className="font-kanit"
                            value={selectedYear}
                            onChange={(e: any) => setSelectedYear(e.target.value)}
                        >
                            <MenuItem value={currentYear} className="font-kanit">{currentYear}</MenuItem>
                        </Select>
                    </FormControl> */}

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
                                <Tab label="สรุปเเผนการจัดทุ่น" className="font-kanit" {...a11yProps(2)} />
                                <Tab label="สรุปตารางเวลาเเบบทุ่น" className="font-kanit" {...a11yProps(3)} />
                                <Tab label="สรุปตารางเวลาเเบบเรือสินค้า" className="font-kanit" {...a11yProps(4)} />
                            </Tabs>
                        </Box>
                        <CustomTabPanel value={value} index={0}>
                            <SummarizeLayout />
                        </CustomTabPanel>
                        <CustomTabPanel value={value} index={1}>
                            <FTSsingle />
                        </CustomTabPanel>
                        <CustomTabPanel value={value} index={2}>
                            <RouteLayout />
                        </CustomTabPanel>
                        <CustomTabPanel value={value} index={3}>
                            <Box>
                                <FTSGantts />
                            </Box>
                        </CustomTabPanel>
                        <CustomTabPanel value={value} index={4}>
                            <Box>
                                <CraneGantts />
                            </Box>
                        </CustomTabPanel>
                    </Box>
                </Card>
            </CardContent>
        </Card >
    );
}
