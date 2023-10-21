import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { useSelector } from 'react-redux';
import CurrencyBitcoinIcon from '@mui/icons-material/CurrencyBitcoin';
import { RootState } from '../../../store/store';
import SummarizaCard from '../SummarizaCard/SummarizaCard';
import { Card, Typography } from '@mui/material';
import { BarCharts } from '../BarCharts/BarCharts';

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

export default function FTSsingle() {
    const [value, setValue] = React.useState(0);
    const FTSsolutionSlice = useSelector((state: RootState) => state.FTSsolution.result);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        event.preventDefault();
        setValue(newValue);
    };

    return (
        <>
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
                                key={index}
                                className={value === index ? 'bg-[#caf0f8]/25 font-kanit' : 'text-gray-600 font-kanit'}
                                label={`${items.fts.FTS_name}`}
                                {...a11yProps(0)}
                            />
                        ))}
                    </Tabs>
                </Card>
                <Box className='col-span-8'>
                    <TabPanel value={value} index={value}>
                        <Box className="grid grid-cols-12 gap-5 mt-[-2rem]">
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
                                {FTSsolutionSlice[value]?.fts.FTS_name}
                            </Typography>
                            {FTSsolutionSlice[value] && (
                                <Box className='col-span-12 grid grid-cols-5 gap-x-5'>
                                    <SummarizaCard
                                        title={'ต้นรวมทุน'}
                                        price={FTSsolutionSlice[value].solutions.reduce((total, solution) => total + solution.total_cost, 0)}
                                        icon={CurrencyBitcoinIcon}
                                        unit={'บาท'}
                                        color='bg-[#00a6fb]/50'
                                    />
                                    <SummarizaCard
                                        title={'ค่าเชื้อเพลิงรวม'}
                                        price={FTSsolutionSlice[value].solutions.reduce((total, solution) => total + solution.total_consumption_cost, 0)}
                                        icon={CurrencyBitcoinIcon}
                                        unit={'บาท'}
                                        color='bg-[#00a6fb]/50'
                                    />
                                    <SummarizaCard
                                        title={'ค่าแรง'}
                                        price={FTSsolutionSlice[value].solutions.reduce((total, solution) => total + solution.total_wage_cost, 0)}
                                        icon={CurrencyBitcoinIcon}
                                        unit={'บาท'}
                                        color='bg-[#00a6fb]/50'
                                    />
                                    <SummarizaCard
                                        title={'ค่าปรับล่าช้า'}
                                        price={FTSsolutionSlice[value].solutions.reduce((total, solution) => total + solution.penality_cost, 0)}
                                        icon={CurrencyBitcoinIcon}
                                        unit={'บาท'}
                                        color='bg-[#00a6fb]/50'
                                    />
                                    <SummarizaCard
                                        title={'รางวัล'}
                                        price={FTSsolutionSlice[value].solutions.reduce((total, solution) => total + solution.total_reward, 0)}
                                        icon={CurrencyBitcoinIcon}
                                        unit={'บาท'}
                                        color='bg-[#00a6fb]/50'
                                    />
                                </Box>
                            )}
                            {/* <Card className="max-w-[350px] col-span-3">
                                <DetailMenu FTSsolutionSlice={FTSsolutionSlice} value={value} />
                            </Card> */}
                            <Card className="col-span-10">
                                <BarCharts FTSsolutionSlice={FTSsolutionSlice} value={value} />
                            </Card>
                        </Box>
                    </TabPanel>
                </Box >
            </Box>
        </>
    );
}