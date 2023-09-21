import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Tooltip } from '@mui/material'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteCargo } from '../../../../store/slices/cargo.slice';
import DeleteForever from '@mui/icons-material/DeleteForever';

export default function CargoDeletePage({ id, result }: any) {
    const dispatch = useDispatch<any>();
    const [open, setOpen] = useState(false);

    const handleDeleteConfirm = () => {
        dispatch(deleteCargo(id))
    }

    return (
        <>
            <Tooltip title="ลบ">
                <IconButton
                    onClick={() => setOpen(true)}
                >
                    <DeleteForever className='text-red-800' />
                </IconButton>
            </Tooltip>
            <Dialog
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title" className='flex justify-center'>
                    {`ต้องการลบทุ่น ${result} ?`}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description" className='flex justify-center'>
                        หาคคุณลบ ID: {id} นี้จะไม่สามรถู้คืนได้
                    </DialogContentText>
                </DialogContent>
                <DialogActions className='flex justify-center'>
                    <Button onClick={() => setOpen(false)}>ยกเลิก</Button>
                    <Button onClick={handleDeleteConfirm} autoFocus>
                        ลบสินค้านี้
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}