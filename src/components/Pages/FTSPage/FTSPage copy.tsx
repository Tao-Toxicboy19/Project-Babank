import { useEffect } from 'react'
import { Card, CardContent } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { loadFTS } from '../../../store/slices/FTS.slice';
import { RootState } from '../../../store/store';
import Loading from '../../layout/Loading/Loading';
import TreeTable from '../../layout/TreeTable/TreeTable';

type Props = {}

export default function FTSPage({ }: Props) {
  const dispatch = useDispatch<any>();
  const FTSReducer = useSelector((state: RootState) => state.FTS);

  useEffect(() => {
    dispatch(loadFTS())
  }, []);

  return (
    <Card sx={{ minHeight: '90vh' }} className="bg-[#FFF] backdrop-blur-xl">
      <CardContent>
        {FTSReducer.loading ? (
          <Loading />
        ) : (
          <TreeTable FTSReducer={(FTSReducer.FTS)} />
        )}
      </CardContent>
    </Card >
  );
}