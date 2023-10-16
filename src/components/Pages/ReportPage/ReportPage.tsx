import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { Button, FormControl, InputLabel, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";
import { useEffect, useState, } from "react";
import { loadReport } from "../../../store/slices/reportSlice";
import { report_solutions } from "../../../types/Solution_schedule.type";
import React from "react";
import { useForm } from 'react-hook-form';

export default function ReportPage() {
    const reportReducer = useSelector((state: RootState) => state.reportReducer.result);
    const dispatch = useDispatch<any>();
    const [openGroups, setOpenGroups] = useState<Set<string>>(new Set());
    const [selectedMonth, setSelectedMonth] = useState("");
    const [filteredData, setFilteredData] = useState<report_solutions[]>([]); // เพิ่มตัวแปร filteredData ที่ถูกประกาศ


    const {
        register,
        handleSubmit,
        setValue,
    } = useForm();

    useEffect(() => {
        dispatch(loadReport());
    }, []);

    const nameGroups = new Map<string, report_solutions[]>();
    reportReducer.forEach((item) => {
        const name = item.FTS_name;
        if (nameGroups.has(name)) {
            nameGroups.get(name)?.push(item);
        } else {
            nameGroups.set(name, [item]);
        }
    });

    const toggleGroup = (name: string) => {
        if (openGroups.has(name)) {
            openGroups.delete(name);
        } else {
            openGroups.add(name);
        }
        setOpenGroups(new Set(openGroups));
    };

    const filterDataBySelectedMonth = (data: report_solutions[], selectedMonth: string) => {
        return data.filter((item) => item.arrival_time.startsWith(`2023-${selectedMonth}`));
    };

    return (
        <>
            <form
                onSubmit={handleSubmit((data) => {
                    const selectedMonth = data.date;
                    console.log(selectedMonth);
                    const filteredData = filterDataBySelectedMonth(reportReducer, selectedMonth);
                    console.log(filteredData);
                    setFilteredData(filteredData); // กำหนดค่าของ filteredData ด้วยข้อมูลที่ผ่านการกรอง
                })}
            >
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">เลือกเดือน</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="เลือกเดือน"
                        {...register('date', { required: true })}
                        onChange={(e) => {
                            const selectedMonth: any = e.target.value;
                            setSelectedMonth(selectedMonth);
                            setValue('date', selectedMonth);
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
                <Button type="submit">submit</Button>
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