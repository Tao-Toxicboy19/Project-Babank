import { useSelector } from "react-redux";
import { TableContainer, TableHead, TableCell, Paper, Table, TableRow, TableBody, MenuItem, FormControl, Box, Select, Card, CardContent } from "@mui/material";
import { useState, useEffect } from "react";
import moment from 'moment';
import Loading from "../../../layout/Loading/Loading";
import TableTitles from "../../../layout/TableTitles/TableTitles";
import { reportCraneAsync, reportCraneSelector } from "../../../../store/slices/report/reportCraneSlice";
import { craneSelector } from "../../../../store/slices/Crane/craneSlice";
import { roleSelector } from "../../../../store/slices/auth/rolesSlice";
import SearchTerms from "../../../layout/SearchTerms/SearchTerms";
import { useAppDispatch } from "../../../../store/store";

type Props = {}

export default function ReportCrane({ }: Props) {
    const reportCraneReducer = useSelector(reportCraneSelector)
    const craneReducer = useSelector(craneSelector)
    const [selectedCrane, setSelectedCrane] = useState("ทั้งหมด");
    const [selectedMonth, _] = useState("ทุกเดือน");
    const [searchTerm, setSearchTerm] = useState<string>("");
    const rolesReducer = useSelector(roleSelector)
    const dispatch = useAppDispatch()
    const id = rolesReducer.result?.group

    const values = (reportCraneReducer.result).filter((item) =>
        item.crane_name.toLowerCase().includes(searchTerm.toLowerCase())
    )

    if (!id) return
    useEffect(() => {
        dispatch(reportCraneAsync(id))
    }, [])


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
                                        <TableTitles Titles={['ชื่อเครน', 'ชื่อเรือ', 'วัน-เวลา มาถึง', 'วัน-เวลา สิ้นสุด', 'ปริมาณสินค้า (ตัน)','จำนวนระวาง' ,'ประเภทสินค้า']} />
                                    </TableHead>
                                    <TableBody>
                                        <>

                                            {
                                                values.map((item, index) => {
                                                    const itemMonth = new Date(item.due_time).getMonth();
                                                    const formattedDate = moment(item.start_time, 'YYYY-MM-DD HH:mm:ss').format('DD/MM/YYYY HH:mm:ss');
                                                    const formattedDateV2 = moment(item.due_time, 'YYYY-MM-DD HH:mm:ss').format('DD/MM/YYYY HH:mm:ss');
                                                    const craneName = craneReducer.result.find(r => r.id === item.crane_id)

                                                    if ((selectedMonth === "ทุกเดือน" || itemMonth === parseInt(selectedMonth, 10)) &&
                                                        (selectedCrane === "ทั้งหมด" || item.crane_id === +selectedCrane)) {
                                                        return (
                                                            <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                                                <TableCell className="font-kanit text-md">{craneName?.crane_name}</TableCell>
                                                                <TableCell align="center" className="font-kanit text-md">{item.carrier_name}</TableCell>
                                                                <TableCell align="center" className="font-kanit text-md">{formattedDate}</TableCell>
                                                                <TableCell align="center" className="font-kanit text-md">{formattedDateV2}</TableCell>
                                                                <TableCell align="center" className="font-kanit text-md">{item.load_cargo}</TableCell>
                                                                <TableCell align="center" className="font-kanit text-md">{item.bulk}</TableCell>
                                                                <TableCell align="center" className="font-kanit text-md">{item.cargo_name}</TableCell>
                                                            </TableRow>
                                                        );
                                                    }
                                                    return null;
                                                })
                                            }
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