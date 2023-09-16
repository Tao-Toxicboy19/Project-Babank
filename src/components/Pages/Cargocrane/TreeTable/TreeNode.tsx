import { useState } from 'react'
import { TreeNodeProps } from '../../../../types/CargoCrane.type'
import { Box, IconButton, Typography } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import CargoList from './CargoList';

export default function TreeNode({ crane_name, category, cargo }: TreeNodeProps) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleNode = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <Box
                className='col-span-5 grid grid-cols-5 border-b-[1px]'
            >
                <Box>
                    <Typography
                        className='flex justify-center items-center my-2'
                    >
                        {crane_name}
                    </Typography>
                </Box>
                <Box>
                    <IconButton onClick={toggleNode}>
                        {isOpen ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />}
                    </IconButton>
                    {category}
                </Box>
                {isOpen && <CargoList cargo={cargo} />}
            </Box>
        </>
    );
}