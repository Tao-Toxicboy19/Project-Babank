import DeleteForever from '@mui/icons-material/DeleteForever';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Tooltip } from '@mui/material'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteOrder } from '../../../../store/slices/order.slice';

export default function OrderDeletePage({ id }: any) {
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch<any>();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleDeleteConfirm = async () => {
        setIsSubmitting(true);
        try {
            await dispatch(deleteOrder(id, setOpen))
            setIsSubmitting(false);
        } catch (error) {
            setIsSubmitting(false)
        }
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
                maxWidth="sm"
                fullWidth
            >
                <DialogTitle id="alert-dialog-title" className='flex justify-center'>
                    {`ต้องการลบเรือหรือไม่?`}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description" className='flex justify-center'>
                        คุณไม่สามารถกู้คืนข้อมูลที่ถูกลบได้ !
                    </DialogContentText>
                </DialogContent>
                <DialogActions className='flex justify-center gap-x-3'>
                    <Button
                        sx={{ minWidth: 150 }}
                        variant="outlined"
                        onClick={() => setOpen(false)}
                    >
                        ยกเลิก
                    </Button>
                    <Button
                        sx={{ minWidth: 150 }}
                        variant="contained"
                        className='bg-[#1976D2] hover:bg-[#1563BC]'
                        onClick={handleDeleteConfirm}
                        autoFocus
                        disabled={isSubmitting}
                    >
                        ลบ
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}