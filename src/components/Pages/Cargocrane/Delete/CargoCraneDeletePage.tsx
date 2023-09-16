import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Tooltip } from '@mui/material'
import { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { DeleteCargoCrane } from '../../../../store/slices/cargocrane.slice';
import DeleteForever from '@mui/icons-material/DeleteForever';

export default function CargoCraneDeletePage({ id, result }: any) {
    // const dispatch = useDispatch<any>();
    const [open, setOpen] = useState(false);

    const handleDeleteConfirm = () => {
        // dispatch(DeleteCargoCrane(id))
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
                        คุณไม่สามารถกู้คืนข้อมูลที่ถูกลบได้.{id}
                    </DialogContentText>
                </DialogContent>
                <DialogActions className='flex justify-center'>
                    <Button onClick={() => setOpen(false)}>Close</Button>
                    <Button onClick={handleDeleteConfirm} autoFocus>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}