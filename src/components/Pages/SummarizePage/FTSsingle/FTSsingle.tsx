import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { useSelector } from 'react-redux';
import CurrencyBitcoinIcon from '@mui/icons-material/CurrencyBitcoin';
import { Card, Typography } from '@mui/material';
import Tables from './Table/Tables';
import { BarCharts } from '../../../layout/BarCharts/BarCharts';
import SummarizaCard from '../../../layout/SummarizaCard/SummarizaCard';
import { roleSelector } from '../../../../store/slices/auth/rolesSlice';
import { craneSolutionTableSelector } from '../../../../store/slices/FtsSolution/craneSolutionTableSlice';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;
    // loadSolution_carrier_order
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
    const [value, setValue] = React.useState(0)
    const ftsSolutionReducer = useSelector(craneSolutionTableSelector)
    const rolesReducer = useSelector(roleSelector)

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        event.preventDefault();
        setValue(newValue);
    };
    const filteredftsSolutionReducer = ftsSolutionReducer.result[value].solutions.filter((group) => group.solution_id === rolesReducer.result?.group);


    return (
        <>
            {filteredftsSolutionReducer.length === 0 ? (
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
                    {
                        ftsSolutionReducer.result.length === 0 ? (
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
                                                {ftsSolutionReducer.result[value]?.fts.FTS_name}
                                            </Typography>

                                            {ftsSolutionReducer.result[value] && (
                                                <Box className='col-span-12 grid grid-cols-6 gap-x-5'>
                                                    <Box></Box>
                                                    <SummarizaCard
                                                        title={'ต้นทุนรวม'}
                                                        price={ftsSolutionReducer.result[value].solutions.reduce((_, solution) =>
                                                            // total + solution.total_cost
                                                            solution.total_consumption_cost
                                                            + solution.total_wage_cost
                                                            + solution.penality_cost
                                                            , 0)
                                                            .toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                                                        }
                                                        icon={CurrencyBitcoinIcon}
                                                        unit={'บาท'}
                                                        color='bg-[#00a6fb]/50'
                                                    />
                                                    <SummarizaCard
                                                        title={'ค่าเชื้อเพลิงรวม'}
                                                        price={ftsSolutionReducer.result[value].solutions.reduce((total, solution) => total + solution.total_consumption_cost, 0).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                                        icon={CurrencyBitcoinIcon}
                                                        unit={'บาท'}
                                                        color='bg-[#00a6fb]/50'
                                                    />
                                                    <SummarizaCard
                                                        title={'ค่าแรง'}
                                                        price={ftsSolutionReducer.result[value].solutions.reduce((total, solution) => total + solution.total_wage_cost, 0).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                                        icon={CurrencyBitcoinIcon}
                                                        unit={'บาท'}
                                                        color='bg-[#00a6fb]/50'
                                                    />
                                                    <SummarizaCard
                                                        title={'ค่าปรับล่าช้า'}
                                                        price={(
                                                            ftsSolutionReducer.result[value].solutions.reduce(
                                                                (max, solution) => Math.max(max, solution.penality_cost),
                                                                -Infinity
                                                            )
                                                        ).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                                        icon={CurrencyBitcoinIcon}
                                                        unit={'บาท'}
                                                        color='bg-[#00a6fb]/50'
                                                    />
                                                    <SummarizaCard
                                                        title={'รางวัล'}
                                                        price={(
                                                            ftsSolutionReducer.result[value].solutions.reduce(
                                                                (min, solution) => Math.min(min, solution.total_reward),
                                                                Infinity
                                                            )
                                                        ).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                                        icon={CurrencyBitcoinIcon}
                                                        unit={'บาท'}
                                                        color='bg-[#00a6fb]/50'
                                                    />
                                                </Box>
                                            )}
                                            <Box className="col-span-12">
                                                <Tables Name={ftsSolutionReducer.result[value]?.fts.FTS_name} value={value} />
                                            </Box>
                                            <Card className="col-span-12">
                                                <BarCharts ftsSolutionReducer={ftsSolutionReducer.result} value={value} />
                                            </Card>
                                        </Box>
                                    </TabPanel>
                                </Box >
                            </Box>
                        )
                    }
                </>
            )}
        </>
    );
}