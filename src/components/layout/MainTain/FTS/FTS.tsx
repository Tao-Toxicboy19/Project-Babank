import { useSelector } from 'react-redux';
import { RootState } from '../../../../store/store';
import { TableContainer, TableHead, TableCell, Table, Paper, TableRow, TableBody, IconButton, Tooltip, Box, Typography, Fab } from '@mui/material';
import { Link } from 'react-router-dom';
import Add from '@mui/icons-material/Add';
import DeleteFTS from '../DeleteFTS/DeleteFTS';
import moment from 'moment';
import TableTitles from '../../TableTitles/TableTitles';

type Props = {}

export default function FTS({ }: Props) {
    const MainTainFTSReducer = useSelector((state: RootState) => state.mainTainFTSReducer);
    const title = ["ชื่อทุ่น", "รายละเอียด", "เวลาหยุดทำงาน", "เวลาเริ่มทำงาน", "แก้ไข"]
    const rolesReducer = useSelector((state: RootState) => state.rolesReducer);

    return (
        <TableContainer component={Paper}>
            <Box className="justify-between flex m-5">
                <Box className="flex items-center">
                    <Typography className="text-xl font-kanit">
                        ข้อมูลซ่อมบำรุงทุ่น
                    </Typography>
                </Box>
                <Box className='flex justify-end'>
                    {rolesReducer.result && rolesReducer.result.role === 'Viewer' ? (
                        <></>
                    ) : (
                        <Tooltip title="เพิ่มทุ่น">
                            <Fab
                                component={Link}
                                to="/transferstation/maintain/create"
                                color="primary"
                                aria-label="add"
                                size='small'
                                className='bg-blue-500 hover:bg-blue-700'
                            >
                                <Add />
                            </Fab>
                        </Tooltip>
                    )}
                </Box>
            </Box >
            <hr />
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableTitles Titles={title} />
                </TableHead>
                <TableBody>
                    {(MainTainFTSReducer.data).map((items: any) => (
                        <TableRow
                            key={items.maintain_FTS_id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell
                                component="th"
                                scope="row"
                                className='font-kanit text-md'
                            >
                                {items.fts.FTS_name}
                            </TableCell>
                            <TableCell
                                align="center"
                                className='font-kanit text-md'
                            >
                                {items.desc_FTS}
                            </TableCell>
                            <TableCell
                                align="center"
                                className='font-kanit text-md'
                            >
                                {moment(items.downtime_FTS, 'YYYY-MM-DD HH:mm:ss').add(12, 'hours').format('DD/MM/YYYY HH:mm:ss')}
                            </TableCell>
                            <TableCell
                                align="center"
                                className='font-kanit text-md'
                            >
                                {moment(items.start_time_FTS, 'YYYY-MM-DD HH:mm:ss').add(12, 'hours').format('DD/MM/YYYY HH:mm:ss')}
                            </TableCell>
                            {rolesReducer.result && rolesReducer.result.role === 'Viewer' ? (
                                <></>
                            ) : (
                                <TableCell
                                    align="right"
                                    className='font-kanit text-md'
                                >
                                    <Tooltip title="ลบ">
                                        <IconButton>
                                            <DeleteFTS id={items.maintain_FTS_id} />
                                        </IconButton>
                                    </Tooltip>
                                </TableCell>
                            )}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer >
    )
}