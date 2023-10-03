import { Grid, Typography } from '@mui/material';
import TreeTableNode from './TreeTableNode';
import { titleTreeTable } from '../../../../Constants';

export interface TreeTableSolution {
    solution_id: number;
    FTS_name: string;
    total_cost_sum: number;
    total_consumption_cost_sum: number;
    total_wage_cost_sum: number;
    penality_cost_sum: number;
    total_reward_sum: number;
    result: Result[];
}
export interface Result {
    crane_name: string;
    total_cost: number;
    total_consumption_cost: number;
    total_wage_cost: number;
    penality_cost: number;
    total_reward: number;
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
                className='border-b-[1px] bg-[#68d8d6]/75 rounded-xl mt-5'
            >
                {titleTreeTable.map((items) => (
                    <Grid key={items} item xs={2} >
                        <Typography
                            className='flex justify-center mb-2 font-bold text-md text-[#333]'
                        >
                            {items}
                        </Typography>
                    </Grid>
                ))}
            </Grid>
            {data.map((node, index) => (
                <TreeTableNode
                    key={index}
                    FTS_name={node.FTS_name}
                    total_cost={node.total_cost_sum} // ส่งค่า lat
                    total_consumption_cost={node.total_consumption_cost_sum} // ส่งค่า lng
                    total_wage_cost={node.total_wage_cost_sum}
                    penality_cost={node.penality_cost_sum}
                    total_reward={node.total_reward_sum}
                    result={node.result}
                />
            ))}
        </>
    );
}