import { Box, Button, Grid, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import { Result } from '../../../../types/FloatingCrane.type'

export default function TreeNode({ crane_name, setuptime_crane, crane_id }: Result) {
    return (
        <Grid
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
            columns={5}
            sx={{ marginY: 2 }}
            className='border-b-[1px]'
        >
            <Grid item xs={1} sx={{ marginY: 1 }}>
                <Typography sx={{ marginLeft: 8 }}>{crane_name}</Typography>
            </Grid>
            <Grid item xs={1} sx={{ marginY: 1 }}>
                <Typography sx={{ marginLeft: 8 }}>{setuptime_crane}</Typography>
            </Grid>
            <Grid item xs={3}>
                <Box className='flex justify-end'>
                    <Button variant="outlined" component={Link} to={`/transferstation/crane/edit/${crane_id}`}>
                        แก้ไข {crane_id}
                    </Button>
                    {/* <FTSDelete /> */}
                </Box>
            </Grid>
        </Grid>
    )
}

