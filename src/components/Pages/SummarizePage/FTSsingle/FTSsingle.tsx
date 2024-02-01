import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { Card, Typography } from '@mui/material';
import SummarizaCard from '../../../layout/SummarizaCard/SummarizaCard';
import CurrencyBitcoinIcon from '@mui/icons-material/CurrencyBitcoin';
import { useSelector } from 'react-redux';
import { craneSolutionV2Selector } from '../../../../store/slices/Solution/craneSolutionV2Slice';
import { roleSelector } from '../../../../store/slices/auth/rolesSlice';
import { ftsSelector } from '../../../../store/slices/FTS/ftsSlice';
import Tables from './Table/Tables';

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
    const rolesReducer = useSelector(roleSelector)
    const craneSolutionV2Reducer = useSelector(craneSolutionV2Selector)
    const ftsReducer = useSelector(ftsSelector)

    const handleChange = (_: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const craneSolutionV2 = (craneSolutionV2Reducer.result).filter((group) => group.solution_id === rolesReducer.result?.group)

    if (craneSolutionV2.length === 0) {
        return (
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
        )
    }

    const combinedResults = craneSolutionV2.reduce((acc: any, row: any) => {
        // ในกรณีที่ยังไม่มี key นี้ใน acc
        if (!acc[row.FTS_id]) {
            acc[row.FTS_id] = { ...row }; // ให้ค่าเป็นข้อมูล row ทั้งหมด
        } else {
            // ในกรณีที่มี key นี้ใน acc แล้ว
            // บวกค่าที่ต้องการรวมเข้ากับค่าที่มีอยู่แล้ว
            acc[row.FTS_id].total_cost += row.total_cost;
            acc[row.FTS_id].total_consumption_cost += row.total_consumption_cost;
            acc[row.FTS_id].total_wage_cost += row.total_wage_cost;
            acc[row.FTS_id].penality_cost = Math.max(acc[row.FTS_id].penality_cost, row.penality_cost);
            acc[row.FTS_id].total_reward = Math.min(acc[row.FTS_id].total_reward, row.total_reward);
            acc[row.FTS_id].total_late_time += row.total_late_time;
            acc[row.FTS_id].total_early_time += row.total_early_time;
            acc[row.FTS_id].total_operation_consumption_cost += row.total_operation_consumption_cost;
            acc[row.FTS_id].total_operation_time += row.total_operation_time;
            acc[row.FTS_id].total_preparation_crane_time += row.total_preparation_crane_time;
            // หากคุณต้องการรวมค่าอื่น ๆ ก็เพิ่มเข้าไปตามต้องการ
        }

        return acc;
    }, {});

    const combinedResultsArray: any = Object.values(combinedResults)

    const result = [
        {
            title: 'ต้นทุนรวม',
            price: (
                combinedResultsArray[value].total_consumption_cost
                + combinedResultsArray[value].total_wage_cost
                + combinedResultsArray[value].penality_cost)
                .toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ','
                )

        },
        {
            title: 'ค่าเชื้อเพลิง',
            price: (
                combinedResultsArray[value].total_consumption_cost)
                .toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ','
                )

        },
        {
            title: 'ค่าแรง',
            price: (
                combinedResultsArray[value].total_wage_cost)
                .toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ','
                )

        },
        {
            title: 'ค่าปรับล่าช้า',
            price: (
                + combinedResultsArray[value].penality_cost)
                .toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ','
                )

        },
        {
            title: 'รางวัล',
            price: (
                + combinedResultsArray[value].total_reward)
                .toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ','
                )

        },
    ]

    if (craneSolutionV2.length === 0) {
        console.log('hello word;')
    }
    return (
        <>
            {combinedResultsArray.length || craneSolutionV2.length || result.length === 0 ? (
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
                        combinedResultsArray.length === 0 ? (
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
                                        sx={{ borderRight: 1, borderColor: 'divider' }}
                                    >
                                        {combinedResultsArray.map((row: any, index: number) => {
                                            const ftsResult = (ftsReducer.result).find((item: any) => item.fts_id === row.FTS_id);

                                            return (
                                                <Tab
                                                    className={value === index ? 'bg-[#caf0f8]/25 font-kanit' : 'text-gray-600 font-kanit'}
                                                    label={`${ftsResult?.FTS_name}`}
                                                    {...a11yProps(index)}
                                                />
                                            )
                                        })}
                                    </Tabs>
                                </Card>
                                <Box className='col-span-8'>
                                    <TabPanel value={value} index={value}>
                                        <Box className="grid grid-cols-12 gap-5 mt-[-2rem]">
                                            {/* <Typography
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
                                            </Typography> */}

                                            <Box className='col-span-12 grid grid-cols-6 gap-x-5'>
                                                {/* <Box className='flex flex-row'>
                                                    <Typography
                                                        sx={{
                                                            mr: 2,
                                                            fontSize: 28,
                                                            display: { xs: "none", md: "flex" },
                                                            fontFamily: "monospace",
                                                            fontWeight: 700,
                                                            letterSpacing: ".1rem",
                                                            color: "inherit",
                                                            textDecoration: "none",
                                                        }}
                                                        className='text-cyan-800 flex justify-center items-center'
                                                        variant='h1'
                                                        component='h2'
                                                    >
                                                        {ftsReducer.result[value].FTS_name}
                                                    </Typography>
                                                </Box> */}
                                                {result.map((row, index) => (
                                                    <Box
                                                        key={index}
                                                        className='w-[180px]'
                                                    >
                                                        <SummarizaCard
                                                            title={row.title}
                                                            price={row.price}
                                                            icon={CurrencyBitcoinIcon}
                                                            unit={'บาท'}
                                                            color='bg-[#00a6fb]/50'
                                                        />
                                                    </Box>
                                                ))}
                                            </Box>
                                            <Box className="col-span-12">
                                                <Tables rows={craneSolutionV2} value={value} ftsName={ftsReducer.result[value].fts_id} />
                                            </Box>
                                            {/* <Card className="col-span-12">
                                                <BarCharts ftsSolutionReducer={ftsSolutionReducer.result} value={value} />
                                            </Card> */}
                                        </Box>
                                    </TabPanel>
                                </Box >
                            </Box>
                        )
                    }
                </>
            )}
        </>
        //////////////////////////////////////////
        // <Box
        //     sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 224 }}
        // >
        //     <Box className='grid grid-cols-9'>
        //         <Card className='min-h-[100vh]'>
        // <Tabs
        //     orientation="vertical"
        //     variant="scrollable"
        //     value={value}
        //     onChange={handleChange}
        //     aria-label="Vertical tabs example"
        //     sx={{ borderRight: 1, borderColor: 'divider' }}
        // >
        //     {combinedResultsArray.map((row: any, index: number) => {
        //         const ftsResult = (ftsReducer.result).find((item: any) => item.fts_id === row.FTS_id);

        //         return (
        //             <Tab
        //                 className={value === index ? 'bg-[#caf0f8]/25 font-kanit' : 'text-gray-600 font-kanit'}
        //                 label={`${ftsResult?.FTS_name}`}
        //                 {...a11yProps(index)}
        //             />
        //         )
        //     })}
        // </Tabs>
        //         </Card>
        //         <Box className='col-span-8'>
        //             <TabPanel value={value} index={value}>
        //                 <Box className='mx-[1rem] flex justify-center'>
        //                     <Box className='flex justify-center gap-x-5'>
        // {result.map((row, index) => (
        //     <Box
        //         key={index}
        //         className='w-[180px]'
        //     >
        //         <SummarizaCard
        //             title={row.title}
        //             price={row.price}
        //             icon={CurrencyBitcoinIcon}
        //             unit={'บาท'}
        //             color='bg-[#00a6fb]/50'
        //         />
        //     </Box>
        // ))}
        // </Box>
        //                 </Box>
        // <Box className="col-span-12">
        //     <Tables Name={combinedResultsArray} value={value} />
        // </Box>
        //             </TabPanel>
        //         </Box>
        //     </Box>
        // </Box >
    );
}