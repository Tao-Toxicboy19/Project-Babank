import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { FormControl, InputLabel, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useState, } from "react";
import { report_solutions } from "../../../types/Solution_schedule.type";
import { useForm } from 'react-hook-form';

export default function ReportPage() {
    const reportReducer = useSelector((state: RootState) => state.reportReducer.result);
    const FtsReducer = useSelector((state: RootState) => state.FTS.FTS)
    const [filteredData, setFilteredData] = useState<report_solutions[]>(reportReducer);
    const [selectedFts, setSelectedFts] = useState("all"); // เพิ่ม state สำหรับทุ่น
    const [selectedMonth] = useState("01"); // เพิ่ม state สำหรับเดือน

    const {
        register,
        setValue,
    } = useForm();

    // const filterDataBySelectedMonth = (data: report_solutions[], selectedMonth: string) => {
    //     const currentYear = new Date().getFullYear().toString(); // ดึงปีปัจจุบัน
    //     return data.filter((item) => item.arrival_time.startsWith(`${currentYear}-${selectedMonth}`));
    // };

    const filterDataBySelectedMonth = (data: report_solutions[], selectedMonth: string, selectedFts: string) => {
        const currentYear = new Date().getFullYear().toString();
        return data.filter((item: any) => {
            const matchesMonth = item.arrival_time.startsWith(`${currentYear}-${selectedMonth}`);
            const matchesFts = selectedFts === 'all' || item.FTS_id === selectedFts;
            return matchesMonth && matchesFts;
        });
    };

    return (
        <>
            <form>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">เลือกเดือน</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="เลือกเดือน"
                        {...register('date')}
                        onChange={(e) => {
                            const selectedMonth: any = e.target.value;
                            setValue('date', selectedMonth);
                            setFilteredData(filterDataBySelectedMonth(reportReducer, selectedMonth, selectedFts));
                        }}
                    >
                        <MenuItem value="01">มกราคม</MenuItem>
                        <MenuItem value="02">กุมภาพันธ์</MenuItem>
                        <MenuItem value="03">มีนาคม</MenuItem>
                        <MenuItem value="04">เมษายน</MenuItem>
                        <MenuItem value="05">พฤษภาคม</MenuItem>
                        <MenuItem value="06">มิถุนายน</MenuItem>
                        <MenuItem value="07">กรกฎาคม</MenuItem>
                        <MenuItem value="08">สิงหาคม</MenuItem>
                        <MenuItem value="09">กันยายน</MenuItem>
                        <MenuItem value="10">ตุลาคม</MenuItem>
                        <MenuItem value="11">พฤศจิกายน</MenuItem>
                        <MenuItem value="12">ธันวาคม</MenuItem>
                    </Select>
                </FormControl>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">เลือกทุ่น</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Age"
                        onChange={(e) => {
                            const selectedFts: any = e.target.value;
                            setSelectedFts(selectedFts);
                            setFilteredData(filterDataBySelectedMonth(reportReducer, selectedMonth, selectedFts));
                        }}
                    >
                        {FtsReducer.map((items) => (
                            <MenuItem value={items.fts_id}>{items.FTS_name}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </form>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>ชื่อทุ่น</TableCell>
                            <TableCell align="right">วัน-เวลา มาถึง</TableCell>
                            <TableCell align="right">วัน-เวลา สิ้นสุด</TableCell>
                            <TableCell align="right">ปริมาณสินค้า (ตัน)</TableCell>
                            <TableCell align="right">ประเภทสินค้า</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredData.map((item, index) => (
                            <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell>
                                    {item.FTS_name}
                                </TableCell>
                                <TableCell align="right">{item.arrival_time}</TableCell>
                                <TableCell align="right">{item.deadline_time}</TableCell>
                                <TableCell align="right">{item.load}</TableCell>
                                <TableCell align="right">{item.cargo_name}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}