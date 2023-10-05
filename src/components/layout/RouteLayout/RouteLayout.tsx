import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import RoutesTabelLayout from '../RoutesTabelLayout/RoutesTabelLayout';
import { Card } from '@mui/material';
import RouteMaps from '../RouteMaps/RouteMaps';

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

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        event.preventDefault();
        setValue(newValue);
        console.log(FTSsolutionSlice[newValue]?.FTS_name);
    };

    return (
        <Box className='grid grid-cols-9'>
            <Card className='h-[100%]'>
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
                <TabPanel value={value} index={value}> {/* ใช้ flex เพื่อให้ส่วนนี้เลื่อนขึ้นลงได้ */}
                    <Box className='flex flex-col gap-y-5'>
                        <Box className='flex-grow mt-[-3rem]'> {/* ใช้ flex-grow เพื่อให้ส่วนนี้ขยายตามพื้นที่ที่เหลือ */}
                            <RoutesTabelLayout FTSsolutionSlice={FTSsolutionSlice} value={value} />
                        </Box>
                        <Box> {/* ส่วนนี้อยู่ด้านล่าง จะตรงนี้เลื่อนขึ้นลง */}
                            <RouteMaps FTSsolutionSlice={FTSsolutionSlice} value={value} />
                        </Box>
                    </Box>
                </TabPanel>
            </Box>
        </Box>

    );
}