import { useState } from 'react'
import TreeNode from './TreeNode';
import { TreeTableNodeProps } from '../../../../types/CargoCrane.type';
import { Box, IconButton, Typography } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

export default function TreeTableNode({ FTS_name, result }: TreeTableNodeProps) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleNode = () => {
        setIsOpen(!isOpen);
    };

    return (
        <Box className='col-span-12 grid grid-cols-6 gap-x-2 border-b-[1px]'>
            <Typography className='my-1'>
                <IconButton onClick={toggleNode}>
                    {isOpen ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />}
                </IconButton>
                {FTS_name}
            </Typography>
            <Box className='col-span-5'>
                {isOpen && result.map((node, index) => <TreeNode key={index} {...node} />)}
            </Box>
        </Box>
    );
}
