import { Box, Button, Fab, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, Typography } from "@mui/material"
import { TitleOrder } from "../../../Constants"
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";

type Props = {}


export default function OrderPage({ }: Props) {
  const OrderReducer = useSelector((state: RootState) => state.order);

  const showTbody = () => {
    return (
      <TableBody>
        {(OrderReducer.orders).map((items) => (
          <TableRow
            key={items.or_id}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <TableCell align="left">{items.carrier.carrier_name}</TableCell>

            <TableCell align="center">
              {items.cargo_order.map((cargo) => (
                <>
                  <Typography className='flex justify-center'>
                    {cargo.cargo.cargo_name}
                  </Typography>
                </>
              ))}
            </TableCell>
            <TableCell>
              {items.cargo_order.map((cargo) => (
                <Typography align="center" key={cargo.order_id}>{cargo.load}</Typography>
              ))}
            </TableCell>
            <TableCell align="center">{items.category}</TableCell>
            <TableCell align="right">{items.arrival_time}</TableCell>
            <TableCell align="right">{items.deadline_time}</TableCell>
            <TableCell align="right">{items.latitude}</TableCell>
            <TableCell align="right">{items.longitude}</TableCell>

            <TableCell>
              {items.cargo_order.map((cargo) => (
                <Typography align="center" key={cargo.order_id}>{cargo.bulk}</Typography>
              ))}
            </TableCell>
            <TableCell align="center">{items.maxFTS}</TableCell>
            <TableCell align="center">{items.penalty_rate}</TableCell>
            <TableCell align="center">{items.reward_rate}</TableCell>
            <TableCell align="right">
              <Box className='flex flex-row justify-end'>
                <Button
                  component={Link}
                  to={`/orders/edit/${items.or_id}`}
                >
                  แก้ไข
                </Button>
                <Button>ลบ</Button>
              </Box>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    )
  }

  const showThead = () => {
    return (
      <TableRow>
        {TitleOrder.map((title) => (
          <TableCell key={title} align={title === 'ชื่อเรือ' ? 'left' : 'center'}>
            {title}
          </TableCell>
        ))}
      </TableRow>
    )
  }

  return (
    <>
      <TableContainer component={Paper} className='min-h-[90vh] mt-5'>
        <Box className="justify-between flex">
          <Box className="flex items-center">
            <Typography className="text-xl" variant="h1">
              รายการขนถ่ายสินค้า
            </Typography>
          </Box>

          <Box className='flex justify-end'>
            <Tooltip title="เพิ่มออเดอร์">
              <Fab
                component={Link}
                to={'/orders/create'}
                color="primary"
                aria-label="add"
                size='small'
                className='bg-blue-500 hover:bg-blue-700'
              >
                <AddIcon />
              </Fab>
            </Tooltip>
          </Box>
        </Box>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead className='bg-blue-200 w-full'>
            {showThead()}
          </TableHead>
          {showTbody()}
        </Table>
      </TableContainer >
    </>
  )
}