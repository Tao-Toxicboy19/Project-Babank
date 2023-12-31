import CircularProgress from '@mui/material/CircularProgress';
import { Box } from '@mui/material';

export default function Loading() {
    return (
        <Box className="flex justify-center min-h-[70vh] mt-10">
            <CircularProgress disableShrink />
        </Box>
    )
}