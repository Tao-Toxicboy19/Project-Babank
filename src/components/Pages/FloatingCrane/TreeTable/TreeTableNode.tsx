import React, { useState } from 'react';
import TreeNode from './TreeNode';
import { Box, Button, Grid, IconButton, Typography } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { TreeTableNodeProps } from '../../../../types/FloatingCrane.type';
import { Link } from 'react-router-dom';

const TreeTableNode: React.FC<TreeTableNodeProps> = ({
    FTS_name,
    lat,
    lng,
    setuptime_FTS,
    speed,
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
                className='border-b-[1px]'
            >
                <Grid item xs={2}>
                    <Box className='flex justify-start items-center'>
                        <Typography>{FTS_name}</Typography>
                        {result && result.some(item => item.crane_name) && (
                            <IconButton onClick={toggleNode}>
                                {isOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                            </IconButton>
                        )}
                    </Box>
                </Grid>
                <Grid item xs={2} sx={{ marginY: 1 }}>
                    {lat}
                </Grid>
                <Grid item xs={2} sx={{ marginY: 1 }}>
                    {lng}
                </Grid>
                <Grid item xs={2} sx={{ marginY: 1 }}>
                    {setuptime_FTS}
                </Grid>
                <Grid item xs={2} sx={{ marginY: 1 }}>
                    {speed}
                </Grid>
                <Grid item xs={2} sx={{ marginY: 1 }}>
                    <Box className='flex justify-end'>
                        <Button variant="outlined" component={Link} to="/transferstation/create/crane">เพิ่มเครน</Button>
                    </Box>
                </Grid>
            </Grid >

            {isOpen && <Grid
                container
                spacing={1}
                columns={5}
                sx={{ marginTop: 1 }}
                className='border-b-[1px]'
            >
                <Grid item xs={1} sx={{ marginLeft: 5 }}>
                    <Typography>ลำดับเครนที่</Typography>
                </Grid>
                <Grid item xs={1} >
                    <Typography>เวลาเตรียมความพร้อม (นาที)</Typography>
                </Grid>
            </Grid >
            }
            {
                isOpen &&
                result.map((subNode, index) => (
                    <TreeNode key={index} crane_name={subNode.crane_name} setuptime_crane={subNode.setuptime_crane} />
                ))
            }
        </>
    );
};

export default TreeTableNode;
