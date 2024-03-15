import { useSelector } from "react-redux";
import { Box, Card, CardContent, FormControl, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useEffect, useState, } from "react";
import { TitleReportFTS } from "../../../../Constants";
import moment from "moment";
import Loading from "../../../layout/Loading/Loading";
import TableTitles from "../../../layout/TableTitles/TableTitles";
import { reportFtsAsync, reportFtsSelector, report_solutions } from "../../../../store/slices/report/reportFtsSlice";
import { ftsSelector } from "../../../../store/slices/FTS/ftsSlice";
import { roleSelector } from "../../../../store/slices/auth/rolesSlice";
import SearchTerms from "../../../layout/SearchTerms/SearchTerms";
import { useAppDispatch } from "../../../../store/store";

export default function ReportFTS() {
    const reportFtsReducer = useSelector(reportFtsSelector)
    const ftsReducer = useSelector(ftsSelector)
    const [filteredData, setFilteredData] = useState<report_solutions[]>(reportFtsReducer.result);
    const [selectedFtsId, setSelectedFtsId] = useState("ทั้งหมด");
    const [selectedMonth, setSelectedMonth] = useState("ทุกเดือน");
    const [searchTerm, setSearchTerm] = useState<string>("");
    const rolesReducer = useSelector(roleSelector)
    const dispatch = useAppDispatch()
    const id = rolesReducer.result?.group

    const values = (reportFtsReducer.result).filter((item) =>
        item.FTS_name.toLowerCase().includes(searchTerm.toLowerCase())
    )

    if (!id) return
    useEffect(() => {
        dispatch(reportFtsAsync(id))
    }, [])

    useEffect(() => {
        const filteredData = values.filter((item) => item.FTS_name === selectedFtsId);
        setFilteredData(filteredData)
    }, [selectedFtsId, values])

    return (
        <>
            <Card className="bg-[#fff]/75 min-h-[72.3vh]">
                <CardContent>
                    {reportFtsReducer.loading ? (
                        <Loading />
                    ) : (
                        <>
                            <form className="flex gap-x-3 mb-3 justify-between">
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
                                            {(ftsReducer.result).map((items, index) => (
                                                <MenuItem key={index} className="font-kanit" value={items.FTS_name}>{items.FTS_name}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Box>
                                <SearchTerms searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                            </form>
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                    <TableHead>
                                        <TableTitles Titles={TitleReportFTS} />
                                    </TableHead>
                                    <TableBody>
                                        <>
                                            {selectedFtsId === "ทั้งหมด" ? (
                                                values.map((item, index) => {
                                                    const itemMonth = new Date(item.min_start_time).getMonth();
                                                    const formattedDate = moment(item.min_start_time, 'YYYY-MM-DD HH:mm:ss').format('DD/MM/YYYY HH:mm:ss');
                                                    const formattedDateV2 = moment(item.max_due_time, 'YYYY-MM-DD HH:mm:ss').format('DD/MM/YYYY HH:mm:ss');
                                                    if (selectedMonth === "ทุกเดือน" || itemMonth === parseInt(selectedMonth, 10)) {
                                                        return (
                                                            <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                                                <TableCell className="font-kanit text-md">{item.FTS_name}</TableCell>
                                                                <TableCell align="center" className="font-kanit text-md">{item.carrier_name}</TableCell>
                                                                <TableCell align="center" className="font-kanit text-md">{formattedDate}</TableCell>
                                                                <TableCell align="center" className="font-kanit text-md">{formattedDateV2}</TableCell>
                                                                <TableCell align="center" className="font-kanit text-md">{item.total_load_cargo}</TableCell>
                                                                {/* <TableCell align="center" className="font-kanit text-md">{item.cargo_name}</TableCell> */}
                                                            </TableRow>
                                                        );
                                                    }
                                                    return null;
                                                })
                                            ) : (
                                                filteredData.map((item, index) => {
                                                    const itemMonth = new Date(item.min_start_time).getMonth();
                                                    const formattedDate = moment(item.min_start_time, 'YYYY-MM-DD HH:mm:ss').format('DD/MM/YYYY HH:mm:ss');
                                                    const formattedDateV2 = moment(item.max_due_time, 'YYYY-MM-DD HH:mm:ss').format('DD/MM/YYYY HH:mm:ss');
                                                    if (selectedMonth === "ทุกเดือน" || itemMonth === parseInt(selectedMonth, 10)) {
                                                        return (
                                                            <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                                                <TableCell className="font-kanit text-md">{item.FTS_name}</TableCell>
                                                                <TableCell align="center" className="font-kanit text-md">{item.carrier_name}</TableCell>
                                                                <TableCell align="center" className="font-kanit text-md">{formattedDate}</TableCell>
                                                                <TableCell align="center" className="font-kanit text-md">{formattedDateV2}</TableCell>
                                                                <TableCell align="center" className="font-kanit text-md">{item.total_load_cargo}</TableCell>
                                                            </TableRow>
                                                        );
                                                    }
                                                    return null;
                                                })
                                            )}
                                        </>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </>
                    )}
                </CardContent>
            </Card >
        </>
    );
}