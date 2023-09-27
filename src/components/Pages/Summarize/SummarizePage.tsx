import { useEffect } from 'react';
import { CardContent, Card, Typography } from '@mui/material';
import TreeTable from './TreeTable/TreeTable';
import { useDispatch, useSelector } from 'react-redux';
import { loadFTSsolution } from '../../../store/slices/FTSsolution.slice';
import { RootState } from '../../../store/store';
import Loading from '../../layout/Loading/Loading';

export default function SummarizePage() {
    const FTSsolutionSlice = useSelector((state: RootState) => state.FTSsolution);
    const dispatch = useDispatch<any>();
    useEffect(() => {
        dispatch(loadFTSsolution())
    }, []);

    return (
        <Card className="mt-5">
            <CardContent>
                {FTSsolutionSlice.loading ? (
                    <Loading />
                ) : (
                    <>
                        <Typography className='text-lg font-bold'>สรุปรายละเอียดต้นทุนของทุ่น</Typography>
                        <TreeTable data={(FTSsolutionSlice.result)} />
                    </>
                )}
            </CardContent>
        </Card >
    );
}
