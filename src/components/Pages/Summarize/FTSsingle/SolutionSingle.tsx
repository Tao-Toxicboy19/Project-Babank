import { Box, Card, CardContent, Typography } from "@mui/material"

type Props = {
    selectedValue: string
    findSelectedData: any
}

export interface Solution {
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

export default function SolutionSingle({ selectedValue, findSelectedData }: Props) {
    return (
        <>
            
                    {selectedValue &&
                        <>
                            <Typography className='text-lg font-bold mb-3'>สรุปรายละเอียดต้นทุน {findSelectedData().FTS_name}</Typography>
                            <Box className='grid grid-cols-2'>
                                <Box>
                                    <Typography>total_cost:</Typography>
                                    <Typography>total_consumption_cost:</Typography>
                                    <Typography>total_wage_cost:</Typography>
                                    <Typography>penality_cost:</Typography>
                                    <Typography>total_reward:</Typography>
                                </Box>
                                <Box className='flex flex-col'>
                                    <Typography className='flex justify-end'>{findSelectedData().total_cost_sum} บาท</Typography>
                                    <Typography className='flex justify-end'>{findSelectedData().total_consumption_cost_sum} บาท</Typography>
                                    <Typography className='flex justify-end'>{findSelectedData().total_wage_cost_sum} บาท</Typography>
                                    <Typography className='flex justify-end'>{findSelectedData().penality_cost_sum} บาท</Typography>
                                    <Typography className='flex justify-end'>{findSelectedData().total_reward_sum} บาท</Typography>
                                </Box>
                            </Box>
                        </>
                    }
                
        </>
    )
}