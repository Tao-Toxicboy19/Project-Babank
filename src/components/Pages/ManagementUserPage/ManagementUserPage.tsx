import { Box, Button, Card, CardContent, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, IconButton, InputLabel, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../../store/store';
import { useForm } from 'react-hook-form';
import React from 'react';
import { RiEditLine } from 'react-icons/ri';
import Loading from '../../layout/Loading/Loading';
import { permissionsAsync } from '../../../store/slices/auth/permissionSlice';
import { usersAsync, usersSelector } from '../../../store/slices/auth/userSlice';

type Props = {}

function AlertDialog({ roles, id }: { roles: string, id: number }) {
    const [open, setOpen] = React.useState(false);
    const dispatch = useAppDispatch()
    const {
        register,
        handleSubmit,
    } = useForm();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <React.Fragment>
            <Tooltip title="แก้ไข">
                <IconButton onClick={handleClickOpen}>
                    <RiEditLine className="text-[#135812]" />
                </IconButton>
            </Tooltip>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                fullWidth
            >
                <form onSubmit={handleSubmit((data) => {
                    dispatch(permissionsAsync({ id, data }))
                })}>
                    <DialogTitle id="alert-dialog-title">
                        อนุญาตสิทธิ์
                    </DialogTitle>
                    <DialogContent>
                        <Box className='my-2 w-full'>

                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">สิทธิ์</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label="สิทธิ์"
                                    defaultValue={roles}
                                    {...register('roles', { required: true })}
                                >
                                    <MenuItem value='Viewer'>Viewer</MenuItem>
                                    <MenuItem value='Contributor'>Contributor</MenuItem>
                                    <MenuItem value='Administrator'>Administrator</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>ยกเลิก</Button>
                        <Button type='submit' autoFocus>
                            เปลี่ยนสิทธิ์
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </React.Fragment>
    );
}

export default function ManagementUserPage({ }: Props) {
    const dispatch = useAppDispatch()
    const usersReducer = useSelector(usersSelector)


    useEffect(() => {
        dispatch(usersAsync())
    }, []);

    return (
        <Card className='w-full min-h-[90vh]'>
            <CardContent>
                {usersReducer.loading ? (
                    <Loading />
                ) : (
                    <>
                        <Typography
                            variant="h6"
                            component='h1'
                            className='font-kanit'
                            sx={{
                                fontSize: 22,
                                fontFamily: "monospace",
                                fontWeight: 700,
                                letterSpacing: ".1rem",
                                color: "inherit",
                                textDecoration: "none",
                            }}
                        >
                            จัดการบัญชีผู้ใช้
                        </Typography>
                        <Box className='max-w-[600px] overflow-x-auto'>
                            <TableContainer component={Paper}>
                                <Table size="small" aria-label="a dense table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Username</TableCell>
                                            <TableCell align="right">Permissions</TableCell>
                                            <TableCell align="right">อนุญาตสิทธิ์</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>

                                        {(usersReducer.result).map((row) => (
                                            <React.Fragment key={row.id}>
                                                <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                                    <TableCell component="th" scope="row" className='mb-5'>
                                                        {row.username}
                                                    </TableCell>
                                                    <TableCell align="right" className='p-5'>{row.roles}</TableCell>
                                                    <TableCell align="right" className='p-5'><AlertDialog roles={row.roles} id={row.id} /></TableCell>
                                                </TableRow>
                                            </React.Fragment>
                                        ))}

                                    </TableBody>
                                </Table>

                            </TableContainer>
                        </Box>
                    </>
                )}
            </CardContent>
        </Card>
    )
}