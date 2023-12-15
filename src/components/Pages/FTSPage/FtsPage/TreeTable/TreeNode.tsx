import { Box, Grid, IconButton, Tooltip, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import { RiEditLine } from 'react-icons/ri'
import CraneDalete from '../../CraneDeletePage/CraneDeletePage'
import { useSelector } from 'react-redux';
import { roleSelector } from '../../../../../store/slices/auth/rolesSlice';

export default function TreeNode({ crane_name, setuptime_crane, crane_id, wage_month_cost }: any) {
    const rolesReducer = useSelector(roleSelector)

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
            <Grid item xs={1} sx={{ marginY: 1 }}>
                <Typography sx={{ marginLeft: 8 }} className='font-kanit'>{wage_month_cost}</Typography>
            </Grid>
            {rolesReducer.result && rolesReducer.result.role === 'Viewer' ? (
                <></>
            ) : (
                <Grid item xs={2}>
                    <Box className='flex justify-end'>
                        <Tooltip title="แก้ไข">
                            <IconButton component={Link} to={`/transferstation/crane/edit/${crane_id}`}>
                                <RiEditLine className="text-[#135812]" />
                            </IconButton>
                        </Tooltip>
                        <CraneDalete id={crane_id} />
                    </Box>
                </Grid>
            )}
        </Grid>
    )
}

