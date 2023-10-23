import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store/store';
import Add from '@mui/icons-material/Add';
import { Box, Typography, Fab, Tooltip, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import DeleteCrane from '../DeleteCrane/DeleteCrane';

export default function Cranes() {
    const MainTainReducer = useSelector((state: RootState) => state.mainTainReducer);

    return (
        <TableContainer component={Paper}>
            <Box className="justify-between flex m-5">
                <Box className="flex items-center">
                    <Typography className="text-xl font-kanit font-medium">
                        ข้อมูลซ่อมบำรุงเครน
                    </Typography>
                </Box>
                <Box className='flex justify-end'>
                    <Tooltip title="เพิ่มทุ่น">
                        <Fab
                            component={Link}
                            to="/transferstation/maintain/crane/create  "
                            color="primary"
                            aria-label="add"
                            size='small'
                            className='bg-blue-500 hover:bg-blue-700'
                        >
                            <Add />
                        </Fab>
                    </Tooltip>
                </Box>
            </Box >
            <hr />
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        {["ชื่อเครน", "รายละเอียด", "เวลาหยุดทำงาน", "เวลาเริ่มทำงาน", "action"].map((title) => (
                            <TableCell
                                key={title}
                                align={title === 'ชื่อเครน' ? 'left' : 'right'}
                                className="font-kanit text-lg font-bold"
                                sx={{
                                    backgroundColor: 'background.paper',
                                }}
                            >
                                {title}
                            </TableCell>
                        ))}

                    </TableRow>
                </TableHead>
                <TableBody>
                    {(MainTainReducer.data).map((items) => (
                        <TableRow
                            key={items.maintain_crane_id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell
                                component="th"
                                scope="row"
                                className='font-kanit text-md'
                            >
                                {items.crane.crane_name}
                            </TableCell>
                            <TableCell
                                align="right"
                                className='font-kanit text-md'
                            >
                                {items.desc}
                            </TableCell>
                            <TableCell
                                align="right"
                                className='font-kanit text-md'
                            >
                                {items.downtime}
                            </TableCell>
                            <TableCell
                                align="right"
                                className='font-kanit text-md'
                            >
                                {items.start_time}
                            </TableCell>
                            <TableCell
                                align="right"
                                className='font-kanit text-md'
                            >
                                <Tooltip title="ลบ">
                                    <IconButton>
                                        <DeleteCrane id={items.maintain_crane_id} />
                                    </IconButton>
                                </Tooltip>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}