import { CardContent, Card, Typography } from '@mui/material';
import TreeTable from './TreeTable/TreeTable';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import Loading from '../../layout/Loading/Loading';

export default function SummarizePage() {
    const FTSsolutionSlice = useSelector((state: RootState) => state.FTSsolution);

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
