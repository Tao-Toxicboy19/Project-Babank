import {
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography
} from "@mui/material"
import { TitleOrder, monthNames } from "../../../../Constants"
import { useSelector } from "react-redux";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";
import { RiEditLine } from "react-icons/ri";
import { useEffect, useState } from "react";
import TableTitles from "../../../layout/TableTitles/TableTitles";
import Loading from "../../../layout/Loading/Loading";
import Titles from "../../../layout/Titles/Titles";
import OrderDeletePage from "../OrderDelete/OrderDeletePage";
import UpdateStatus from "../UpdateStatus/UpdateStatus";
import { orderAsync, orderSelector } from "../../../../store/slices/Order/orderSlice";
import { roleSelector } from "../../../../store/slices/auth/rolesSlice";
import { CSVLink } from "react-csv";
import { exportOrderAsync, exportOrderSelector } from "../../../../store/slices/Order/exportOrdersSlice";
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import LoadingButton from '@mui/lab/LoadingButton';
import { useAppDispatch } from "../../../../store/store";
import { importOrderAsync, importOrderSelector } from "../../../../store/slices/Order/importOrderSlice";
import { FaCloudDownloadAlt } from "react-icons/fa";

type Props = {}

export default function OrderPage({ }: Props) {
  const dispatch = useAppDispatch()
  const orderReducer = useSelector(orderSelector)
  const rolesReducer = useSelector(roleSelector)
  const importOrderReducer = useSelector(importOrderSelector)
  const [selectedMonth, setSelectedMonth] = useState("ทุกเดือน")
  const exportOrderReducer = useSelector(exportOrderSelector)

  const filteredOrders = (orderReducer.result).filter((group) => group.group === rolesReducer.result?.group)
  const exportOrdersCSV = exportOrderReducer.result
    .filter((group) => group.group === rolesReducer.result?.group)
    .map(({ group, ...rest }) => rest);

  const arrivalTimeV2 = filteredOrders.map(item => {
    const date = new Date(item.arrival_time);
    const month = date.getMonth();
    return monthNames[month];
  })

  useEffect(() => {
    dispatch(exportOrderAsync())
  }, []);

  const uniqueMonths = Array.from(new Set(arrivalTimeV2));

  let displayData = selectedMonth === "ทุกเดือน" ? filteredOrders : filteredOrders.filter(item => {
    const date = new Date(item.arrival_time);
    const month = date.getMonth();
    return monthNames[month] === selectedMonth;
  })

  const showTbody = () => {
    return (
      <>
        {(displayData).map((items) => (
          <>
            <TableRow
              key={items.or_id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="left">
                {items.carrier.carrier_name}
              </TableCell>
              <TableCell
                align="center"
                className="font-kanit"
              >
                <UpdateStatus items={items} />

              </TableCell>
              <TableCell align="center">
                {items.cargo_order.cargo.cargo_name}
              </TableCell>
              <TableCell>
                {items.cargo_order.load}
              </TableCell>
              <TableCell
                align="center"
                className="font-kanit"
              >
                <Typography
                  className={`flex justify-center w-[110px] h-fit mx-auto  rounded-lg ${items.category !== 'export' ? 'bg-yellow-100 text-emerald-950' : 'bg-red-100 text-red-950'}`}
                >
                  {items.category}
                </Typography>
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
                {items.cargo_order.bulk}
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
                {(items.penalty_rate).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              </TableCell>
              <TableCell
                align="center"
                className="font-kanit"
              >
                {(items.reward_rate).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              </TableCell>
              <TableCell
                align="center"
                className="font-kanit"
              >
                {items.rel_start_time}
              </TableCell>
              <TableCell
                align="center"
                className="font-kanit"
              >
                {items.rel_finish_time}
              </TableCell>
              <TableCell
                align="center"
                className="font-kanit"
              >
                {items.reason}
              </TableCell>
              {rolesReducer.result && rolesReducer.result.role === 'Viewer' ? (
                <></>
              ) : (
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
              )}
            </TableRow>
          </>
        ))}
      </>
    )
  }

  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });

  const fetch = async () => await dispatch(orderAsync())
  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      if (file.type === 'text/csv' || file.name.endsWith('.csv')) {
        const group: number | undefined = rolesReducer.result?.group
        const formData = new FormData();
        if (group !== undefined) {
          formData.append('group', group.toString());
        }
        formData.append('file', file);

        dispatch(importOrderAsync({ formData, fetch }))
      } else {
        alert('Please select a valid CSV file.');
      }
    }
  };

  const handleFileChangeV2 = (event: any) => {
    const group: number | undefined = rolesReducer.result?.group
    const file = event.target.files[0];
    if (file) {
      if (file.type === 'text/csv' || file.name.endsWith('.csv')) {
        const formData = new FormData();
        if (group !== undefined) {
          formData.append('group', group.toString());
        }
        formData.append('file', file);
        dispatch(importOrderAsync({ formData, fetch, group }))
      } else {
        alert('Please select a valid CSV file.');
      }
    }
  };

  return (
    <>
      <Card className='min-h-[90vh]'>
        <CardContent className='flex flex-col gap-y-7'>
          <>
            <Box>

              <Box
                className='flex flex-row justify-between'
              >
                <Titles title='รายการขนถ่ายสินค้า' />

                <Box className='flex flex-row gap-x-5'>
                  <Box>
                    <>
                      {exportOrderReducer.result ? (
                        <>
                          {
                            exportOrdersCSV.length === 0 ? (
                              <Box>
                                <Button
                                  component="label"
                                  variant="contained"
                                  className="w-[180px] my-auto"
                                  startIcon={<FaCloudDownloadAlt />}
                                  disabled
                                >
                                  Download file
                                </Button>
                              </Box>
                            ) : (
                              <CSVLink data={exportOrdersCSV} filename="orders.csv">
                                <Tooltip title="Download">
                                  <Button
                                    component="label"
                                    variant="contained"
                                    className="w-[180px] my-auto"
                                    startIcon={<FaCloudDownloadAlt />}
                                  >
                                    Download file
                                  </Button>
                                </Tooltip>
                              </CSVLink>
                            )}
                        </>
                      ) : (
                        <Box>
                          <LoadingButton
                            className="w-[180px] my-auto"
                            loading
                            loadingPosition="start"
                            component="label"
                            variant="contained"
                            startIcon={<FaCloudDownloadAlt />}
                          >
                            Download file
                          </LoadingButton>
                        </Box>
                      )}
                    </>
                  </Box>

                  <Tooltip title="upload">
                    <Box>
                      <LoadingButton
                        className="w-full my-auto"
                        loading={importOrderReducer.loading}
                        loadingPosition="start"
                        component="label"
                        variant="contained"
                        startIcon={<CloudUploadIcon />}
                      >
                        Upload file
                        <VisuallyHiddenInput
                          type="file"
                          accept=".csv"
                          onChange={handleFileChange}
                        />
                      </LoadingButton>
                    </Box>
                  </Tooltip>

                  <Tooltip title="upload">
                    <Box>
                      <LoadingButton
                        className="w-full my-auto"
                        loading={importOrderReducer.loading}
                        loadingPosition="start"
                        component="label"
                        variant="contained"
                        startIcon={<CloudUploadIcon />}
                      >
                        Upload file (overlay)
                        <VisuallyHiddenInput
                          type="file"
                          accept=".csv"
                          onChange={handleFileChangeV2}
                        />
                      </LoadingButton>
                    </Box>
                  </Tooltip>
                </Box>
              </Box>
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
              <Box className='w-[600px] flex gap-x-5 justify-end'>
                {rolesReducer.result && rolesReducer.result.role === 'Viewer' ? (
                  <></>
                ) : (
                  <Button
                    component={Link}
                    to={'/orders/create'}
                    variant="contained"
                    className='w-[60%]  bg-blue-600 hover:bg-blue-800'
                    startIcon={<AddIcon />}
                  >
                    Create
                  </Button>
                )}
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
                    {orderReducer.loading ? (
                      <TableCell colSpan={13}>
                        <Box className='flex justify-center'>
                          <Loading />
                        </Box>
                      </TableCell>
                    ) : (
                      <>
                        {
                          filteredOrders.length === 0 ? (
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
                          )
                        }
                      </>
                    )}
                  </TableBody>

                </Table>
              </TableContainer>
            </Box>
          </>
        </CardContent >
      </Card >
    </>
  )
}