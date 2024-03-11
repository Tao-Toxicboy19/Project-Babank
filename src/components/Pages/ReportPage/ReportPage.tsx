import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Card, CardContent } from '@mui/material';
import ReportFTS from './ReportFTS/ReportFTS';
import ReportCrane from './ReportCrane/ReportCrane';

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

export default function ReportPage() {
    const [value, setValue] = React.useState(0)
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        event.preventDefault()
        setValue(newValue);
    }
    return (
        <Card>
            <CardContent>
                <Box sx={{ width: '100%' }}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                            <Tab label="ทุ่น" {...a11yProps(0)} />
                            <Tab label="เครน" {...a11yProps(1)} />
                        </Tabs>
                    </Box>
                    <CustomTabPanel value={value} index={0}>
                        <Typography variant='h5' component='h1' className='flex justify-center font-kanit text-[#435b7e] font-bold'>
                            รายงานทุ่น
                        </Typography>
                        <ReportFTS />
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={1}>
                        <Typography variant='h5' component='h1' className='flex justify-center font-kanit text-[#435b7e] font-bold'>
                            รายงานเครน
                        </Typography>
                        <ReportCrane />
                    </CustomTabPanel>
                </Box>
            </CardContent>
        </Card>
    );
}