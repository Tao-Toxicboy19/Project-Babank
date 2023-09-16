import { Box, Typography } from "@mui/material";
import { CargoListProps } from "../../../../types/CargoCrane.type";


export default function CargoList({ cargo }: CargoListProps) {
  return (
    <>
      <Box
        className='col-span-3 grid grid-cols-3'
      >
        {cargo.map((item, index) => (
          <>
            <Typography key={index} className='border-b-[1px] flex justify-center'>{item.cargo_name}</Typography>
            <Typography className='border-b-[1px] flex justify-center'>{item.work_rate}</Typography>
            <Typography className='border-b-[1px] flex justify-center'>{item.consumption_rate}</Typography>
          </>
        ))}
      </Box>
    </>

  )
}