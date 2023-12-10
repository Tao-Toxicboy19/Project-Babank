import { Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import CurrencyBitcoinIcon from '@mui/icons-material/CurrencyBitcoin';
import { useEffect } from 'react';
import { Typography } from '@mui/material';
import TreeTable from './TreeTable/TreeTable';
import { loadFTSsolution } from '../../../../store/slices/FTS/FTSsolution.slice';
import { loadFtsSolutionV2 } from '../../../../store/slices/FTS/FTSsolutionV2.slice';
import { loadCraneSolution } from '../../../../store/slices/Solution/craneSolution.slice';
import { loadSolution_order } from '../../../../store/slices/Solution/solutionOrderSlice';
import { RootState } from '../../../../store/store';
import DescriptionMenu from '../../../layout/DescriptionMenu/DescriptionMenu';
import Loading from '../../../layout/Loading/Loading';
import SummarizaCard from '../../../layout/SummarizaCard/SummarizaCard';


export default function SummarizeLayout() {
    const dispatch = useDispatch<any>();
    const CraneSolutionSlice = useSelector((state: RootState) => state.craneSolution);
    const FtsSolutionV2Slice = useSelector((state: RootState) => state.FTSSolutionV2);
    const rolesReducer = useSelector((state: RootState) => state.rolesReducer);


    const Solution_carrier_orderReducer = useSelector((state: RootState) => state.Solution_carrier_orderReducer);
    const isLoading = CraneSolutionSlice.loading || FtsSolutionV2Slice.loading;


    useEffect(() => {
        dispatch(loadCraneSolution())
        dispatch(loadFTSsolution())
        dispatch(loadFtsSolutionV2())
        dispatch(loadSolution_order())
    }, []);

    return (
        <>
            {CraneSolutionSlice.result.solution_id === rolesReducer.result?.group ? (
                <>
                    {isLoading ? (
                        <Loading />
                    ) : ((CraneSolutionSlice.result)?.total_cost === 0 ? (
                        <Box className='min-h-[30vh]'>
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
                        </Box>
                    ) : (
                        <>
                            <Box className='grid grid-cols-12 gap-x-5'>
                                <Box className='col-span-12 grid grid-cols-7 gap-x-5'>
                                    <Box className='col-span-2'>
                                        <Typography
                                            variant='h5'
                                            component='h1'
                                            className='font-kanit flex justify-center items-center text-[#435B71] mt-14 border-b-2 border-neutral-400'
                                            sx={{
                                                fontSize: 22,
                                                fontFamily: "monospace",
                                                fontWeight: 700,
                                                letterSpacing: ".1rem",
                                                color: "inherit",
                                                textDecoration: "none",
                                            }}
                                        >
                                            สรุปรายละเอียดต้นทุนรวม
                                        </Typography>
                                    </Box>
                                    <SummarizaCard
                                        title={'ต้นทุนรวม'}
                                        price={
                                            ((CraneSolutionSlice.result)?.total_consumption_cost
                                                + (Solution_carrier_orderReducer.result.penalty_cost)
                                                + (CraneSolutionSlice.result)?.total_wage_cost)
                                                .toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                        icon={CurrencyBitcoinIcon}
                                        unit={'บาท'}
                                        color='bg-[#00a6fb]/50'
                                    />
                                    <SummarizaCard
                                        title={'ค่าเชื้อเพลิง'}
                                        price={(CraneSolutionSlice.result)?.total_consumption_cost.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                        icon={CurrencyBitcoinIcon}
                                        unit={'บาท'}
                                        color='bg-[#00a6fb]/50'
                                    />
                                    <SummarizaCard
                                        title={'ค่าแรง'}
                                        price={(CraneSolutionSlice.result)?.total_wage_cost.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                        icon={CurrencyBitcoinIcon}
                                        unit={'บาท'}
                                        color='bg-[#00a6fb]/50'
                                    />
                                    <SummarizaCard
                                        title={'ค่าปรับล่าช้า'}
                                        price={(Solution_carrier_orderReducer.result.penalty_cost).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                        icon={CurrencyBitcoinIcon}
                                        unit={'บาท'}
                                        color='bg-[#00a6fb]/50'
                                    />
                                    <SummarizaCard
                                        title={'รางวัล'}
                                        // price={(((CraneSolutionSlice.result)?.total_reward)+Solution_carrier_orderReducer.result.reward).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                        price={(Solution_carrier_orderReducer.result.reward).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                        icon={CurrencyBitcoinIcon}
                                        unit={'บาท'}
                                        color='bg-[#00a6fb]/50'
                                    />
                                </Box>
                                <Box className='col-span-12 grid grid-cols-7 gap-5'>
                                    <Box className='col-span-2  mt-5 grid grid-flow-row gap-y-5'>
                                        <DescriptionMenu />
                                    </Box>
                                    <Box className='col-span-5 mt-5'>
                                        <TreeTable />
                                    </Box>
                                </Box>
                            </Box>
                        </>
                    ))}
                </>
            ) : (
                <>
                    <Box className='min-h-[30vh]'>
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
                    </Box>
                </>
            )}

        </>
    );
}
