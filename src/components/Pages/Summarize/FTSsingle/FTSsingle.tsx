import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store/store';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { titles } from '../../../../Constants';
import SummarizaCard from '../../../layout/SummarizaCard/SummarizaCard';
import CurrencyBitcoinIcon from '@mui/icons-material/CurrencyBitcoin';

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
    const SolutionscheduleReducer = useSelector((state: RootState) => state.Solutionschedule.solution_schedule);

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
                        <TableContainer component={Paper} className='mt-5'>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead className='bg-blue-200'>
                                    <TableRow>
                                        {titles.map((title) => (
                                            <TableCell key={title} align={title === 'ชื่อทุ่น' ? 'left' : 'right'}>
                                                {title}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {(SolutionscheduleReducer)
                                        .filter((items) => items.FTS_name === FTSsolutionSlice[value]?.FTS_name)
                                        .map((items, index) => (
                                            <TableRow
                                                key={index}
                                            >
                                                <TableCell align="left" className='w-[100px]'>{items.FTS_name}</TableCell>
                                                <TableCell align="right">
                                                    {items.carrier_name ? items.carrier_name : 'จุดเริ่มต้น'}
                                                </TableCell>
                                                <TableCell align="right">{items.lat}</TableCell>
                                                <TableCell align="right">{items.lng}</TableCell>
                                                <TableCell align="right">{items.arrivaltime}</TableCell>
                                                <TableCell align="right">{items.exittime}</TableCell>
                                                <TableCell align="right">{items.operation_time}</TableCell>
                                                <TableCell align="right">{items.travel_Distance}</TableCell>
                                            </TableRow>
                                        ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </TabPanel>
                </Box >
            </Box>
        </>
    );
}