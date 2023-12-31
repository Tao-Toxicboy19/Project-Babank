import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Card } from '@mui/material';
import FuelList from '../FuelList/FuelList';
import TimeList from '../TimeList/TimeList';

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

export default function DetailMenu({ FTSsolutionSlice, value }: any) {
    const [values, setValues] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        event.preventDefault()
        setValues(newValue);
    };

    return (
        <Card className='bg-[#ffffff]/75 max-h-[85vh]'>
            <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={values} onChange={handleChange} aria-label="basic tabs example">
                        <Tab label="ระยะเวลา" {...a11yProps(0)} />
                        <Tab label="เชื้อเพลิง" {...a11yProps(1)} />
                    </Tabs>
                </Box>
                <CustomTabPanel value={values} index={0}>
                    <TimeList FTSsolutionSlice={FTSsolutionSlice} value={value} />
                </CustomTabPanel>
                <CustomTabPanel value={values} index={1}>
                    <FuelList />
                </CustomTabPanel>
            </Box>
        </Card >
    );
}



