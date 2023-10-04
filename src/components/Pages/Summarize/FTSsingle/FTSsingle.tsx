import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store/store';
import SummarizaCard from '../../../layout/SummarizaCard/SummarizaCard';
import CurrencyBitcoinIcon from '@mui/icons-material/CurrencyBitcoin';
import RoutesTabelLayout from './RoutesTabelLayout/RoutesTabelLayout';

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
        console.log(FTSsolutionSlice[newValue]?.FTS_name);
    };


    return (
        <>
            <Box className='grid grid-cols-9 min-h-[70vh]'>
                <Tabs
                    orientation="vertical"
                    variant="scrollable"
                    value={value}
                    onChange={handleChange}
                    aria-label="Vertical tabs example"
                >
                    {FTSsolutionSlice.map((items) => (
                        <Tab
                            label={`${items.FTS_name}`}
                            {...a11yProps(0)}
                        />
                    ))}
                </Tabs>

                <Box className='col-span-8 mt-[-2rem]'>
                    <TabPanel value={value} index={value}>
                        {FTSsolutionSlice[value] && (
                            <Box className='grid grid-cols-5 gap-x-5'>
                                <SummarizaCard
                                    title={'ต้นรวมทุน'}
                                    price={FTSsolutionSlice[value].penality_cost_sum}
                                    icon={CurrencyBitcoinIcon}
                                    unit={'บาท'}
                                    color='bg-[#00a6fb]/50'
                                />
                                <SummarizaCard
                                    title={'ค่าเชื้อเพลิงรวม'}
                                    price={FTSsolutionSlice[value].penality_cost_sum}
                                    icon={CurrencyBitcoinIcon}
                                    unit={'บาท'}
                                    color='bg-[#00a6fb]/50'
                                />
                                <SummarizaCard
                                    title={'ค่าแรง'}
                                    price={FTSsolutionSlice[value].penality_cost_sum}
                                    icon={CurrencyBitcoinIcon}
                                    unit={'บาท'}
                                    color='bg-[#00a6fb]/50'
                                />
                                <SummarizaCard
                                    title={'ค่าปรับล่าช้า'}
                                    price={FTSsolutionSlice[value].penality_cost_sum}
                                    icon={CurrencyBitcoinIcon}
                                    unit={'บาท'}
                                    color='bg-[#00a6fb]/50'
                                />
                                <SummarizaCard
                                    title={'รางวัล'}
                                    price={FTSsolutionSlice[value].penality_cost_sum}
                                    icon={CurrencyBitcoinIcon}
                                    unit={'บาท'}
                                    color='bg-[#00a6fb]/50'
                                />
                            </Box>
                        )}
                        <RoutesTabelLayout FTSsolutionSlice={FTSsolutionSlice} value={value} />
                    </TabPanel>
                </Box >
            </Box>
        </>
    );
}