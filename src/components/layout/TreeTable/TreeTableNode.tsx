import React, { useState } from 'react';
import TreeNode from './TreeNode';
import { Box, Grid, IconButton, Tooltip, Typography } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Link } from 'react-router-dom';
import { RiEditLine } from "react-icons/ri";
import { FTSCrane } from '../../../types/FloatingCrane.type';
import FTSDelete from '../../Pages/FTSPage/FTSDelete/FTSDelete';

const TreeTableNode: React.FC<FTSCrane> = ({
    fts_id,
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
                className='border-b-[1px] bg-[#f8f8f8] rounded-lg mt-1'
            >
                <Grid item xs={2}>
                    <Box className='flex justify-start items-center'>
                        {result && result.some(item => item.crane_name) ? (
                            <>
                                <Typography className='font-kanit text-md'>{FTS_name}</Typography>
                                <IconButton onClick={toggleNode}>
                                    {isOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                                </IconButton>
                            </>
                        ) : (
                            <Typography className='flex items-center mt-3 font-kanit text-md'>{FTS_name}</Typography>
                        )}
                    </Box>
                </Grid>
                <Grid item xs={2} className='font-kanit text-md' sx={{ marginY: 1 }}>
                    {lat}
                </Grid>
                <Grid item xs={2} className='font-kanit text-md' sx={{ marginY: 1 }}>
                    {lng}
                </Grid>
                <Grid item xs={2} className='font-kanit text-md' sx={{ marginY: 1 }}>
                    {setuptime_FTS}
                </Grid>
                <Grid item xs={2} className='font-kanit text-md' sx={{ marginY: 1 }}>
                    {speed}
                </Grid>
                <Grid item xs={2} className='font-kanit text-md' sx={{ marginY: 1 }}>
                    <Box className='flex justify-end'>
                        <Tooltip title="แก้ไข">
                            <IconButton component={Link} to={`/transferstation/edit/${fts_id}`}>
                                <RiEditLine className="text-[#135812]" />
                            </IconButton>
                        </Tooltip>
                        <FTSDelete id={fts_id} />
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
                    <Typography className='font-kanit'>ลำดับเครนที่</Typography>
                </Grid>
                <Grid item xs={1} >
                    <Typography className='font-kanit'>เวลาเตรียมความพร้อม (นาที)</Typography>
                </Grid>
            </Grid >
            }
            {
                isOpen &&
                result.map((subNode, index) => (
                    <TreeNode key={index} crane_name={subNode.crane_name} setuptime_crane={subNode.setuptime_crane} crane_id={subNode.crane_id} />
                ))
            }
        </>
    );
};

export default TreeTableNode;
