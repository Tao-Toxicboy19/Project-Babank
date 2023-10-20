import { Box, Grid, IconButton, Tooltip, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import { LuFileEdit } from 'react-icons/lu'
import { Result } from '../../../types/FloatingCrane.type'
import CraneDalete from '../../pages/FTSPage/CraneDeletePage/CraneDeletePage'

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
                <Typography sx={{ marginLeft: 8 }} className='font-kanit'>{crane_name}</Typography>
            </Grid>
            <Grid item xs={1} sx={{ marginY: 1 }}>
                <Typography sx={{ marginLeft: 8 }} className='font-kanit'>{setuptime_crane}</Typography>
            </Grid>
            <Grid item xs={3}>
                <Box className='flex justify-end'>
                    <Tooltip title="แก้ไข">
                        <IconButton component={Link} to={`/transferstation/crane/edit/${crane_id}`}>
                            <LuFileEdit className="text-[#169413]" />
                        </IconButton>
                    </Tooltip>
                    <CraneDalete id={crane_id} />
                </Box>
            </Grid>
        </Grid>
    )
}

