import { Box, Typography } from "@mui/material"

type Props = {
    selectedValue: string
    findSelectedData: any
}

export default function SolutionSingle({ findSelectedData }: Props) {
    return (
        <>
            <Typography className='text-lg font-bold mb-3 mt-5'>สรุปรายละเอียดต้นทุน {findSelectedData().FTS_name}</Typography>
            <Box className='grid grid-cols-2'>
                <Box>
                    <Typography className="mb-2">total_cost:</Typography>
                    <Typography className="mb-2">total_consumption_cost:</Typography>
                    <Typography className="mb-2">total_wage_cost:</Typography>
                    <Typography className="mb-2">penality_cost:</Typography>
                    <Typography className="mb-2">total_reward:</Typography>
                </Box>
                <Box className='flex flex-col'>
                    <Typography className='flex justify-end mb-2'>{findSelectedData().total_cost_sum} บาท</Typography>
                    <Typography className='flex justify-end mb-2'>{findSelectedData().total_consumption_cost_sum} บาท</Typography>
                    <Typography className='flex justify-end mb-2'>{findSelectedData().total_wage_cost_sum} บาท</Typography>
                    <Typography className='flex justify-end mb-2'>{findSelectedData().penality_cost_sum} บาท</Typography>
                    <Typography className='flex justify-end mb-20'>{findSelectedData().total_reward_sum} บาท</Typography>
                </Box>
            </Box>
        </>
    )
}