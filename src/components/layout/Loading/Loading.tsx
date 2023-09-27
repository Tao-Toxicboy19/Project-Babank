import CircularProgress from '@mui/material/CircularProgress';
import { Box, Card } from '@mui/material';

export default function Loading() {
    return (
        <>
            <Card className='h-[100vh] flex justify-center items-center'>
                <Box className="xm-auto flex max-w-xl max-h-xl">
                    <CircularProgress disableShrink />
                </Box>
            </Card>
        </>
    )
}