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
import { solutionOrderAsync } from '../../../../store/slices/Solution/solutionOrderSlice';
import { ftsSolutionAsync } from '../../../../store/slices/FtsSolution/ftsSolutionSlice';
import { craneSolutionTableAsync } from '../../../../store/slices/FtsSolution/craneSolutionTableSlice';
import { useAppDispatch } from '../../../../store/store';
import { craneSolutionAsync, craneSolutionSelector } from '../../../../store/slices/Solution/craneSolutionSlice';
import { craneSolutionV2Async, craneSolutionV2Selector } from '../../../../store/slices/Solution/craneSolutionV2Slice';


export default function SummarizeLayout() {
    const dispatch = useAppDispatch()
    const CraneSolutionReduer = useSelector(craneSolutionSelector)
    const FtsSolutionV2Reducer = useSelector(ftsSulutionSelector)
    const rolesReducer = useSelector(roleSelector)
    const craneSolutionV2Reducer = useSelector(craneSolutionV2Selector)
    console.log(craneSolutionV2Reducer.result)

    const isLoading = CraneSolutionReduer.loading || FtsSolutionV2Reducer.loading;

    useEffect(() => {
        dispatch(craneSolutionAsync())
        dispatch(ftsSulutionAsync())
        dispatch(ftsSolutionAsync())
        dispatch(craneSolutionTableAsync())
        dispatch(solutionOrderAsync())
        dispatch(craneSolutionV2Async())
    }, []);

    const craneSolutionV2 = (craneSolutionV2Reducer.result).filter((group) => group.solution_id === rolesReducer.result?.group)
    const totalConsumptionCost = craneSolutionV2.reduce((total, solution) => total + solution.total_consumption_cost, 0)
    const totalPenality = craneSolutionV2.reduce((total, solution) => total + solution.penality_cost, 0)
    const totalWageCost = craneSolutionV2.reduce((total, solution) => total + solution.total_wage_cost, 0)
    const totalCost = totalConsumptionCost + totalWageCost + totalPenality


    const filteredReward: any = {};
    const filteredPenality: any = {};

    craneSolutionV2.forEach((data) => {
        const { FTS_id, total_reward } = data;

        // ถ้า FTS_id ยังไม่มีใน filteredReward หรือ total_reward มากกว่าที่เคยเก็บไว้
        if (!filteredReward[FTS_id] || total_reward < filteredReward[FTS_id].total_reward) {
            // เก็บข้อมูลลงใน filteredReward โดยใช้ FTS_id เป็น key
            filteredReward[FTS_id] = data;
        }
    });

    craneSolutionV2.forEach((data) => {
        const { FTS_id, penality_cost } = data;

        // ถ้า FTS_id ยังไม่มีใน filteredPenality หรือ penality_cost มากกว่าที่เคยเก็บไว้
        if (!filteredPenality[FTS_id] || penality_cost > filteredPenality[FTS_id].penality_cost) {
            // เก็บข้อมูลลงใน filteredPenality โดยใช้ FTS_id เป็น key
            filteredPenality[FTS_id] = data;
        }
    });

    // แปลง Object ที่ได้เป็น array โดยใช้ Object.values
    const filteredRewards = Object.values(filteredReward);
    const filteredPenalitys = Object.values(filteredPenality);
    const totalReward: any = filteredRewards.reduce((total, solution: any) => total + solution.total_reward, 0)
    const totalPenalityV2: any = filteredPenalitys.reduce((total, solution: any) => total + solution.penality_cost, 0)


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
                                    price={totalCost.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                    icon={CurrencyBitcoinIcon}
                                    unit={'บาท'}
                                    color='bg-[#00a6fb]/50'
                                />
                                <SummarizaCard
                                    title={'ค่าเชื้อเพลิง'}
                                    price={totalConsumptionCost.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                    icon={CurrencyBitcoinIcon}
                                    unit={'บาท'}
                                    color='bg-[#00a6fb]/50'
                                />
                                <SummarizaCard
                                    title={'ค่าแรง'}
                                    price={totalWageCost.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                    icon={CurrencyBitcoinIcon}
                                    unit={'บาท'}
                                    color='bg-[#00a6fb]/50'
                                />
                                <SummarizaCard
                                    title={'ค่าปรับล่าช้า'}
                                    price={totalPenalityV2.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                    icon={CurrencyBitcoinIcon}
                                    unit={'บาท'}
                                    color='bg-[#00a6fb]/50'
                                />
                                <SummarizaCard
                                    title={'รางวัล'}
                                    price={totalReward.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
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
                                    <TreeTable rows={craneSolutionV2} />
                                </Box>
                            </Box>
                        </Box>
                    </>
                ))}
        </>
    );
}
