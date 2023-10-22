import { useSelector } from 'react-redux';
import { RootState } from '../../../../store/store';
import { TableContainer, TableHead, TableCell, Table, Paper, TableRow, TableBody, IconButton, Tooltip, Box, Typography, Fab } from '@mui/material';
import { Link } from 'react-router-dom';
import Add from '@mui/icons-material/Add';
import DeleteFTS from '../DeleteFTS/DeleteFTS';

type Props = {}

export default function FTS({ }: Props) {
    const MainTainFTSReducer = useSelector((state: RootState) => state.mainTainFTSReducer);

    const showHead = () => {
        return (
            <TableRow>
                {["ชื่อทุ่น", "รายละเอียด", "เวลาหยุดทำงาน", "เวลาเริ่มทำงาน", "action"].map((title) => (
                    <TableCell
                        key={title}
                        align={title === 'ชื่อทุ่น' ? 'left' : 'right'}
                        className="font-kanit"
                        sx={{
                            backgroundColor: 'background.paper',
                            fontWeight: 'Bold',
                            fontSize: 16
                        }}
                    >
                        {title}
                    </TableCell>
                ))}
            </TableRow>
        )
    }

    return (
        <TableContainer component={Paper}>
            <Box className="justify-between flex m-5">
                <Box className="flex items-center">
                    <Typography className="text-xl font-kanit">
                        ข้อมูลซ่อมบำรุงทุ่น
                    </Typography>
                </Box>
                <Box className='flex justify-end'>
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
                </Box>
            </Box >
            <hr />
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    {showHead()}
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
                                className='font-kanit'
                            >
                                {items.fts.FTS_name}
                            </TableCell>
                            <TableCell
                                align="right"
                                className='font-kanit'
                            >
                                {items.desc_FTS}
                            </TableCell>
                            <TableCell
                                align="right"
                                className='font-kanit'
                            >
                                {items.downtime_FTS}
                            </TableCell>
                            <TableCell
                                align="right"
                                className='font-kanit'
                            >
                                {items.start_time_FTS}
                            </TableCell>
                            <TableCell
                                align="right"
                                className='font-kanit'
                            >
                                <Tooltip title="ลบ">
                                    <IconButton>
                                        <DeleteFTS id={items.maintain_FTS_id} />
                                    </IconButton>
                                </Tooltip>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer >
    )
}