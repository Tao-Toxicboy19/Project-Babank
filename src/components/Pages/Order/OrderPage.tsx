import { Box, Fab, IconButton, InputAdornment, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Tooltip, Typography } from "@mui/material"
import { TitleOrder } from "../../../Constants"
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";
import OrderDeletePage from "./OrderDelete/OrderDeletePage";
import { LuFileEdit } from "react-icons/lu";
import React from "react";
import Search from "@mui/icons-material/Search";

type Props = {}


export default function OrderPage({ }: Props) {
  const OrderReducer = useSelector((state: RootState) => state.order);
  const [searchTerm, setSearchTerm] = React.useState<string>("");

  const filteredData = OrderReducer.orders.filter((order) =>
    order.cargo_order.some((cargoOrder) =>
      cargoOrder.cargo.cargo_name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const showTbody = () => {
    return (
      <TableBody>
        {(filteredData).map((items) => (
          <TableRow
            key={items.or_id}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <TableCell align="left">{items.carrier.carrier_name}</TableCell>

            <TableCell align="center">
              {items.cargo_order.map((cargo) => (
                <>
                  <Typography className='flex justify-center font-kanit'>
                    {cargo.cargo.cargo_name}
                  </Typography>
                </>
              ))}
            </TableCell>
            <TableCell>
              {items.cargo_order.map((cargo) => (
                <Typography
                  key={cargo.order_id}
                  align="center"
                >
                  {cargo.load}
                </Typography>
              ))}
            </TableCell>
            <TableCell
              align="center"
              className="font-kanit"
            >
              {items.category}
            </TableCell>
            <TableCell
              align="right"
              className="font-kanit"
            >
              {items.arrival_time}
            </TableCell>
            <TableCell
              align="right"
              className="font-kanit"
            >
              {items.deadline_time}
            </TableCell>
            <TableCell
              align="right"
              className="font-kanit"
            >
              {items.latitude}
            </TableCell>
            <TableCell
              align="right"
              className="font-kanit"
            >
              {items.longitude}
            </TableCell>

            <TableCell>
              {items.cargo_order.map((cargo) => (
                <Typography
                  className="font-kanit"
                  align="center"
                  key={cargo.order_id}
                >
                  {cargo.bulk}
                </Typography>
              ))}
            </TableCell>
            <TableCell
              align="center"
              className="font-kanit"
            >
              {items.maxFTS}
            </TableCell>
            <TableCell
              align="center"
              className="font-kanit"
            >
              {items.penalty_rate}
            </TableCell>
            <TableCell
              align="center"
              className="font-kanit"
            >
              {items.reward_rate}
            </TableCell>
            <TableCell
              align="right"
              className="font-kanit"
            >
              <Box className='flex flex-row justify-end'>
                <Tooltip title="แก้ไข">
                  <IconButton component={Link} to={`/orders/edit/${items.or_id}`}>
                    <LuFileEdit className="text-[#169413]" />
                  </IconButton>
                </Tooltip>
                <OrderDeletePage id={items.or_id} />
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
          <TableCell
            key={title}
            align={title === 'ชื่อเรือ' ? 'left' : 'center'}
            className="font-kanit"
            sx={{
              backgroundColor: 'background.paper',
              fontWeight: 'Bold',
              fontSize: 16
            }}
          >
            {title}
          </TableCell>
        ))}
      </TableRow>
    )
  }

  return (
    <TableContainer component={Paper} className='min-h-[90vh] mt-5'>
      <Box className="justify-between flex mx-5">
        <Stack direction='row' spacing={5} sx={{ display: 'flex', alignItems: 'center', marginTop: 2 }}>
          <Typography
            className="font-kanit"
            component='h1'
            sx={{
              fontSize: 22,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".1rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            รายการขนถ่ายสินค้า
          </Typography>
          <Tooltip title="ค้นหา">
            <TextField
              id="standard-basic"
              variant="standard"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    Search
                  </InputAdornment>
                ),
              }}
            />
          </Tooltip>
        </Stack>

        <Box className='flex justify-end'>
          <Tooltip title="เพิ่มทุ่น">
            <Fab
              component={Link}
              to="/orders/create"
              color="primary"
              aria-label="add"
              size='small'
              className='bg-blue-500 hover:bg-blue-700 my-4'
            >
              <AddIcon />
            </Fab>
          </Tooltip>
        </Box>
      </Box >
      <hr />
      <Table
        aria-label="simple table"
        sx={{
          borderCollapse: "collapse",
          "& td, & th": {
            padding: "8px",
            borderBottom: "1px solid #ddd",
          },
        }}
      >
        <TableHead className='bg-blue-200 w-full'>
          {showThead()}
        </TableHead>
        {showTbody()}
      </Table>
    </TableContainer >
  )
}