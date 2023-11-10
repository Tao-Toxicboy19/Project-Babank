import { Box, Button, Card, CardContent, FormControl, IconButton, InputLabel, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, Typography } from "@mui/material"
import { TitleOrder, monthNames } from "../../../Constants"
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";
import { RiEditLine } from "react-icons/ri";
import { useState } from "react";
import OrderDeletePage from "../../layout/Order/OrderDelete/OrderDeletePage";
import TableTitles from "../../layout/TableTitles/TableTitles";
import Loading from "../../layout/Loading/Loading";
import Titles from "../../layout/Titles/Titles";
import SearchTerms from "../../layout/SearchTerms/SearchTerms";
import UpdateStatus from "../../layout/Order/UpdateStatus/UpdateStatus";
import moment from "moment";

type Props = {}



export default function OrderPage({ }: Props) {
  const OrderReducer = useSelector((state: RootState) => state.order);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedMonth, setSelectedMonth] = useState("ทุกเดือน");





  const filteredData = OrderReducer.orders.filter((order) =>
    order.cargo_order.some((cargoOrder) =>
      cargoOrder.cargo.cargo_name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );



  const arrivalTimeV2 = filteredData.map(item => {
    const date = new Date(item.arrival_time);
    const month = date.getMonth();
    return monthNames[month];
  });

  const uniqueMonths = Array.from(new Set(arrivalTimeV2));

  let displayData = selectedMonth === "ทุกเดือน" ? filteredData : filteredData.filter(item => {
    const date = new Date(item.arrival_time);
    const month = date.getMonth();
    return monthNames[month] === selectedMonth;
  });




  const showTbody = () => {
    return (
      <>
        {(displayData).map((items) => (
          <>
            <TableRow
              key={items.or_id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="left">{items.carrier.carrier_name}</TableCell>
              <TableCell
                align="center"
                className="font-kanit"
              >


                <UpdateStatus items={items} />


              </TableCell>
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
                {moment(items.arrival_time).format('DD/MM/YYYY HH:mm:ss')}
              </TableCell>
              <TableCell
                align="right"
                className="font-kanit"
              >
                {moment(items.deadline_time).format('DD/MM/YYYY HH:mm:ss')}
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
                align="center"
                className="font-kanit"
              >
                {items.rel_start_time ? moment(items.rel_start_time).format('DD/MM/YYYY HH:mm:ss') : ""}
              </TableCell>
              <TableCell
                align="center"
                className="font-kanit"
              >
                {items.rel_finish_time ? moment(items.rel_finish_time).format('DD/MM/YYYY HH:mm:ss') : ""}
              </TableCell>
              <TableCell
                align="center"
                className="font-kanit"
              >
                {items.reason}
              </TableCell>
              <TableCell
                align="right"
                className="font-kanit"
              >
                <Box className='flex flex-row justify-end'>
                  <Tooltip title="แก้ไข">
                    <IconButton component={Link} to={`/orders/edit/${items.or_id}`}>
                      <RiEditLine className="text-[#135812]" />
                    </IconButton>
                  </Tooltip>
                  <OrderDeletePage id={items.or_id} />
                </Box>
              </TableCell>
            </TableRow>
          </>
        ))}
      </>
    )
  }



  return (
    <>
      <Card className='min-h-[90vh]'>
        <CardContent className='flex flex-col gap-y-7'>
          {OrderReducer.loading ? (
            <Loading />
          ) : OrderReducer.error ? (
            <Typography>Error: {OrderReducer.error}</Typography>
          ) : (
            <>
              <Box>
                <Titles title='รายการขนถ่ายสินค้า' />
                <hr />
              </Box>
              <Box className='w-full flex justify-between'>

                <FormControl className="w-[200px]">
                  <InputLabel id="demo-simple-select-label">เลือกเดือน</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(e.target.value)}
                    label="เลือกเดือน"
                  >
                    <MenuItem value="ทุกเดือน">ทุกเดือน</MenuItem>
                    {uniqueMonths.map((month) => (
                      <MenuItem key={month} value={month}>
                        {month}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <Box className='w-[600px] flex gap-x-5'>
                  <SearchTerms searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                  <Button
                    component={Link}
                    to={'/orders/create'}
                    variant="contained"
                    className='w-[60%]  bg-blue-600 hover:bg-blue-800'
                    startIcon={<AddIcon />}
                  >
                    Create
                  </Button>
                </Box>
              </Box>
              <Box>
                <hr />
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableTitles Titles={TitleOrder} />
                    </TableHead>
                    <TableBody>
                      {filteredData.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={13}>
                            <Typography
                              sx={{
                                mr: 2,
                                fontSize: 33,
                                display: { xs: "none", md: "flex" },
                                fontFamily: "monospace",
                                fontWeight: 700,
                                letterSpacing: ".1rem",
                                color: "inherit",
                                textDecoration: "none",
                              }}
                              className='text-cyan-800 flex justify-center items-center h-[59vh]'
                              variant='h4'
                              component='h2'
                            >
                              ไม่มีข้อมูล
                            </Typography>
                          </TableCell>
                        </TableRow>
                      ) : (
                        <>
                          {showTbody()}
                        </>
                      )}
                    </TableBody>

                  </Table>
                </TableContainer>
              </Box>
            </>
          )}
        </CardContent>
      </Card >
    </>
  )
}