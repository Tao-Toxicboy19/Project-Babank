import { useEffect } from 'react'
import TreeTable from './TreeTable/TreeTable';
import { Box, Card, CardContent, CircularProgress } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { loadFTS } from '../../../store/slices/FTS.slice';
import { RootState } from '../../../store/store';

type Props = {}

export default function FTSPage({ }: Props) {
  const dispatch = useDispatch<any>();
  const FTSReducer = useSelector((state: RootState) => state.FTS);

  useEffect(() => {
    dispatch(loadFTS())
  }, []);

  return (
    <Card sx={{ minHeight: '85vh' }} className="bg-[#FFF] backdrop-blur-xl">
      <CardContent>
        {FTSReducer.loading ? (
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
          <TreeTable FTSReducer={(FTSReducer.FTS)} />
        )}
      </CardContent>
    </Card >
  );
}