import { useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import { TableContainer, TableHead, TableCell, Paper, Table, TableRow, TableBody, MenuItem, FormControl, Box, Select, Card, CardContent } from "@mui/material";
import { useState, useEffect } from "react";
import { report_solution_crane } from "../../../../types/Solution_schedule.type";
import Loading from "../../Loading/Loading";
import TableTitles from "../../TableTitles/TableTitles";
import { TitleReportCrane } from "../../../../Constants";

type Props = {}

export default function ReportCrane({ }: Props) {
    const reportCraneReducer = useSelector((state: RootState) => state.reportCraneReducer);
    const FtsReducer = useSelector((state: RootState) => state.FTS.FTS)
    const craneReducer = useSelector((state: RootState) => state.Crane.result)
    const [filteredData, setFilteredData] = useState<report_solution_crane[]>(reportCraneReducer.result);
    const [selectedFtsId, setSelectedFtsId] = useState("ทั้งหมด");
    const [selectedCrane, setSelectedCrane] = useState("ทั้งหมด");
    const [selectedMonth, setSelectedMonth] = useState("ทุกเดือน");

    useEffect(() => {
        const filteredData = reportCraneReducer.result.filter((item: any) => {
            return item.FTS_id === selectedFtsId && (selectedCrane === "ทั้งหมด" || item.crane_id === selectedCrane);
        });
        setFilteredData(filteredData);
    }, [selectedFtsId, selectedCrane, reportCraneReducer.result]);


    return (

        <>
            <Card className="bg-[#fff]/75 min-h-[72.3vh]">
                <CardContent>
                    {reportCraneReducer.loading ? (
                        <Loading />
                    ) : (
                        <>
                            <form className="max-w-xl flex gap-x-3 mb-3">
                                <Box className='w-full'>
                                    <label className="pr-5 font-kanit text-lg" htmlFor="FTS_name">เลือกเดือน</label>
                                    <FormControl fullWidth className="bg-[#fff]">
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            className="font-kanit"
                                            value={selectedMonth}
                                            onChange={(e) => setSelectedMonth(e.target.value)}
                                        >
                                            <MenuItem className="font-kanit" value="ทุกเดือน">ทุกเดือน</MenuItem>
                                            <MenuItem className="font-kanit" value="0">มกราคม</MenuItem>
                                            <MenuItem className="font-kanit" value="1">กุมภาพันธ์</MenuItem>
                                            <MenuItem className="font-kanit" value="3">มีนาคม</MenuItem>
                                            <MenuItem className="font-kanit" value="4">เมษายน</MenuItem>
                                            <MenuItem className="font-kanit" value="5">พฤษภาคม</MenuItem>
                                            <MenuItem className="font-kanit" value="6">มิถุนายน</MenuItem>
                                            <MenuItem className="font-kanit" value="7">กรกฎาคม</MenuItem>
                                            <MenuItem className="font-kanit" value="8">สิงหาคม</MenuItem>
                                            <MenuItem className="font-kanit" value="9">กันยายน</MenuItem>
                                            <MenuItem className="font-kanit" value="10">ตุลาคม</MenuItem>
                                            <MenuItem className="font-kanit" value="11">พฤศจิกายน</MenuItem>
                                            <MenuItem className="font-kanit" value="12">ธันวาคม</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Box>
                                <Box className='w-full'>
                                    <label className="pr-5 font-kanit text-lg" htmlFor="FTS_name">เลือกทุ่น</label>
                                    <FormControl fullWidth className="bg-[#fff] font-kanit">
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            className="font-kanit"
                                            value={selectedFtsId}
                                            onChange={(e) => setSelectedFtsId(e.target.value)}
                                        >
                                            <MenuItem className="font-kanit" value="ทั้งหมด">ทั้งหมด</MenuItem>
                                            {FtsReducer.map((items) => (
                                                <MenuItem className="font-kanit" key={items.fts_id} value={items.fts_id}>{items.FTS_name}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Box>
                                <Box className='w-full'>
                                    <label className="pr-5 font-kanit text-lg" htmlFor="FTS_name">เลือกเครน</label>
                                    <FormControl fullWidth className="bg-[#fff] font-kanit">
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            className="font-kanit"
                                            value={selectedCrane}
                                            onChange={(e) => setSelectedCrane(e.target.value)}
                                        >
                                            <MenuItem className="font-kanit" value="ทั้งหมด">ทั้งหมด</MenuItem>
                                            {craneReducer.map((items) => (
                                                <MenuItem className="font-kanit" key={items.id} value={items.id}>{items.crane_name}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Box>
                            </form>
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                    <TableHead>
                                        <TableTitles Titles={TitleReportCrane} />
                                    </TableHead>
                                    <TableBody>
                                        <>
                                            {selectedFtsId === "ทั้งหมด" ? (
                                                reportCraneReducer.result.map((item, index) => {
                                                    const itemMonth = new Date(item.due_time).getMonth();
                                                    if ((selectedMonth === "ทุกเดือน" || itemMonth === parseInt(selectedMonth, 10)) &&
                                                        (selectedCrane === "ทั้งหมด" || item.crane_id === selectedCrane)) {
                                                        return (
                                                            <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                                                <TableCell className="font-kanit text-md">{item.FTS_name}</TableCell>
                                                                <TableCell align="right" className="font-kanit text-md">{item.carrier_name}</TableCell>
                                                                <TableCell align="right" className="font-kanit text-md">{item.bulk}</TableCell>
                                                                <TableCell align="right" className="font-kanit text-md">{item.start_time}</TableCell>
                                                                <TableCell align="right" className="font-kanit text-md">{item.due_time}</TableCell>
                                                                <TableCell align="right" className="font-kanit text-md">{item.load_cargo}</TableCell>
                                                                <TableCell align="right" className="font-kanit text-md">{item.cargo_name}</TableCell>
                                                            </TableRow>
                                                        );
                                                    }
                                                    return null;
                                                })
                                            ) : (
                                                filteredData.map((item, index) => {
                                                    const itemMonth = new Date(item.due_time).getMonth();
                                                    if ((selectedMonth === "ทุกเดือน" || itemMonth === parseInt(selectedMonth, 10)) &&
                                                        (selectedCrane === "ทั้งหมด" || item.crane_id === selectedCrane)) {
                                                        return (
                                                            <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                                                <TableCell className="font-kanit text-md">{item.FTS_name}</TableCell>
                                                                <TableCell align="right" className="font-kanit text-md">{item.carrier_name}</TableCell>
                                                                <TableCell align="right" className="font-kanit text-md">{item.start_time}</TableCell>
                                                                <TableCell align="right" className="font-kanit text-md">{item.due_time}</TableCell>
                                                                <TableCell align="right" className="font-kanit text-md">{item.load_cargo}</TableCell>
                                                                <TableCell align="right" className="font-kanit text-md">{item.cargo_name}</TableCell>
                                                            </TableRow>
                                                        );
                                                    }
                                                    return null;
                                                })
                                            )}
                                        </>
                                        {/* {filteredData.length === 0 ? (
                                            <TableRow>
                                                <TableCell colSpan={7} className="font-kanit text-md">
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
                                                        className='text-cyan-800 flex justify-center items-center h-[50vh]'
                                                        variant='h4'
                                                        component='h2'
                                                    >
                                                        ไม่มีข้อมูล
                                                    </Typography>
                                                </TableCell>
                                            </TableRow>
                                        ) : (
                                            <>
                                                {selectedFtsId === "ทั้งหมด" ? (
                                                    reportCraneReducer.result.map((item, index) => {
                                                        const itemMonth = new Date(item.due_time).getMonth();
                                                        if ((selectedMonth === "ทุกเดือน" || itemMonth === parseInt(selectedMonth, 10)) &&
                                                            (selectedCrane === "ทั้งหมด" || item.crane_id === selectedCrane)) {
                                                            return (
                                                                <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                                                    <TableCell className="font-kanit text-md">{item.FTS_name}</TableCell>
                                                                    <TableCell align="right" className="font-kanit text-md">{item.carrier_name}</TableCell>
                                                                    <TableCell align="right" className="font-kanit text-md">{item.bulk}</TableCell>
                                                                    <TableCell align="right" className="font-kanit text-md">{item.start_time}</TableCell>
                                                                    <TableCell align="right" className="font-kanit text-md">{item.due_time}</TableCell>
                                                                    <TableCell align="right" className="font-kanit text-md">{item.load_cargo}</TableCell>
                                                                    <TableCell align="right" className="font-kanit text-md">{item.cargo_name}</TableCell>
                                                                </TableRow>
                                                            );
                                                        }
                                                        return null;
                                                    })
                                                ) : (
                                                    filteredData.map((item, index) => {
                                                        const itemMonth = new Date(item.due_time).getMonth();
                                                        if ((selectedMonth === "ทุกเดือน" || itemMonth === parseInt(selectedMonth, 10)) &&
                                                            (selectedCrane === "ทั้งหมด" || item.crane_id === selectedCrane)) {
                                                            return (
                                                                <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                                                    <TableCell className="font-kanit text-md">{item.FTS_name}</TableCell>
                                                                    <TableCell align="right" className="font-kanit text-md">{item.carrier_name}</TableCell>
                                                                    <TableCell align="right" className="font-kanit text-md">{item.start_time}</TableCell>
                                                                    <TableCell align="right" className="font-kanit text-md">{item.due_time}</TableCell>
                                                                    <TableCell align="right" className="font-kanit text-md">{item.load_cargo}</TableCell>
                                                                    <TableCell align="right" className="font-kanit text-md">{item.cargo_name}</TableCell>
                                                                </TableRow>
                                                            );
                                                        }
                                                        return null;
                                                    })
                                                )}
                                            </>
                                        )} */}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </>
                    )}
                </CardContent>
            </Card>
        </>
    )
}