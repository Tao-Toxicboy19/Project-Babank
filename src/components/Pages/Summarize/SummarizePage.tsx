import { useEffect, useState } from 'react';
import { CardContent, Box, Card, CircularProgress, Typography } from '@mui/material';
import axios from 'axios';
import TreeTable from './TreeTable/TreeTable';

export default function SummarizePage() {
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true)
        axios.get('http://crane.otpzlab.com:7070/api/cranesolutiontable')
            .then((res) => {
                setLoading(false)
                setData(res.data)
            })
            .catch(err => console.log(err))
    }, []);

    return (
        <Card>
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
                    <>
                        <Typography className='text-lg font-bold'>สรุปรายละเอียดต้นทุนของทุ่น</Typography>
                        <TreeTable data={data} />
                    </>
                )}
            </CardContent>
        </Card >
    );
}
