import React from 'react'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Tooltip } from '@mui/material';
import { useDispatch } from 'react-redux';
import { deleteFTS } from '../../../../store/slices/FTS.slice';


type Props = {
    id: number
}

export default function FTSDelete({ id }: Props) {
    const [open, setOpen] = React.useState(false);
    const dispatch = useDispatch<any>();

    const handleDeleteConfirm = () => {
        dispatch(deleteFTS(id))
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Tooltip title="ลบ">
                <IconButton
                    onClick={handleClickOpen}
                >
                    <DeleteForeverIcon className='text-red-800' />
                </IconButton>
            </Tooltip>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"คุณต้องการลบรายการนี้หรือไม่?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        หากคุณลบรายการนี้จะหายไปโดยถาวร
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>ยกเลิก</Button>
                    <Button onClick={handleDeleteConfirm} autoFocus>
                        ลบรายการ
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}