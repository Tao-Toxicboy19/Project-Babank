import { useState } from "react";
import { Box, Button, IconButton, Typography } from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

export default function CargoList({ status, setStatus, category, cargo, FTS_id }: any) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNode = () => {
    setIsOpen(!isOpen);
  };


  return (
    <>
      <Box
        className='col-span-5 grid grid-cols-5 bg-green-700'
      >
        <Box>
          <Typography
            className='bg-green-200'
          >
            <IconButton onClick={toggleNode}>
              {isOpen ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />}
            </IconButton>
            {category}
          </Typography>

        </Box >
        <Box className='col-span-4 grid grid-cols-4 bg-red-200'>
          {isOpen && cargo.map((item: any, index: any) => (
            <>
              <Typography key={index} className='border-b-[1px] flex justify-center items-center my-4'>{item.cargo_name}</Typography>
              <Typography className='border-b-[1px] flex justify-center items-center my-4'>{item.work_rate}</Typography>
              <Typography className='border-b-[1px] flex justify-center items-center my-4'>{item.consumption_rate}</Typography>
              <Box>
                <Button>edit</Button>
                <Button>delete</Button>
              </Box>
            </>
          ))}
        </Box>
      </Box>
    </>
  );
}