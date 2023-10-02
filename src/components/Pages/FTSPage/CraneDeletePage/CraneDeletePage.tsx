import React, { useState } from 'react'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Tooltip } from '@mui/material';
import { useDispatch } from 'react-redux';
import { deleteCrane } from '../../../../store/slices/FTS.slice';


type Props = {
    id: number
}

export default function CraneDalete({ id }: Props) {
    const [open, setOpen] = React.useState(false);
    const dispatch = useDispatch<any>();
    const [isSubmitting, setIsSubmitting] = useState(false);


    const handleDeleteConfirm = async () => {
        setIsSubmitting(true);
        try {
            await dispatch(deleteCrane(id, setOpen))
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
                    <DeleteForeverIcon className='text-red-800' />

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
                    {"ต้องการลบเรือหรือไม่?"}
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
                        disabled={isSubmitting}
                        autoFocus
                    >
                        ลบ
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}