import { useState } from "react";
import { Box, Button, IconButton, Typography } from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import { setIsEditing } from "../../../../store/slices/editingSlice";

export default function CargoList({ status, setStatus, category, cargo, FTS_id }: any) {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch<any>();

  const toggleNode = () => {
    setIsOpen(!isOpen);
  };


  return (
    <>
      <Box
        className='col-span-5 grid grid-cols-5 bg-green-700'
      >
        <Box>
          {!status ?
            (
              <input
                type="text"
                value={category}
              />
            ) : (
              <Typography
                className='bg-green-200'
              >
                <IconButton onClick={toggleNode}>
                  {isOpen ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />}
                </IconButton>
                {category}
              </Typography>
            )}

        </Box >
        <Box className='col-span-4 grid grid-cols-4 bg-red-200'>
          {isOpen && cargo.map((item: any, index: any) => (
            <>
              {!status ? (
                <>
                  <input
                    type="text"
                    value={item.cargo_name}
                    onChange={(e) => {
                      // ทำตราบใดที่คุณต้องการอัปเดตค่าของ item.cargo_name
                    }}
                  />
                  <input
                    type="text"
                    value={item.work_rate}
                    onChange={(e) => {
                      // ทำตราบใดที่คุณต้องการอัปเดตค่าของ item.cargo_name
                    }}
                  />
                  <input
                    type="text"
                    value={item.consumption_rate}
                    onChange={(e) => {
                      // ทำตราบใดที่คุณต้องการอัปเดตค่าของ item.cargo_name
                    }}
                  />
                </>) :
                (<>
                  <Typography key={index} className='border-b-[1px] flex justify-center items-center my-4'>{item.cargo_name}</Typography>
                  <Typography className='border-b-[1px] flex justify-center items-center my-4'>{item.work_rate}</Typography>
                  <Typography className='border-b-[1px] flex justify-center items-center my-4'>{item.consumption_rate}</Typography>
                </>
                )}

              <Box className='flex justify-center'>
                {!status ? (
                  <Button> save</Button>
                ) : (
                  <Button onClick={() => setStatus(true)}>edit {setStatus}</Button>
                )}
                <Button>{FTS_id}</Button>
              </Box >
            </>
          ))}
        </Box >
      </Box >
    </>
  );
}