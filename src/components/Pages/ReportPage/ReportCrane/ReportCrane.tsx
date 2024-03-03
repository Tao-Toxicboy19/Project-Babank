import { useSelector } from "react-redux";
import { TableContainer, TableHead, TableCell, Paper, Table, TableRow, TableBody, MenuItem, FormControl, Box, Select, Card, CardContent } from "@mui/material";
import { useState, useEffect } from "react";
import { report_solution_crane } from "../../../../type/Solution_schedule.type";
import { TitleReportCrane } from "../../../../Constants";
import moment from 'moment';
import Loading from "../../../layout/Loading/Loading";
import TableTitles from "../../../layout/TableTitles/TableTitles";
import { reportCraneSelector } from "../../../../store/slices/report/reportCraneSlice";
// import { ftsSelector } from "../../../../store/slices/FTS/ftsSlice";
import { craneSelector } from "../../../../store/slices/Crane/craneSlice";
import { roleSelector } from "../../../../store/slices/auth/rolesSlice";
import SearchTerms from "../../../layout/SearchTerms/SearchTerms";

type Props = {}

export default function ReportCrane({ }: Props) {
    const reportCraneReducer = useSelector(reportCraneSelector)
    // const ftsReducer = useSelector(ftsSelector)
    const craneReducer = useSelector(craneSelector)
    const [filteredData, setFilteredData] = useState<report_solution_crane[]>(reportCraneReducer.result);
    // const [selectedFtsId, setSelectedFtsId] = useState("ทั้งหมด");
    const [selectedCrane, setSelectedCrane] = useState("ทั้งหมด");
    const [selectedMonth, setSelectedMonth] = useState("ทุกเดือน");
    const rolesReducer = useSelector(roleSelector)
    const [searchTerm, setSearchTerm] = useState<string>("");


    const result = reportCraneReducer.result.filter((group) => group.solution_id === rolesReducer.result?.group)

    const values = (result).filter((item) =>
        item.crane_name.toLowerCase().includes(searchTerm.toLowerCase())
    )

    console.log(values)

    useEffect(() => {
        // const filteredData = values.filter((item: any) => {
        //     return item.FTS_id === selectedFtsId && (selectedCrane === "ทั้งหมด" || item.crane_id === selectedCrane);
        // });
        setFilteredData(filteredData);
    }, [selectedCrane])


    return (

        <>
            <Card className="bg-[#fff]/75 min-h-[72.3vh]">
                <CardContent>
                    {reportCraneReducer.loading ? (
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
                                {/* <Box className='w-full'>
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
                                        {(ftsReducer.result).map((items) => (
                                            <MenuItem className="font-kanit" key={items.fts_id} value={items.fts_id}>{items.FTS_name}</MenuItem>
                                            ))}
                                            </Select>
                                            </FormControl>
                                        </Box> */}
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
                                            {(craneReducer.result).map((items) => (
                                                <MenuItem className="font-kanit" key={items.id} value={items.id}>{items.crane_name}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Box>
                                <SearchTerms searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

                            </form>
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                    <TableHead>
                                        <TableTitles Titles={TitleReportCrane} />
                                    </TableHead>
                                    <TableBody>
                                        <>
                                            {selectedCrane === "ทั้งหมด" ? (
                                                values.map((item: any, index) => {
                                                    const itemMonth = new Date(item.due_time).getMonth();
                                                    const formattedDate = moment(item.start_time, 'YYYY-MM-DD HH:mm:ss').format('DD/MM/YYYY HH:mm:ss');
                                                    const formattedDateV2 = moment(item.due_time, 'YYYY-MM-DD HH:mm:ss').format('DD/MM/YYYY HH:mm:ss');
                                                    const craneName = craneReducer.result.find(r => r.id === item.crane_id)
                                                    // console.log(craneReducer.result.find(r => r.id === item.crane_id))
                                                    if ((selectedMonth === "ทุกเดือน" || itemMonth === parseInt(selectedMonth, 10)) &&
                                                        (selectedCrane === "ทั้งหมด" || item.crane_id === selectedCrane)) {
                                                        return (
                                                            <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                                                <TableCell className="font-kanit text-md">{craneName?.crane_name}</TableCell>
                                                                <TableCell align="right" className="font-kanit text-md">{item.carrier_name}</TableCell>
                                                                <TableCell align="right" className="font-kanit text-md">{item.bulk}</TableCell>
                                                                <TableCell align="right" className="font-kanit text-md">{formattedDate}</TableCell>
                                                                <TableCell align="right" className="font-kanit text-md">{formattedDateV2}</TableCell>
                                                                <TableCell align="right" className="font-kanit text-md">{item.load_cargo}</TableCell>
                                                                <TableCell align="right" className="font-kanit text-md">{item.cargo_name}</TableCell>
                                                            </TableRow>
                                                        );
                                                    }
                                                    return null;
                                                })
                                            ) : (
                                                values.map((item: any, index) => {
                                                    const itemMonth = new Date(item.due_time).getMonth();
                                                    const formattedDate = moment(item.start_time, 'YYYY-MM-DD HH:mm:ss').format('DD/MM/YYYY HH:mm:ss');
                                                    const formattedDateV2 = moment(item.due_time, 'YYYY-MM-DD HH:mm:ss').format('DD/MM/YYYY HH:mm:ss');
                                                    const craneName = craneReducer.result.find(r => r.id === item.crane_id)

                                                    if ((selectedMonth === "ทุกเดือน" || itemMonth === parseInt(selectedMonth, 10)) &&
                                                        (selectedCrane === "ทั้งหมด" || item.crane_id === selectedCrane)) {
                                                        return (
                                                            <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                                                <TableCell className="font-kanit text-md">{craneName?.crane_name}</TableCell>
                                                                <TableCell align="right" className="font-kanit text-md">{item.carrier_name}</TableCell>
                                                                <TableCell align="right" className="font-kanit text-md">{formattedDate}</TableCell>
                                                                <TableCell align="right" className="font-kanit text-md">{formattedDateV2}</TableCell>
                                                                <TableCell align="right" className="font-kanit text-md">{item.load_cargo}</TableCell>
                                                                <TableCell align="right" className="font-kanit text-md">{item.cargo_name}</TableCell>
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
            </Card>
        </>
    )
}