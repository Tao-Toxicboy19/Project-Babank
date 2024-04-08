import {
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
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
import { monthNames } from "../../../../Constants"
import { useSelector } from "react-redux";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";
import { RiEditLine } from "react-icons/ri";
import { useEffect, useState } from "react";
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
import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Papa from 'papaparse';
import { useForm } from "react-hook-form";
import { httpClient } from "../../../../utils/httpclient";
import DeleteDialog from "../../../layout/DeleteDialog/DeleteDialog";
import dayjs from "dayjs";
dayjs.locale('th')

type Props = {}

function AlertDialog({ exportOrderReducer, exportOrdersCSV, importOrderReducer, dispatch, rolesReducer }: any) {
  const [open, setOpen] = React.useState(false);
  const [csvData, setCsvData] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [forms, setForms] = useState<any>(null);
  const [chacks, setchacks] = useState("")

  const {
    handleSubmit,
    formState: { },
  } = useForm();
  const fetch = async () => await dispatch(orderAsync())
  console.log(exportOrdersCSV)
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // useEffect(() => {
  //   // ตรวจสอบว่า csvData มีข้อมูลหรือไม่
  //   if (csvData.length > 0) {
  //     handleClickOpen();
  //   }
  // }, [csvData]);

  const handleFileChange = (event: any) => {
    setIsSubmitting(false)
    setchacks("NoOverwirte")
    const file = event.target.files[0];
    if (file) {
      if (file.type === 'text/csv' || file.name.endsWith('.csv')) {
        const group: number | undefined = rolesReducer.result?.group;
        const formData = new FormData();
        if (group !== undefined) {
          formData.append('group', group.toString());
        }
        formData.append('file', file);

        // ใช้ Papaparse เพื่ออ่านข้อมูล CSV
        Papa.parse(file, {
          complete: (result: any) => {
            // result.data เป็นข้อมูล CSV ที่ได้จากการอ่าน
            setCsvData(result.data);

            // ต่อไปคุณสามารถจัดการข้อมูลต่อไปได้ตามต้องการ
          },
          header: true, // ถ้า CSV มี header
          skipEmptyLines: true,
        });
        handleClickOpen();
        setForms(formData);
      } else {
        alert('Please select a valid CSV file.');
      }
    }
  };


  const handleFileChangeV2 = (event: any) => {
    setIsSubmitting(false)
    setchacks("Overwirte")
    const group: number | undefined = rolesReducer.result?.group
    const file = event.target.files[0]
    if (file) {
      if (file.type === 'text/csv' || file.name.endsWith('.csv')) {
        const formData = new FormData()
        if (group !== undefined) {
          formData.append('group', group.toString())
        }
        formData.append('file', file)

        // ใช้ Papaparse เพื่ออ่านข้อมูล CSV
        Papa.parse(file, {
          complete: (result: any) => {
            // result.data เป็นข้อมูล CSV ที่ได้จากการอ่าน
            setCsvData(result.data)

            // ต่อไปคุณสามารถจัดการข้อมูลต่อไปได้ตามต้องการ
            // handleClickOpen()
          },
          header: true, // ถ้า CSV มี header
          skipEmptyLines: true,
        });
        handleClickOpen();
        setForms(formData)
      } else {
        alert('Please select a valid CSV file.')
      }
    }
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

  return (
    <React.Fragment>
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
              Upload file (Overwirte)
              <VisuallyHiddenInput
                type="file"
                accept=".csv"
                onChange={handleFileChangeV2}
              />
            </LoadingButton>
          </Box>
        </Tooltip>
      </Box>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth='xl'
      >
        <form onSubmit={handleSubmit(() => {
          const group: number | undefined = rolesReducer.result?.group
          dispatch(importOrderAsync({ forms, fetch, group, handleClose, setIsSubmitting, chacks }))
        })}>
          <DialogTitle id="alert-dialog-title">
            {/* {"Use Google's location service?"} */}
          </DialogTitle>
          <DialogContent>
            <div>
              {/* แสดงข้อมูลที่ได้จาก CSV */}
              {csvData.length > 0 && (
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        {Object.keys(csvData[0]).map((header, index) => (
                          <TableCell align={index === 0 ? "left" : "right"} key={header}>
                            {header}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {csvData.map((row, index) => (
                        <TableRow
                          key={index}
                          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                          {Object.values(row).map((value: any, index) => (
                            <TableCell
                              component="th"
                              scope="row"
                              key={index}
                              align={index === 0 ? "left" : "right"}
                            >
                              {value}
                            </TableCell>
                          ))}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </div>
          </DialogContent>
          <DialogActions>
            <Button
              variant="outlined"
              type="button"
              onClick={handleClose}
              className='font-kanit text-md'
            >
              ยกเลิก
            </Button>
            <Button
              type="submit"
              variant="contained"
              className='bg-blue-600 hover:bg-blue-700 font-kanit text-md'
              disabled={isSubmitting}
            >
              บันทึก
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </React.Fragment>
  );
}

export default function OrderPage({ }: Props) {
  const dispatch = useAppDispatch()
  const orderReducer = useSelector(orderSelector)
  const rolesReducer = useSelector(roleSelector)
  const importOrderReducer = useSelector(importOrderSelector)
  const [selectedMonth, setSelectedMonth] = useState("ทุกเดือน")
  const exportOrderReducer = useSelector(exportOrderSelector)
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [open, setOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const id = rolesReducer.result?.group
  if (!id) return

  const filteredOrders = (orderReducer.result).filter((group) => group.group === id)
  // const exportOrdersCSV = exportOrderReducer.result
  //   .filter((group) => group.group === rolesReducer.result?.group)
  //   .map(({ group, ...rest }) => rest);

  const arrivalTimeV2 = filteredOrders.map(item => {
    const date = new Date(item.arrival_time);
    const month = date.getMonth();
    return monthNames[month];
  })

  useEffect(() => {
    dispatch(exportOrderAsync(id))
  }, []);

  const uniqueMonths = Array.from(new Set(arrivalTimeV2));

  let displayData = selectedMonth === "ทุกเดือน" ? filteredOrders : filteredOrders.filter(item => {
    const date = new Date(item.arrival_time);
    const month = date.getMonth();
    return monthNames[month] === selectedMonth;
  })

  const handleCheckboxChange = (id: number) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter((row) => row !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };

  const handleSelectAll = () => {
    if (selectedRows.length === filteredOrders.length) {
      // If all rows are selected, unselect all
      setSelectedRows([]);
    } else {
      // If not all rows are selected, select all
      const allCalories = filteredOrders.map((row) => row.or_id);
      setSelectedRows(allCalories);
    }
  }

  const handleClickOpen = () => setOpen(true)

  const handleClose = () => setOpen(false)

  const fetch = () => dispatch(orderAsync())

  const handleDeleteConfirm = async () => {
    setIsSubmitting(true);
    try {
      // const updatedRows = filteredOrders.filter((row) => !selectedRows.includes(row.or_id));
      filteredOrders.filter((row) => !selectedRows.includes(row.or_id));
      // console.log("Selected Rows to Delete:", selectedRows);
      await httpClient.delete(`/delete/orders`, { data: selectedRows })
      await fetch()
      handleClose()
      setSelectedRows([]);
      setIsSubmitting(false);
    } catch (error) {
      setIsSubmitting(false)
    }
  }

  const showTbody = () => {
    return (
      <>
        {(displayData).map((items, index) => (
          <>
            <TableRow
              key={items.or_id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="left">
                {index + 1}
              </TableCell>
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
                {items.cargo_order.load.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
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
                {/* {items.arrival_time} */}
                {dayjs(items.arrival_time, 'M/D/YYYY, h:mm:ss A').format('D/MM/YYYY, h:mm:ss A')}
              </TableCell>
              <TableCell
                align="right"
                className="font-kanit"
              >
                {dayjs(items.deadline_time, 'M/D/YYYY, h:mm:ss A').format('D/MM/YYYY, h:mm:ss A')}
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
              <TableCell>
                <Checkbox
                  checked={selectedRows.includes(items.or_id)}
                  onChange={() => handleCheckboxChange(items.or_id)}
                />
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
          <>
            <Box>

              <Box
                className='flex flex-row justify-between'
              >
                <Titles title='รายการขนถ่ายสินค้า' />
                <Box>
                  <AlertDialog
                    exportOrderReducer={exportOrderReducer}
                    exportOrdersCSV={exportOrderReducer.result}
                    importOrderReducer={importOrderReducer}
                    dispatch={dispatch}
                    rolesReducer={rolesReducer}
                  />
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
                    size="small"
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
                    <TableRow>
                      {/* <TableCell>
                        <Checkbox
                          checked={selectedRows.length === rows.length}
                          onChange={handleSelectAll}
                        />
                      </TableCell> */}
                      {
                        ['id', 'ชื่อเรือ', 'สถานะ', 'ประเภทสินค้า', 'ปริมาณสินค้า (ตัน)', 'สถานะสินค้า', 'วัน-เวลา มาถึง', 'วัน-เวลา สิ้นสุด', 'ละติจูด', 'ลองจิจูด', 'จำนวนระวาง', 'จำนวนทุ่นเข้าสูงสุด', 'ค่าปรับ (บาท/ชม)', 'รางวัล (บาท/ชม)', 'เวลาเริ่มจริง', 'เวลาเสร็จจริง', 'หมายเหตุ', 'แก้ไข้']
                          .map((value, index) => (
                            <TableCell
                              className="font-kanit text-blue-900"
                              sx={{
                                backgroundColor: 'background.paper',
                                fontWeight: 'Bold',
                                fontSize: 16,
                              }}
                              key={index}
                              align={index === 0 ? `left` : 'right'}
                            >
                              {value}
                            </TableCell>
                          ))
                      }
                      <TableCell>
                        <Tooltip title="ลบทั้งหมด">
                          <DeleteDialog
                            open={open}
                            handleClickOpen={handleClickOpen}
                            handleClose={handleClose}
                            handleDeleteConfirm={handleDeleteConfirm}
                            isSubmitting={isSubmitting}
                            maxWidth={'sm'}
                            titles={'ต้องการลบสินค้าหรือไม่?'}
                            description={'คุณไม่สามารถกู้คืนข้อมูลที่ถูกลบได้ !'}
                          />
                          {/* <IconButton
                            onClick={handleDeleteSelected}
                          >
                            <DeleteForever className='text-red-800' />
                          </IconButton> */}
                        </Tooltip>
                        <Tooltip title="เลือกทั้งหมด">
                          <Checkbox
                            checked={selectedRows.length === filteredOrders.length}
                            onChange={handleSelectAll}
                          />
                        </Tooltip>
                      </TableCell>
                    </TableRow>

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