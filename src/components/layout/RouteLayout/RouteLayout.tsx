import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useSelector } from 'react-redux';
import RoutesTabelLayout from '../RoutesTabelLayout/RoutesTabelLayout';
import { Card } from '@mui/material';
import RouteMaps from '../RouteMaps/RouteMaps';
import { ftsSolutionTableAsync, ftsSolutionTableSelector } from '../../../store/slices/Solution/ftsSolutionTableSlice';
import { useEffect } from 'react';
import { useAppDispatch } from '../../../store/store';
import { planSelector } from '../../../store/slices/planSlicec';
import { sulutionScheduelAsync } from '../../../store/slices/Solution/sollutionScheduleSlice';
import { solutionOrderAsync } from '../../../store/slices/Solution/solutionOrderSlice';

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
                    {children}
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
    const ftsSolutionReducer = useSelector(ftsSolutionTableSelector)
    const dispatch = useAppDispatch()
    const planReducer = useSelector(planSelector)

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        event.preventDefault();
        setValue(newValue);
    }

    useEffect(() => {
        dispatch(sulutionScheduelAsync(planReducer.plan))
        dispatch(ftsSolutionTableAsync(planReducer.plan))
        dispatch(solutionOrderAsync(planReducer.plan))
    }, [planReducer.plan])

    return (
        <>
            {ftsSolutionReducer.result.length === 0 ? (
                <Typography
                    sx={{
                        mr: 2,
                        fontSize: 33,
                        display: { xs: "none", md: "flex" },
                        fontFamily: "monospace",
                        fontWeight: 700,
                        letterSpacing: ".1rem",
                        color: "inherit",
                        textDecoration: "none",
                    }}
                    className='text-cyan-800 flex justify-center items-center'
                    variant='h4'
                    component='h2'
                >
                    ไม่มีข้อมูล
                </Typography>
            ) : (
                <>
                    {ftsSolutionReducer.result.length === 0 ? (
                        <Typography
                            sx={{
                                mr: 2,
                                fontSize: 33,
                                display: { xs: "none", md: "flex" },
                                fontFamily: "monospace",
                                fontWeight: 700,
                                letterSpacing: ".1rem",
                                color: "inherit",
                                textDecoration: "none",
                            }}
                            className='text-cyan-800 flex justify-center items-center'
                            variant='h4'
                            component='h2'
                        >
                            ไม่มีข้อมูล
                        </Typography>
                    ) : (
                        <Box className='grid grid-cols-9'>
                            <Card className='h-[100%]'>
                                <Tabs
                                    orientation="vertical"
                                    variant="scrollable"
                                    value={value}
                                    onChange={handleChange}
                                    aria-label="Vertical tabs example"
                                >
                                    {ftsSolutionReducer.result.map((items, index) => (
                                        <Tab
                                            // className='font-kanit'
                                            key={index}
                                            className={value === index ? 'bg-[#caf0f8]/25 font-kanit' : 'text-gray-600 font-kanit'}
                                            label={`${items.fts.FTS_name}`}
                                            {...a11yProps(index)}
                                        />
                                    ))}
                                </Tabs>
                            </Card>
                            <Box className='col-span-8'>
                                <TabPanel value={value} index={value}> {/* ใช้ flex เพื่อให้ส่วนนี้เลื่อนขึ้นลงได้ */}
                                    <Box className='flex flex-col gap-y-3 mt-[-2rem]'>
                                        <Typography
                                            className='col-span-12 flex justify-center border-b-[1px] border-gray-300 font-kanit'
                                            component='h1'
                                            sx={{
                                                fontSize: 22,
                                                fontFamily: "monospace",
                                                fontWeight: 700,
                                                letterSpacing: ".1rem",
                                                color: "inherit",
                                                textDecoration: "none",
                                            }}
                                        >
                                            {ftsSolutionReducer.result[value]?.fts.FTS_name}
                                        </Typography>
                                        <Box className='flex-grow mt-[-1rem]'> {/* ใช้ flex-grow เพื่อให้ส่วนนี้ขยายตามพื้นที่ที่เหลือ */}
                                            <RoutesTabelLayout ftsSolutionReducer={ftsSolutionReducer.result} value={value} />
                                        </Box>
                                        <Box> {/* ส่วนนี้อยู่ด้านล่าง จะตรงนี้เลื่อนขึ้นลง */}
                                            <RouteMaps ftsSolutionReducer={ftsSolutionReducer.result} value={value} />
                                        </Box>
                                    </Box>
                                </TabPanel>
                            </Box>
                        </Box>
                    )}
                </>
            )}
        </>
    );
}