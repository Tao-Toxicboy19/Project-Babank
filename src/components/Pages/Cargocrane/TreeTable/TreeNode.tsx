// // TreeNode.tsx
import { useState } from 'react'
import CargoList from './CargoList';
import { Box, IconButton, Typography } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

export default function TreeNode({ status, setStatus, crane_name, category_v1, FTS_id }: any) {
    const [isOpen, setIsOpen] = useState(false);


    const toggleNode = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <Box
                className='grid grid-cols-6 bg-amber-300'
            >
                <Box className=''>
                    {!status ? (
                        <input
                            type="text"
                            value={crane_name}
                        />
                    ) : (
                        <Typography>
                            <IconButton onClick={toggleNode}>
                                {isOpen ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />}
                            </IconButton>
                            {crane_name}
                        </Typography>
                    )}
                </Box>
                <Box className='col-span-5'>
                    {isOpen && category_v1.map((items: any, index: any) => (
                        <CargoList
                            key={index}
                            category={items.category}
                            cargo={items.cargo}
                            FTS_id={FTS_id}
                            status={status}
                            setStatus={setStatus}
                        />
                    ))}
                </Box>
            </Box>

        </>
    );
}