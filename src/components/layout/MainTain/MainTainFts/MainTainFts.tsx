import { useSelector } from 'react-redux';
import { TableContainer, TableHead, TableCell, Table, Paper, TableRow, TableBody, IconButton, Tooltip, Box, Typography, Fab } from '@mui/material';
import { Link } from 'react-router-dom';
import Add from '@mui/icons-material/Add';
import moment from 'moment';
import TableTitles from '../../TableTitles/TableTitles';
import { roleSelector } from '../../../../store/slices/auth/rolesSlice';
import { mainTainAsync, mainTainFtsSelector } from '../../../../store/slices/mainTainFts/mainTainFtsSlice';
import { useAppDispatch } from '../../../../store/store';
import { useEffect, useState } from 'react';
import { mainTainDeleteAsync } from '../../../../store/slices/mainTainFts/mainTainFtsDeleteSlice';
import DeleteDialog from '../../DeleteDialog/DeleteDialog';
import { RiEditLine } from 'react-icons/ri';

type Props = {}

export default function MainTainFts({ }: Props) {
    const mainTainFTSReducer = useSelector(mainTainFtsSelector)
    const rolesReducer = useSelector(roleSelector)
    const title = ["ชื่อ","ชื่อทุ่น", "รายละเอียด", "เวลาหยุดทำงาน", "เวลาเริ่มทำงาน", "แจ้งเตือนก่อนกี่วัน", "แก้ไข"]
    const dispatch = useAppDispatch()
    const id = rolesReducer.result?.group
    if (!id) return
    useEffect(() => {
        dispatch(mainTainAsync(id))
    }, [])

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
            {mainTainFTSReducer.result.length === 0 ? (
                <>
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
                        className='text-cyan-800 flex justify-center items-center h-[59vh]'
                        variant='h4'
                        component='h2'
                    >
                        ไม่มีข้อมูล
                    </Typography>
                </>
            ) : (
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableTitles Titles={title} />
                    </TableHead>
                    <TableBody>
                        {(mainTainFTSReducer.result).map((items: any) => (
                            <TableRow
                                key={items.maintain_FTS_id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell
                                    component="th"
                                    scope="row"
                                    className='font-kanit text-md'
                                >
                                    {items.name}
                                </TableCell>
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
                                <TableCell
                                    align="center"
                                    className='font-kanit text-md'
                                >
                                    {items.noti_day}
                                </TableCell>
                                <TableCell
                                    align="center"
                                    className='font-kanit text-md'
                                >
                                    <Tooltip title="แก้ไข">
                                        <IconButton component={Link} to={`/transferstation/maintain/fts/update/${items.maintain_FTS_id}`}>
                                            <RiEditLine className="text-[#135812]" />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="ลบ">
                                        <IconButton>
                                            <MainTainFtsDelete id={items.maintain_FTS_id} />
                                        </IconButton>
                                    </Tooltip>
                                </TableCell>

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}
        </TableContainer >
    )
}

function MainTainFtsDelete({ id }: { id: number }) {
    const [open, setOpen] = useState(false)
    const dispatch = useAppDispatch()
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleClickOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }
    const fetch = () => dispatch(mainTainAsync(id))

    const handleDeleteConfirm = async () => {
        setIsSubmitting(true)
        try {
            await dispatch(mainTainDeleteAsync({ id, handleClose, fetch }))
            setIsSubmitting(false)
        } catch (error) {
            setIsSubmitting(false)
        }
    }

    return (
        <DeleteDialog
            open={open}
            handleClickOpen={handleClickOpen}
            handleClose={handleClose}
            handleDeleteConfirm={handleDeleteConfirm}
            isSubmitting={isSubmitting}
            maxWidth={'sm'}
            titles={'ต้องการลบสินค้าหรือไม่?'}
            description={'คุณไม่สามารถกู้คืนข้อมูลที่ถูกลบได้ !'}
        />
    )
}