import { useEffect, useState } from 'react'
import axios from 'axios';
import TreeTable from './TreeTable/TreeTable';
import { Box, Card, CardContent, CircularProgress } from '@mui/material';
import { TreeTableNodeProps } from '../../../types/FloatingCrane.type';

type Props = {}

export default function CargoCranePage({ }: Props) {
  const [data, setData] = useState<TreeTableNodeProps[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true)
    axios.get('http://crane.otpzlab.com:7070/api/floating')
      .then((res) => {
        setLoading(false)
        setData(res.data)
      })
      .catch(err => console.log(err))
  }, []);

  return (
    <Card sx={{minHeight:'90vh'}}>
      <CardContent>
        {loading ? (
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
          <TreeTable data={data} />
        )}
      </CardContent>
    </Card >
  );
}