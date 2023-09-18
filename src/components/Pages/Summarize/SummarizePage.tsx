import { useEffect } from 'react';
import { CardContent, Box, Card, CircularProgress, Typography } from '@mui/material';
import TreeTable from './TreeTable/TreeTable';
import { useDispatch, useSelector } from 'react-redux';
import { loadFTSsolution } from '../../../store/slices/FTSsolution.slice';
import { RootState } from '../../../store/store';

export default function SummarizePage() {
    const FTSsolutionSlice = useSelector((state: RootState) => state.FTSsolution);
    const dispatch = useDispatch<any>();
    useEffect(() => {
        dispatch(loadFTSsolution())
    }, []);

    return (
        <Card>
            <CardContent>
                {FTSsolutionSlice.loading ? (
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            height: "100%"
                        }}
                    >
                        <CircularProgress />
                    </Box>
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
