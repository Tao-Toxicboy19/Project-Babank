import { Box, Card } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import Loading from '../../layout/Loading/Loading';
import SummarizaCard from '../../layout/SummarizaCard/SummarizaCard';
import CurrencyBitcoinIcon from '@mui/icons-material/CurrencyBitcoin';
import { useEffect } from 'react';
import { loadFTSsolution } from '../../../store/slices/FTSsolution.slice';
import { loadFtsSolutionV2 } from '../../../store/slices/FTSsolutionV2.slice';
import { loadCraneSolution } from '../../../store/slices/craneSolution.slice';
import { loadSolution } from '../../../store/slices/sollution_schedule.slice';
import DescriptionMenu from '../../layout/DescriptionMenu/DescriptionMenu';
import { Typography } from '@mui/material';
import TreeTable from './TreeTable/TreeTable';


export default function SummarizeLayout() {
    const FTSsolutionSlice = useSelector((state: RootState) => state.FTSsolution);
    const dispatch = useDispatch<any>();
    const CraneSolutionSlice = useSelector((state: RootState) => state.craneSolution);
    const FtsSolutionV2Slice = useSelector((state: RootState) => state.FTSSolutionV2);


    const isLoading = CraneSolutionSlice.loading || FtsSolutionV2Slice.loading;

    useEffect(() => {
        dispatch(loadCraneSolution())
        dispatch(loadFtsSolutionV2())
        dispatch(loadSolution())
        dispatch(loadFTSsolution())
    }, []);

    return (
        <>
            {
                isLoading ? (
                    <Loading />
                ) : (
                    <>
                        <Box className='grid grid-cols-12 gap-x-5'>
                            <Box className='col-span-12 grid grid-cols-7 gap-x-5'>
                                <Box className='col-span-2'>
                                    <Typography
                                        variant='h5'
                                        component='h1'
                                        className='flex justify-center items-center text-[#435B71] mt-14 border-b-2 border-neutral-400'
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
                                    title={'ต้นทุน'}
                                    price={(CraneSolutionSlice.result)?.total_cost}
                                    icon={CurrencyBitcoinIcon}
                                    unit={'บาท'}
                                    color='bg-[#00a6fb]/50'
                                />
                                <SummarizaCard
                                    title={'ค่าเชื้อเพลิง'}
                                    price={(CraneSolutionSlice.result)?.total_consumption_cost}
                                    icon={CurrencyBitcoinIcon}
                                    unit={'บาท'}
                                    color='bg-[#00a6fb]/50'
                                />
                                <SummarizaCard
                                    title={'ค่าแรง'}
                                    price={(CraneSolutionSlice.result)?.total_wage_cost}
                                    icon={CurrencyBitcoinIcon}
                                    unit={'บาท'}
                                    color='bg-[#00a6fb]/50'
                                />
                                <SummarizaCard
                                    title={'ค่าปรับล่าช้า'}
                                    price={(CraneSolutionSlice.result)?.penality_cost}
                                    icon={CurrencyBitcoinIcon}
                                    unit={'บาท'}
                                    color='bg-[#00a6fb]/50'
                                />
                                <SummarizaCard
                                    title={'รางวัล'}
                                    price={(CraneSolutionSlice.result)?.total_reward}
                                    icon={CurrencyBitcoinIcon}
                                    unit={'บาท'}
                                    color='bg-[#00a6fb]/50'
                                />
                            </Box>
                            <Box className='col-span-12 grid grid-cols-7 gap-5'>
                                <Box className='col-span-2  mt-5 grid grid-flow-row gap-y-5'>
                                    <DescriptionMenu />
                                </Box>
                                <Card className='col-span-5 px-5'>
                                    <TreeTable data={(FTSsolutionSlice.result)} />
                                </Card>
                            </Box>
                        </Box >
                    </>
                )
            }
        </>
    );
}
