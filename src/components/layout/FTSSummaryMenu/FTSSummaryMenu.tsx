import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Card } from '@mui/material';
import FTSTimeList from '../FTSTimeList/FTSTimeList';
import FTSFuelList from '../FTSFuelList/FTSFuelList';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';

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

export default function FTSSummaryMenu() {
    const FTSsolutionSlice = useSelector((state: RootState) => state.FTSsolution);
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        event.preventDefault()
        setValue(newValue);
    };

    console.log(FTSsolutionSlice)

    return (
        <Card className='bg-[#ffffff]/75 max-h-[85vh]'>
            <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                        <Tab label="ระยะเวลา" {...a11yProps(0)} />
                        <Tab label="เชื้อเพลิง" {...a11yProps(1)} />
                    </Tabs>
                </Box>
                <CustomTabPanel value={value} index={0}>
                    <FTSTimeList />
                </CustomTabPanel>
                <CustomTabPanel value={value} index={1}>
                    <FTSFuelList />
                </CustomTabPanel>
            </Box>
        </Card >
    );
}