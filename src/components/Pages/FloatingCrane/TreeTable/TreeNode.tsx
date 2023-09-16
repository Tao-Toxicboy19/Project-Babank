import { Grid } from '@mui/material'

interface TreeNodeProps {
    crane_name: string
    setuptime_crane: number
}

export default function TreeNode({ crane_name, setuptime_crane }: TreeNodeProps) {
    return (
        <Grid
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
            columns={5}
            sx={{ marginY: 2, marginLeft: 8 }}
            className='border-b-[1px]'
        >
            <Grid item xs={1} sx={{ marginY: 1 }}>
                {crane_name}
            </Grid>
            <Grid item xs={1} sx={{ marginY: 1 }}>
                {setuptime_crane}
            </Grid>
        </Grid>
    )
}

