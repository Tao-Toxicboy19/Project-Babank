import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Card } from '@mui/material';
import SummarizeLayout from '../../layout/SummarizeLayout/SummarizeLayout';
import RouteLayout from '../../layout/RouteLayout/RouteLayout';
import FTSsingle from '../../layout/FTSsingle/FTSsingle';

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

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        event.preventDefault()
        setValue(newValue);
    };

    return (
        <Card className='bg-[#ffffff]/75 h-[80vh]'>
            <Box sx={{ width: '100%' }}>
                <Box
                    sx={{ borderBottom: 1, borderColor: 'divider' }}
                    className='flex'
                >
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                        <Tab label="สรุป" {...a11yProps(0)} />
                        <Tab label="ทุ่น" {...a11yProps(1)} />
                        <Tab label="เส้นทาง" {...a11yProps(2)} />
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
            </Box>
        </Card>
    );
}
