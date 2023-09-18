import React, { useState } from 'react';
import { Box, Grid, IconButton } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import TreeNode from './TreeNode';

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


const TreeTableNode: React.FC<any> = ({
    FTS_name,
    total_cost,
    total_consumption_cost,
    total_wage_cost,
    penality_cost,
    total_reward,
    result,
}) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleNode = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <Grid
                container
                spacing={1}
                columns={12}
                className='border-b-[1px] bg-blue-100'
            >
                <Grid item xs={2}>
                    <Box className='flex justify-start items-center'>
                        <IconButton onClick={toggleNode}>
                            {isOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                        </IconButton>
                        {FTS_name}
                    </Box>
                </Grid>
                <Grid item xs={2} sx={{ marginY: 1 }}>
                    {total_cost}
                </Grid>
                <Grid item xs={2} sx={{ marginY: 1 }}>
                    {total_consumption_cost}
                </Grid>
                <Grid item xs={2} sx={{ marginY: 1 }}>
                    {total_wage_cost}
                </Grid>
                <Grid item xs={2} sx={{ marginY: 1 }}>
                    {penality_cost}
                </Grid>
                <Grid item xs={2} sx={{ marginY: 1 }}>
                    {total_reward}
                </Grid>
            </Grid>

            {isOpen && <Grid
                container
                spacing={1}
                columns={6}
                sx={{ marginTop: 1 }}
            >
            </Grid >}
            {isOpen &&
                result.map((subNode: any, index: any) => (
                    <TreeNode key={index}
                        crane_name={subNode.crane_name}
                        total_cost={subNode.total_cost}
                        total_consumption_cost={subNode.total_consumption_cost}
                        total_wage_cost={subNode.total_wage_cost}
                        penality_cost={subNode.penality_cost}
                        total_reward={subNode.total_reward}
                    />
                ))
            }
        </>
    );
};

export default TreeTableNode;
