import { Box, Grid, IconButton, Tooltip, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import { RiEditLine } from 'react-icons/ri'
import CraneDalete from '../../Pages/FTSPage/CraneDeletePage/CraneDeletePage'
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';

export default function TreeNode({ crane_name, setuptime_crane, crane_id, wage_month_cost, premium_rate }: any) {
    const rolesReducer = useSelector((state: RootState) => state.rolesReducer);

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
            <Grid item xs={1} sx={{ marginY: 1 }}>
                <Typography sx={{ marginLeft: 8 }} className='font-kanit'>{premium_rate}</Typography>
            </Grid>
            {rolesReducer.result && rolesReducer.result.role === 'Viewer' ? (
                <></>
            ) : (
                <Grid item xs={1}>
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

