import { Grid, Typography } from '@mui/material'

interface TreeNodeProps {
    crane_name: string
    total_cost: number
    total_consumption_cost: number
    total_wage_cost: number
    penality_cost: number
    total_reward: number
}

export default function TreeNode({
    crane_name,
    total_cost,
    total_consumption_cost,
    total_wage_cost,
    penality_cost,
    total_reward
}: TreeNodeProps) {
    return (
        <Grid
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
            columns={6}
            sx={{ marginY: 2 }}
            className='border-b-[1px]'
        >
            {[crane_name, total_cost, total_consumption_cost, total_wage_cost, penality_cost, total_reward].map((items) => (
                <Grid key={items} item xs={1} sx={{ marginY: 1 }}>
                    <Typography>{items}</Typography>
                </Grid>
            ))}
        </Grid>
    )
}

