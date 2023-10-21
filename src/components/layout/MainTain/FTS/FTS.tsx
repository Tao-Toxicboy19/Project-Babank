import { useSelector } from 'react-redux';
import { RootState } from '../../../../store/store';
import { TableContainer, TableHead, TableCell, Table, Paper, TableRow, TableBody, Button, IconButton, Tooltip, Stack, TextField } from '@mui/material';
import { useRef, useState } from 'react';
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
import ClearIcon from '@mui/icons-material/Clear';
import { useForm } from 'react-hook-form';

type Props = {}

export default function FTS({ }: Props) {
    const MainTainFTSReducer = useSelector((state: RootState) => state.mainTainFTSReducer);
    const [editId, setEditId] = useState<any>(null);
    const { register, handleSubmit, getValues, reset } = useForm();
    const initialDescFts = useRef('');

    const showHead = () => {
        return (
            <TableRow>
                {["ชื่อทุ่น", "รายละเอียด", "เวลาหยุดทำงาน", "เวลาเริ่มทำงาน", "action"].map((title) => (
                    <TableCell
                        key={title}
                        align={title === 'ชื่อเรือ' ? 'left' : 'center'}
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
        <form onSubmit={handleSubmit((data) => {
            reset();
            setEditId(null);
            console.log(data)
        })}>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        {showHead()}
                    </TableHead>
                    <TableBody>
                        {(MainTainFTSReducer.data).map((items) => (
                            <TableRow
                                key={items.maintain_FTS_id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {items.fts.FTS_name}
                                </TableCell>
                                <TableCell align="right">
                                    {editId === items.maintain_FTS_id ? (
                                        <TextField
                                            id="desc_FTS"
                                            variant="outlined"
                                            type='text'
                                            {...register('desc_FTS_')}
                                        />
                                    ) : (
                                        items.desc_FTS
                                    )}
                                </TableCell>


                                <TableCell align="right">
                                    {editId === items.maintain_FTS_id ? (
                                        <TextField
                                            id="downtime_FTS"
                                            variant="outlined"
                                            type='datetime-local'
                                            {...register('downtime_FTS')}
                                        />
                                    ) : (
                                        items.downtime_FTS
                                    )}
                                </TableCell>
                                <TableCell align="right">
                                    {editId === items.maintain_FTS_id ? (
                                        <TextField
                                            id="start_time_FTS"
                                            variant="outlined"
                                            type='datetime-local'
                                            {...register('start_time_FTS')}
                                        />
                                    ) : (
                                        items.start_time_FTS
                                    )}
                                </TableCell>
                                <TableCell align="right">
                                    {editId === items.maintain_FTS_id ? (
                                        <Stack direction='row' spacing={1} className='justify-end'>
                                            <Tooltip title="บันทึก">
                                                <Button
                                                    variant='text'
                                                    type='submit'
                                                >
                                                    save
                                                </Button>
                                            </Tooltip>
                                            <Tooltip title="ยกเลิก">
                                                <IconButton
                                                    onClick={() => setEditId(null)}
                                                >
                                                    <ClearIcon />
                                                </IconButton>
                                            </Tooltip>
                                        </Stack>
                                    ) : (
                                        <>
                                            <Tooltip title="แก้ไข">
                                                <IconButton onClick={() => {

                                                    // เมื่อคลิกแก้ไข
                                                    setEditId(items.maintain_FTS_id);
                                                    // เก็บค่าเดิมของ desc_FTS
                                                    initialDescFts.current = getValues(`desc_FTS_${items.maintain_FTS_id}`);
                                                }}>
                                                    <SettingsApplicationsIcon />
                                                </IconButton>
                                            </Tooltip>
                                        </>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer >
        </form >
    )
}