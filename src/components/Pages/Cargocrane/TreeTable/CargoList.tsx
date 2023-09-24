import { useState } from "react";
import { ListCargoProps } from "../../../../types/CargoCrane.type";
import { Box, IconButton, Typography } from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';


export default function CargoList({ category, cargo }: ListCargoProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNode = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Box
        className='col-span-4 grid grid-cols-4'
      >
        <Box>
          <Typography
            className='flex justify-center items-center border-b-[1px]'
          >
            <IconButton onClick={toggleNode}>
              {isOpen ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />}
            </IconButton>
            {category}
          </Typography>

        </Box >
        <Box className='col-span-3 grid grid-cols-3'>
          {isOpen && cargo.map((item, index) => (
            <>
              <Typography key={index} className='border-b-[1px] flex justify-center items-center my-4'>{item.cargo_name}</Typography>
              <Typography className='border-b-[1px] flex justify-center items-center my-4'>{item.work_rate}</Typography>
              <Typography className='border-b-[1px] flex justify-center items-center my-4'>{item.consumption_rate}</Typography>
            </>
          ))}
        </Box >
      </Box>
    </>
  );
}