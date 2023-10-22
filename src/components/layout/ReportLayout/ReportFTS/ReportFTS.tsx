import { useSelector } from "react-redux";
import { Box, Card, CardContent, FormControl, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useState, } from "react";
import { useForm } from 'react-hook-form';
import { RootState } from "../../../../store/store";
import { report_solutions } from "../../../../types/Solution_schedule.type";
import Loading from "../../Loading/Loading";

export default function ReportFTS() {
    const reportReducer = useSelector((state: RootState) => state.reportReducer);
    const FtsReducer = useSelector((state: RootState) => state.FTS.FTS)
    const [filteredData, setFilteredData] = useState<report_solutions[]>(reportReducer.result);
    const [selectedFts, setSelectedFts] = useState("all"); // เพิ่ม state สำหรับทุ่น
    const [selectedMonth] = useState("01"); // เพิ่ม state สำหรับเดือน

    const {
        register,
        setValue,
    } = useForm();

    const filterDataBySelectedMonth = (data: report_solutions[], selectedMonth: string, selectedFts: string) => {
        const currentYear = new Date().getFullYear().toString();
        return data.filter((item: any) => {
            const matchesMonth = item.exittime.startsWith(`${currentYear}-${selectedMonth}`);
            const matchesFts = selectedFts === 'all' || item.FTS_id === selectedFts;
            return matchesMonth && matchesFts;
        });
    };

    return (
        <>
            {reportReducer.loading ? (
                <Loading />
            ) : (
                <>
                    <Card className="bg-[#fff]/75">
                        <CardContent>
                            <form className="max-w-xl flex gap-x-3 mb-3">
                                <Box className='w-full'>
                                    <label className="pr-5 font-kanit" htmlFor="FTS_name">เลือกเดือน</label>
                                    <FormControl fullWidth className="bg-[#fff]">
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            className="font-kanit"
                                            {...register('date')}
                                            onChange={(e) => {
                                                const selectedMonth: any = e.target.value;
                                                setValue('date', selectedMonth);
                                                setFilteredData(filterDataBySelectedMonth(reportReducer.result, selectedMonth, selectedFts));
                                            }}
                                        >
                                            <MenuItem value="01" className="font-kanit">มกราคม</MenuItem>
                                            <MenuItem value="02" className="font-kanit">กุมภาพันธ์</MenuItem>
                                            <MenuItem value="03" className="font-kanit">มีนาคม</MenuItem>
                                            <MenuItem value="04" className="font-kanit">เมษายน</MenuItem>
                                            <MenuItem value="05" className="font-kanit">พฤษภาคม</MenuItem>
                                            <MenuItem value="06" className="font-kanit">มิถุนายน</MenuItem>
                                            <MenuItem value="07" className="font-kanit">กรกฎาคม</MenuItem>
                                            <MenuItem value="08" className="font-kanit">สิงหาคม</MenuItem>
                                            <MenuItem value="09" className="font-kanit">กันยายน</MenuItem>
                                            <MenuItem value="10" className="font-kanit">ตุลาคม</MenuItem>
                                            <MenuItem value="11" className="font-kanit">พฤศจิกายน</MenuItem>
                                            <MenuItem value="12" className="font-kanit">ธันวาคม</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Box>
                                <Box className='w-full'>
                                    <label className="pr-5 font-kanit" htmlFor="FTS_name">เลือกทุ่น</label>
                                    <FormControl fullWidth className="bg-[#fff] font-kanit">
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            className="font-kanit"
                                            onChange={(e) => {
                                                const selectedFts: any = e.target.value;
                                                setSelectedFts(selectedFts);
                                                setFilteredData(filterDataBySelectedMonth(reportReducer.result, selectedMonth, selectedFts));
                                            }}
                                        >
                                            {FtsReducer.map((items) => (
                                                <MenuItem className="font-kanit" value={items.fts_id}>{items.FTS_name}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Box>
                            </form>
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell
                                                className="font-kanit"
                                            >
                                                ชื่อทุ่น
                                            </TableCell>
                                            <TableCell
                                                className="font-kanit"
                                                align="right"
                                            >
                                                วัน-เวลา มาถึง
                                            </TableCell>
                                            <TableCell
                                                className="font-kanit"
                                                align="right"
                                            >
                                                วัน-เวลา สิ้นสุด
                                            </TableCell>
                                            <TableCell
                                                className="font-kanit"
                                                align="right"
                                            >
                                                ปริมาณสินค้า (ตัน)
                                            </TableCell>
                                            <TableCell
                                                className="font-kanit"
                                                align="right"
                                            >
                                                ประเภทสินค้า
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {filteredData.map((item, index) => (
                                            <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                                <TableCell
                                                    className="font-kanit">
                                                    {item.carrier_name}
                                                </TableCell>
                                                <TableCell
                                                    align="right"
                                                    className="font-kanit"
                                                >
                                                    {item.arrival_time}
                                                </TableCell>
                                                <TableCell
                                                    align="right"
                                                    className="font-kanit"
                                                >
                                                    {item.deadline_time}
                                                </TableCell>
                                                <TableCell
                                                    align="right"
                                                    className="font-kanit"
                                                >
                                                    {item.load}
                                                </TableCell>
                                                <TableCell
                                                    align="right"
                                                    className="font-kanit"
                                                >
                                                    {item.cargo_name}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </CardContent>
                    </Card>
                </>
            )}
        </>
    );
}