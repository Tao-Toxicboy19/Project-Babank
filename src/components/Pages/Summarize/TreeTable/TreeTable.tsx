import { Grid, Typography } from '@mui/material';
import TreeTableNode from './TreeTableNode';

export interface TreeTableSolution {
    solution_id: number;
    FTS_name: string;
    total_cost: number;
    total_consumption_cost: number;
    total_wage_cost: number;
    penality_cost: number;
    total_reward: number;
    result: {
        crane_name: string;
    }[];
}


type Props = {
    data: TreeTableSolution[];
}

export default function TreeTable({ data }: Props) {
    return (
        <>
            <Grid
                container spacing={1}
                columns={12}
                className='border-b-[1px]'
            >
                <Grid item xs={2} sx={{ marginY: 1 }}>
                    <Typography className='font-bold text-md'>
                        ชื่อเครน
                    </Typography>
                </Grid>
                <Grid item xs={2} sx={{ marginY: 1 }}>
                    <Typography className='font-bold text-md'>
                        total_cost
                    </Typography>
                </Grid>
                <Grid item xs={2} sx={{ marginY: 1 }}>
                    <Typography className='font-bold text-md'>
                        total_consumption_cost
                    </Typography>
                </Grid>
                <Grid item xs={2} sx={{ marginY: 1 }}>
                    <Typography className='font-bold text-md'>
                        total_wage_cost
                    </Typography>
                </Grid>
                <Grid item xs={2} sx={{ marginY: 1 }}>
                    <Typography className='font-bold text-md'>
                        penality_cost
                    </Typography>
                </Grid>
                <Grid item xs={2} sx={{ marginY: 1 }}>
                    <Typography className='font-bold text-md'>
                        total_reward

                    </Typography>
                </Grid>
            </Grid>
            {data.map((node, index) => (
                <TreeTableNode
                    key={index}
                    FTS_name={node.FTS_name}
                    total_cost={node.total_cost} // ส่งค่า lat
                    total_consumption_cost={node.total_consumption_cost} // ส่งค่า lng
                    total_wage_cost={node.total_wage_cost}
                    penality_cost={node.penality_cost}
                    total_reward={node.total_reward}
                    result={node.result}
                />
            ))}
        </>
    );
}