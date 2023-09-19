import React from 'react'
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

    const handleDeleteConfirm = () => {
        dispatch(deleteCrane(id, setOpen))
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
            >
                <DialogTitle id="alert-dialog-title">
                    {"Use Google's location service?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Let Google help apps determine location. This means sending anonymous
                        location data to Google, even when no apps are running.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>Close</Button>
                    <Button onClick={handleDeleteConfirm} autoFocus>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}