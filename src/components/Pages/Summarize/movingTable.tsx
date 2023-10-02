import SummarizePage from './SummarizePage'
import { Box, Card, CardContent, Stack, Typography } from '@mui/material'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadCraneSolution } from '../../../store/slices/craneSolution.slice'
import { RootState } from '../../../store/store'
import { loadFtsSolutionV2 } from '../../../store/slices/FTSsolutionV2.slice'
import FTSsingle from './FTSsingle/FTSsingle'
import { labels } from '../../../Constants'
import { Charts } from './Chart/Chart'
import Loading from '../../layout/Loading/Loading'
import { loadSolution } from '../../../store/slices/sollution_schedule.slice'
import { loadFTSsolution } from '../../../store/slices/FTSsolution.slice'
import SummarizaCard from '../../layout/SummarizaCard/SummarizaCard'

type Props = {}

export default function MovingTablePage({ }: Props) {
    const dispatch = useDispatch<any>();
    const CraneSolutionSlice = useSelector((state: RootState) => state.craneSolution);
    const FtsSolutionV2Slice = useSelector((state: RootState) => state.FTSSolutionV2);
    const FTSsolutionSlice = useSelector((state: RootState) => state.FTSsolution);

    const isLoading = CraneSolutionSlice.loading || FtsSolutionV2Slice.loading;

    useEffect(() => {
        dispatch(loadCraneSolution())
        dispatch(loadFtsSolutionV2())
        dispatch(loadSolution())
        dispatch(loadFTSsolution())
    }, []);

    return (
        <>
            {isLoading ? (
                <Loading />
            ) : (
                <>
                    <Box className='grid grid-cols-12 gap-y-5'>
                        <Box className='col-span-12 grid grid-cols-4 gap-x-5'>
                            <SummarizaCard title={'ต้นนทุนรวม'} price={(CraneSolutionSlice.result)?.total_cost} />
                            <SummarizaCard title={'ค่าเชื้อเพลิงรวม'} price={(CraneSolutionSlice.result)?.total_consumption_cost} />
                            <SummarizaCard title={'ค่าเเรง'} price={(CraneSolutionSlice.result)?.total_wage_cost} />
                            <SummarizaCard title={'ค่าปรับล่าช้า'} price={(CraneSolutionSlice.result)?.penality_cost} />
                        </Box>
                        <Card className='col-span-6 h-fit mr-2 p-3'>
                            <Charts />
                        </Card>
                        {/* <SummarizePage />
                        <FTSsingle /> */}
                    </Box>
                </>
            )}
        </>
    )
}