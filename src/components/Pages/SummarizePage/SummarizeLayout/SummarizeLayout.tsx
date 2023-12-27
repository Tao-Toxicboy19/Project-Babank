import { Box } from '@mui/material';
import { useSelector } from 'react-redux';
import CurrencyBitcoinIcon from '@mui/icons-material/CurrencyBitcoin';
import { useEffect } from 'react';
import { Typography } from '@mui/material';
import TreeTable from './TreeTable/TreeTable';
import DescriptionMenu from '../../../layout/DescriptionMenu/DescriptionMenu';
import Loading from '../../../layout/Loading/Loading';
import SummarizaCard from '../../../layout/SummarizaCard/SummarizaCard';
import { ftsSulutionAsync, ftsSulutionSelector } from '../../../../store/slices/Solution/ftsSulutionSlice';
import { roleSelector } from '../../../../store/slices/auth/rolesSlice';
import { solutionCarrierOrderSelector } from '../../../../store/slices/Solution/solutionCarrierOrderSlice';
import { solutionOrderAsync } from '../../../../store/slices/Solution/solutionOrderSlice';
import { ftsSolutionAsync } from '../../../../store/slices/FtsSolution/ftsSolutionSlice';
import { craneSolutionTableAsync } from '../../../../store/slices/FtsSolution/craneSolutionTableSlice';
import { useAppDispatch } from '../../../../store/store';
import { craneSolutionAsync, craneSolutionSelector } from '../../../../store/slices/Solution/craneSolutionSlice';


export default function SummarizeLayout() {
    const dispatch = useAppDispatch()
    const CraneSolutionReduer = useSelector(craneSolutionSelector)
    const FtsSolutionV2Reducer = useSelector(ftsSulutionSelector)
    const rolesReducer = useSelector(roleSelector)
    const Solution_carrier_orderReducer = useSelector(solutionCarrierOrderSelector)

    const isLoading = CraneSolutionReduer.loading || FtsSolutionV2Reducer.loading;

    useEffect(() => {
        dispatch(craneSolutionAsync())
        dispatch(ftsSulutionAsync())
        dispatch(ftsSolutionAsync())
        dispatch(craneSolutionTableAsync())
        dispatch(solutionOrderAsync())
    }, []);

    const filtered = (CraneSolutionReduer.result).filter((group) => group.solution_id === rolesReducer.result?.group)
    const filtereds = (Solution_carrier_orderReducer.result).filter((group) => group.s_id === rolesReducer.result?.group)

    const total_consumption_cost = filtered.reduce((total, solutionItem) => total + solutionItem.total_consumption_cost, 0).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    const total_wage_cost = filtered.reduce((total, solutionItem) => total + solutionItem.total_wage_cost, 0).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    const penality_cost = filtered.reduce((total, solutionItem) => total + solutionItem.penality_cost, 0).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    const total_reward = filtered.reduce((total, solutionItem) => total + solutionItem.total_reward, 0).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    const penalty_costSumTotal_wage_cost = (
        filtereds.reduce((total, solutionItem) => total + solutionItem.penalty_cost, 0) +
        filtered.reduce((total, solutionItem) => total + solutionItem.total_wage_cost, 0)
    ).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    return (
        <>
            {isLoading ? (
                <Loading />
            ) : (
                (CraneSolutionReduer.result).length === 0 ? (
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
                                    price={penalty_costSumTotal_wage_cost}
                                    icon={CurrencyBitcoinIcon}
                                    unit={'บาท'}
                                    color='bg-[#00a6fb]/50'
                                />
                                <SummarizaCard
                                    title={'ค่าเชื้อเพลิง'}
                                    price={total_consumption_cost}
                                    icon={CurrencyBitcoinIcon}
                                    unit={'บาท'}
                                    color='bg-[#00a6fb]/50'
                                />
                                <SummarizaCard
                                    title={'ค่าแรง'}
                                    price={total_wage_cost}
                                    icon={CurrencyBitcoinIcon}
                                    unit={'บาท'}
                                    color='bg-[#00a6fb]/50'
                                />
                                <SummarizaCard
                                    title={'ค่าปรับล่าช้า'}
                                    price={penality_cost}
                                    icon={CurrencyBitcoinIcon}
                                    unit={'บาท'}
                                    color='bg-[#00a6fb]/50'
                                />
                                <SummarizaCard
                                    title={'รางวัล'}
                                    price={total_reward}
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
    );
}
