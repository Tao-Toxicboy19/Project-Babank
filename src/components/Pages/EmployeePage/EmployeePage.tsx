import { useEffect, useState } from "react";
import { httpClient } from "../../../utils/httpclient";
import { TableContainer, TableHead, TableCell, Paper, Table, TableRow, TableBody, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, MenuItem, Select, Box, TextField, Alert, Typography, Card, CardContent } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import React from "react";
import { useForm } from "react-hook-form";
import { format } from 'date-fns';
import Loading from "../../layout/Loading/Loading";

type Props = {}

export interface Employee {
    employee_id: number;
    prefix: string;
    frist_name: string;
    last_name: string;
    salary: number;
    employee_FTS: EmployeeFTS | null;
}

export interface EmployeeFTS {
    start_datetime?: any;
    end_datetime?: any;
    remark: string;
    employee_id: number;
    ftsId: number;
    donkey: string;
}


function AlertDialog({ rows, loadData }: { rows: Employee, loadData: () => void }) {
    const [open, setOpen] = React.useState(false);
    const [selectedValue, setSelectedValue] = React.useState('ลา');
    const FTSReducer = useSelector((state: RootState) => state.FTS);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <React.Fragment>
            <Button
                variant="outlined"
                onClick={handleClickOpen}
            >
                ย้ายทุ่น / ลา
            </Button>

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                maxWidth='md'
                fullWidth
            >
                <form onSubmit={handleSubmit(async (data) => {
                    const values = {
                        ...data,
                        employee_id: rows.employee_id,
                        ftsId: rows.employee_FTS?.ftsId,
                        start_datetime: format(new Date(data.start_datetime), 'yyyy-MM-dd HH:mm:ss'),
                        end_datetime: format(new Date(data.end_datetime), 'yyyy-MM-dd HH:mm:ss'),
                    }
                    try {
                        await httpClient.post('employee/fts', values)
                        loadData()
                        setOpen(false)
                    } catch (error: any) {
                        console.log(error)
                    }
                })}>
                    <DialogTitle id="alert-dialog-title">
                        {"เพิ่มข้อมูล"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            <Box className='flex flex-col gap-5'>
                                <Box>
                                    <label htmlFor="deadline_time" className='font-kanit'>ย้ายทุ่น / ลา</label>
                                    <FormControl fullWidth>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            {...register('donkey')}
                                            defaultValue={'ลา'}
                                            onChange={(event: any) => setSelectedValue(event.target.value)}
                                        >
                                            <MenuItem value='ลา' className='font-kanit'>
                                                ลา
                                            </MenuItem>
                                            <MenuItem value='ย้ายทุ่น' className='font-kanit'>
                                                ย้ายทุ่น
                                            </MenuItem>
                                        </Select>
                                    </FormControl>
                                </Box>
                                <Box>
                                    {selectedValue === 'ย้ายทุ่น' && (
                                        <>
                                            <label htmlFor="deadline_time" className='font-kanit'>เลือกทุ่น</label>
                                            <FormControl fullWidth>
                                                <Select
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    {...register('cr_id', { required: true })}
                                                    defaultValue={rows.employee_FTS?.ftsId}
                                                >
                                                    {(FTSReducer.FTS).map((items) => (
                                                        <MenuItem key={items.fts_id} value={items.fts_id} className='font-kanit'>
                                                            {items.FTS_name}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        </>
                                    )}
                                </Box>
                                <Box>
                                    <label htmlFor="deadline_time" className='font-kanit'>วันที่ (เริ่ม)</label>
                                    <TextField
                                        id='arrival_time'
                                        type='datetime-local'
                                        fullWidth
                                        className='font-kanit'
                                        {...register('start_datetime', { required: true })}
                                    />
                                    {errors.start_datetime &&
                                        <Alert variant="outlined" severity="error" className='mt-2'>
                                            กรุณากรอกข้อมูล
                                        </Alert>
                                    }
                                </Box>
                                <Box>
                                    <label htmlFor="deadline_time" className='font-kanit'>วันที่ (ถึง)</label>
                                    <TextField
                                        id='arrival_time'
                                        type='datetime-local'
                                        fullWidth
                                        className='font-kanit'
                                        {...register('end_datetime', { required: true })}
                                    />
                                    {errors.start_datetime &&
                                        <Alert variant="outlined" severity="error" className='mt-2'>
                                            กรุณากรอกข้อมูล
                                        </Alert>
                                    }
                                </Box>
                                <Box>
                                    <label htmlFor="deadline_time" className='font-kanit'>หมายเหตุ</label>
                                    <TextField
                                        id='arrival_time'
                                        type='text'
                                        fullWidth
                                        placeholder='ย้ายทุ่น / ลา'
                                        className='font-kanit'
                                        {...register('remark', { required: true })}
                                    />
                                    {errors.start_datetime &&
                                        <Alert variant="outlined" severity="error" className='mt-2'>
                                            กรุณากรอกข้อมูล
                                        </Alert>
                                    }
                                </Box>
                            </Box>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            onClick={handleClose}
                        >
                            ยกเลิก
                        </Button>
                        <Button
                            autoFocus
                            type="submit"
                        >
                            ยืนยัน
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </React.Fragment>
    );
}


function FromData({ loadData }: { loadData: () => void }) {
    const [open, setOpen] = React.useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    }

    return (
        <React.Fragment>
            <Button
                variant="outlined"
                onClick={handleClickOpen}
            >
                ย้ายทุ่น / ลา
            </Button>

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                maxWidth='md'
                fullWidth
            >
                <form onSubmit={handleSubmit(async (data) => {
                    try {
                        await httpClient.post('employee', data)
                        loadData()
                        setOpen(false)
                    } catch (error) {
                        console.log(error)
                    }
                })}>
                    <DialogTitle id="alert-dialog-title">
                        {"เพิ่มข้อมูล"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            <Box className='flex flex-col gap-5'>
                                <FormControl fullWidth>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        {...register('prefix')}
                                        defaultValue={'นาย'}
                                    >
                                        <MenuItem value='นาย' className='font-kanit'>
                                            นาย
                                        </MenuItem>
                                        <MenuItem value='นาง' className='font-kanit'>
                                            นาง
                                        </MenuItem>
                                        <MenuItem value='นางสาว' className='font-kanit'>
                                            นางสาว
                                        </MenuItem>
                                    </Select>
                                </FormControl>
                                <Box>
                                    <label htmlFor="deadline_time" className='font-kanit'>ชื่อ</label>
                                    <TextField
                                        id='frist_name'
                                        type='text'
                                        fullWidth
                                        className='font-kanit'
                                        {...register('frist_name', { required: true })}
                                    />
                                    {errors.frist_name &&
                                        <Alert variant="outlined" severity="error" className='mt-2'>
                                            กรุณากรอกข้อมูล
                                        </Alert>
                                    }
                                </Box>
                                <Box>
                                    <label htmlFor="deadline_time" className='font-kanit'>นามสกุล</label>
                                    <TextField
                                        id='last_name'
                                        type='text'
                                        fullWidth
                                        className='font-kanit'
                                        {...register('last_name', { required: true })}
                                    />
                                    {errors.last_name &&
                                        <Alert variant="outlined" severity="error" className='mt-2'>
                                            กรุณากรอกข้อมูล
                                        </Alert>
                                    }
                                </Box>
                                <Box>
                                    <label htmlFor="deadline_time" className='font-kanit'>เงินเดือน</label>
                                    <TextField
                                        id='salary'
                                        type='number'
                                        fullWidth
                                        className='font-kanit'
                                        {...register('salary', { required: true, valueAsNumber: true })}
                                    />
                                    {errors.salary &&
                                        <Alert variant="outlined" severity="error" className='mt-2'>
                                            กรุณากรอกข้อมูล
                                        </Alert>
                                    }
                                </Box>
                            </Box>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            onClick={handleClose}
                        >
                            ยกเลิก
                        </Button>
                        <Button
                            autoFocus
                            type="submit"
                        >
                            ยืนยัน
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </React.Fragment>
    )
}

function TableEmployee({ }: Props) {
    const [data, setdata] = useState<Employee[]>([]);
    const FTSReducer = useSelector((state: RootState) => state.FTS);
    const [loading, setLoading] = useState<boolean>(true);
    const fetchResult = async () => {
        try {
            const respons = await httpClient.get('employee')
            setdata(respons.data)
            setLoading(false)
        } catch (error) {
            setLoading(false)
        }
    }

    const filteredData = data.filter(item => item.employee_FTS !== null);

    useEffect(() => {
        fetchResult()
    }, []);


    return (
        <>
            {loading ? (
                <Loading />
            ) : (
                <>
                    <Box className='flex justify-between mb-2'>
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
                            className='text-cyan-800 flex justify-start items-center'
                            variant='h4'
                            component='h2'
                        >
                            รายชื่อพนักงาน
                        </Typography>
                        <Box>
                            <FromData loadData={fetchResult} />
                        </Box>
                    </Box>
                    <div className="flex flex-col gap-5">
                        <TableContainer component={Paper} className="max-h-[40vh] min-h-[40vh]">
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>*</TableCell>
                                        <TableCell align="right">ชื่อ</TableCell>
                                        <TableCell align="right">นามสกุล</TableCell>
                                        <TableCell align="right">เงินเดือน</TableCell>
                                        <TableCell align="right">ทุ่น</TableCell>
                                        <TableCell align="right">เปลี่ยนทุ่น</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {data.map((row) => (
                                        <TableRow
                                            key={row.employee_id}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                <Box className="flex gap-x-5">
                                                    <Typography>
                                                        {row.prefix}
                                                    </Typography>
                                                    <Typography className={`${row.employee_FTS?.donkey === `ลา` ? ('bg-yellow-100') : ('')} ${row.employee_FTS?.donkey === `ย้ายทุ่น` ? ('bg-green-100') : ('')} w-20 flex justify-center rounded-xl`}>
                                                        {row.employee_FTS !== null ? row.employee_FTS?.donkey : ""}
                                                    </Typography>
                                                </Box>
                                            </TableCell>
                                            <TableCell align="right">{row.frist_name}</TableCell>
                                            <TableCell align="right">{row.last_name}</TableCell>
                                            <TableCell align="right">{row.salary}</TableCell>
                                            <TableCell align="right">
                                                {
                                                    row.employee_FTS?.ftsId !== null
                                                        ? row.employee_FTS !== null ? row.employee_FTS.ftsId
                                                            ? FTSReducer.FTS.find(f => f.fts_id === row.employee_FTS?.ftsId)?.FTS_name
                                                            : "ไม่มีทุ่น"
                                                            : "ไม่มีทุ่น"
                                                        : "ไม่มีทุ่น"
                                                }
                                            </TableCell>

                                            <TableCell align="right" className="w-[200px]">
                                                <AlertDialog rows={row} loadData={fetchResult} />
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>

                        <Box>
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
                                className='text-cyan-800 flex justify-start items-center mb-2'
                                variant='h4'
                                component='h2'
                            >
                                รายชื่อพนักงาน ย้ายทุ่น / ลา
                            </Typography>
                            <TableContainer component={Paper} className="max-h-[40vh] min-h-[40vh]">
                                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>#</TableCell>
                                            <TableCell align="right">ชื่อ</TableCell>
                                            <TableCell align="right">นามสกุล</TableCell>
                                            <TableCell align="right">ทุ่น</TableCell>
                                            <TableCell align="right">ย้ายทุ่น / ลา</TableCell>
                                            {/* <TableCell align="right">เงินเดือน</TableCell> */}

                                            <TableCell align="right">วันที่ (เริ่ม)</TableCell>
                                            <TableCell align="right">วันที่ (ถึง)</TableCell>
                                            <TableCell align="right">หมายเหตุ</TableCell>
                                            {/* <TableCell align="center">#</TableCell> */}
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {filteredData.map((row) => (
                                            <TableRow
                                                key={row.employee_id}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell component="th" scope="row">{row.prefix}</TableCell>
                                                <TableCell align="right">{row.frist_name}</TableCell>
                                                <TableCell align="right">{row.last_name}</TableCell>
                                                <TableCell align="right">
                                                    {row.employee_FTS?.ftsId !== null ? FTSReducer.FTS.filter(f => f.fts_id === row.employee_FTS?.ftsId)[0]?.FTS_name : "ไม่มีทุ่น"}
                                                </TableCell>
                                                <TableCell align="right">{row.employee_FTS?.donkey}</TableCell>
                                                <TableCell align="right">{row.employee_FTS?.start_datetime !== null ? row.employee_FTS?.start_datetime : undefined}</TableCell>
                                                <TableCell align="right">{row.employee_FTS?.end_datetime !== null ? row.employee_FTS?.end_datetime : undefined}</TableCell>
                                                <TableCell align="right">{row.employee_FTS?.remark !== null ? row.employee_FTS?.remark : undefined}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Box>
                    </div>
                </>
            )}
        </>
    )
}


export default function EmployeePage() {
    return (
        <Card className="bg-blue-100/50">
            <CardContent>
                <TableEmployee />
            </CardContent>
        </Card>
    )
}