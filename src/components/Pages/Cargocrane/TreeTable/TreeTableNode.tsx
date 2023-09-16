import { useState } from 'react'
import { FTSCraneCargo } from '../../../../types/CargoCrane.type'
import TreeNode from './TreeNode';
import { Box, IconButton, Typography } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

export default function TreeTableNode({ FTS_name, result, }: FTSCraneCargo) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleNode = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <Box className='grid grid-cols-6 gap-x-2 border-b-[1px]'>
                <Typography>
                    <IconButton onClick={toggleNode}>
                        {isOpen ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />}
                    </IconButton>
                    {FTS_name}
                </Typography>
                <Box className='col-span-5'>
                    {isOpen &&
                        result.map((subNode, index) => (
                            <TreeNode
                                key={index}
                                crane_name={subNode.crane_name}
                                category={subNode.category}
                                cargo={subNode.cargo}
                            />
                        ))}
                </Box>
            </Box>

            {/* <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={1}
                columns={12}
                className='border-b-[1px]'
            >
                <Grid item xs={4}>
                    <Typography>
                        <IconButton onClick={toggleNode}>
                            {isOpen ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />}
                        </IconButton>
                        {FTS_name}
                    </Typography>
                </Grid>
                <Grid item xs={4}>
                    <Typography>
                        {consumption_rate}
                    </Typography>
                </Grid>
                <Grid item xs={4}>
                    <Typography>
                        {work_rate}
                    </Typography>
                </Grid>
            </Grid> */}
            {/* {isOpen &&
                <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    spacing={1}
                    columns={3}
                    className='border-b-[1px]'
                >
                    <Grid item xs={1}>
                        <Typography sx={{ marginLeft: 5, marginY: 1 }}>ลำดับเครนที่</Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <Typography sx={{ marginLeft: 1 }}>สถานะสินค้า (ขาเข้า/ขาออก)</Typography>
                    </Grid>
                </Grid>
            } */}
        </>
    );
}