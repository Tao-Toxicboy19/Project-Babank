import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import RoutesTabelLayout from '../RoutesTabelLayout/RoutesTabelLayout';
import { Button, Card } from '@mui/material';
import MapsModal from '../MapsModal/MapsModal';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
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
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

export default function RouteLayout() {
    const [value, setValue] = React.useState(0);
    const FTSsolutionSlice = useSelector((state: RootState) => state.FTSsolution.result);
    const [open, setOpen] = React.useState(false);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        event.preventDefault();
        setValue(newValue);
        console.log(FTSsolutionSlice[newValue]?.FTS_name);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };



    return (
        <Box className='grid grid-cols-9 h-[80vh]'>
            <Card className='h-[85%]'>
                <Tabs
                    orientation="vertical"
                    variant="scrollable"
                    value={value}
                    onChange={handleChange}
                    aria-label="Vertical tabs example"
                >
                    {FTSsolutionSlice.map((items, index) => (
                        <Tab
                            className={value === index ? 'bg-[#caf0f8]/25' : 'text-gray-600'} // เปลี่ยนสีของ font ตามเงื่อนไขที่คุณต้องการ
                            label={`${items.FTS_name}`}
                            {...a11yProps(index)}
                        />
                    ))}
                </Tabs>
            </Card>
            <Box className='col-span-8'>
                <TabPanel value={value} index={value}>
                    <Box
                        className='flex justify-end mt-[-2rem]'
                    >
                        <Button
                            onClick={handleClickOpen}
                            variant='outlined'
                        >
                            ดูเส้นทาง
                        </Button>
                    </Box>
                    <MapsModal
                        open={open}
                        handleClose={handleClose}
                        FTSsolutionSlice={FTSsolutionSlice}
                        value={value}
                    />
                    {/* Table */}
                    <RoutesTabelLayout FTSsolutionSlice={FTSsolutionSlice} value={value} />
                    {/* Table */}
                </TabPanel>
            </Box>
        </Box>
    );
}