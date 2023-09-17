// // TreeNode.tsx
import { useState } from 'react'
import CargoList from './CargoList';
import { TreeNodeProps } from '../../../../types/CargoCrane.type';
import { Box, IconButton, Typography } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

export default function TreeNode({ crane_name, category_v1 }: TreeNodeProps) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleNode = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <Box
                className='grid grid-cols-5'
            >
                <Box className='col-span-1 '>
                    <Typography
                        className='flex justify-center items-center border-b-[1px]'
                    >
                        <IconButton onClick={toggleNode}>
                            {isOpen ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />}
                        </IconButton>
                        {crane_name}
                    </Typography>
                </Box>
                <Box className='col-span-4'>
                    {isOpen && category_v1.map((items, index) => (
                        <CargoList
                            key={index}
                            category={items.category}
                            cargo={items.cargo}
                        />
                    ))}
                </Box>
            </Box>

        </>
    );
}