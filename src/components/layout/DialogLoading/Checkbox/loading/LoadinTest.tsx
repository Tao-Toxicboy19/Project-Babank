import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Box, CircularProgress } from '@mui/material';

type Props = {
    open: boolean
    handleClickOpen: () => void
    handleClose: () => void
}


export default function LoadingTest({ open }: Props) {

    return (
        <React.Fragment>
            <Dialog
                open={open}
                // onClose={}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"กำลังประมวณผล"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <Box className='flex justify-center'>
                            <CircularProgress />
                        </Box>
                    </DialogContentText>
                </DialogContent>
            </Dialog>
        </React.Fragment>
    );
}